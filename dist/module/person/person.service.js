"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPersonsFormCSV = exports.deletePerson = exports.updatePerson = exports.getPersonById = exports.groupByCategory = exports.getAllPersons = exports.createPerson = void 0;
const csv_1 = require("../../utils/csv");
const person_model_1 = require("./person.model");
const createPerson = async (payload) => {
    //duplicate detection
    const existing = await person_model_1.personModel.findOne({
        $or: [
            { email: payload.email },
            { phone: payload.phone }
        ]
    });
    if (existing) {
        throw new Error("Duplicate entry: Person with same email/phone exists");
    }
    return await person_model_1.personModel.create(payload);
};
exports.createPerson = createPerson;
const getAllPersons = async (page = 1, limit = 3, search, sortBy, sortOrder = "asc", category) => {
    const query = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } }
        ];
    }
    if (category) {
        query.category = category;
    }
    const skip = (page - 1) * limit;
    let sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    else {
        sort = { createdAt: -1 };
    }
    const persons = await person_model_1.personModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    const total = await person_model_1.personModel.countDocuments();
    return {
        data: persons,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
    };
};
exports.getAllPersons = getAllPersons;
// Group person by category
const groupByCategory = async () => {
    return await person_model_1.personModel.aggregate([
        {
            $group: {
                _id: "$category",
                persons: { $push: "$$ROOT" },
                count: { $sum: 1 }
            }
        }
    ]);
};
exports.groupByCategory = groupByCategory;
const getPersonById = async (id) => {
    return await person_model_1.personModel.findById(id);
};
exports.getPersonById = getPersonById;
const updatePerson = async (id, payload) => {
    return await person_model_1.personModel.findByIdAndUpdate(id, payload, { new: true });
};
exports.updatePerson = updatePerson;
const deletePerson = async (id) => {
    return await person_model_1.personModel.findByIdAndDelete(id);
};
exports.deletePerson = deletePerson;
const importPersonsFormCSV = async (filePath) => {
    const rows = await (0, csv_1.parseCSV)(filePath);
    return await person_model_1.personModel.insertMany(rows);
};
exports.importPersonsFormCSV = importPersonsFormCSV;
