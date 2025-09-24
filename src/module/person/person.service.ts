import { parseCSV } from "../../utils/csv";
import { IPerson } from "./person.interface";
import { personModel } from "./person.model";


export const createPerson = async(payload: IPerson) => {

      //duplicate detection

      const existing = await personModel.findOne({
            $or:[
                  {email: payload.email},
                  {phone: payload.phone}
            ]
      });
      if(existing) {
            throw new Error("Duplicate entry: Person with same email/phone exists");
      }

      return await personModel.create(payload);
}

export const getAllPersons = async(page:number=1, limit:number=3, search?: string, sortBy?: string, sortOrder: "asc" | "desc" = "asc", category?: string) => {
      const query : any = {};

      if(search) {
            query.$or = [
                  {name: {$regex: search, $options: "i"}},
                  {email: {$regex: search, $options: "i"}},
                  {phone: {$regex: search, $options: "i"}}
            ]
      }

      if(category) {
            query.category = category;
      }

      const skip = (page - 1) * limit;
      let sort: any = {};
      if(sortBy) {
            sort[sortBy] = sortOrder === "desc" ? -1 : 1;
      }else {
            sort = {createdAt: -1};
      }
      const persons = await personModel
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
      const total = await personModel.countDocuments();
      return {
            data: persons,
            meta : {
                  page,
                  limit,
                  total,
                  totalPages: Math.ceil(total/limit)
            },
      };
};

// Group person by category
export const groupByCategory = async() =>{
      return await personModel.aggregate([
            {
                  $group: {
                        _id: "$category",
                        persons: {$push: "$$ROOT"},
                        count: {$sum: 1}
                  }
            }
      ]);
}

export const getPersonById = async(id: string) => {
      return await personModel.findById(id);
}

export const updatePerson = async(id: string, payload: Partial<IPerson>)=>{
      return await personModel.findByIdAndUpdate(id, payload, {new: true});
}

export const deletePerson = async(id: string) => {
      return await personModel.findByIdAndDelete(id);
}

export const importPersonsFormCSV = async(filePath: string)=>{
      const rows = await parseCSV(filePath);

      return await personModel.insertMany(rows);
}