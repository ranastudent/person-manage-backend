"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCSV = exports.deletePerson = exports.updatePerson = exports.getPersonById = exports.groupByCategory = exports.getAllPersons = exports.createPerson = void 0;
const personService = __importStar(require("./person.service"));
const createPerson = async (req, res) => {
    try {
        const photo = req.file ? req.file.path : undefined;
        const payload = { ...req.body, photo };
        const person = await personService.createPerson(payload);
        res.status(201).json({ success: true, data: person });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.createPerson = createPerson;
const getAllPersons = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || "asc";
        const category = req.query.category;
        const persons = await personService.getAllPersons(page, limit, search, sortBy, sortOrder, category);
        res.json({ success: true, data: persons });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.getAllPersons = getAllPersons;
const groupByCategory = async (req, res) => {
    try {
        const persons = await personService.groupByCategory();
        res.json({ success: true, data: persons });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.groupByCategory = groupByCategory;
const getPersonById = async (req, res) => {
    const person = await personService.getPersonById(req.params.id);
    res.json({ success: true, data: person });
};
exports.getPersonById = getPersonById;
const updatePerson = async (req, res) => {
    const photo = req.file ? req.file.path : undefined;
    const payload = { ...req.body, ...(photo && { photo }) };
    const updated = await personService.updatePerson(req.params.id, payload);
    res.json({ success: true, data: updated });
};
exports.updatePerson = updatePerson;
const deletePerson = async (req, res) => {
    await personService.deletePerson(req.params.id);
    res.json({ success: true, message: "Person deleted" });
};
exports.deletePerson = deletePerson;
const importCSV = async (req, res) => {
    try {
        const filePath = req.file?.path;
        const imported = await personService.importPersonsFormCSV(filePath);
        res.status(201).json({ success: true, data: imported });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.importCSV = importCSV;
