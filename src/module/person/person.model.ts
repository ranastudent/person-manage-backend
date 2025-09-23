import mongoose, { Document, Schema } from "mongoose";
import { IPerson } from "./person.interface";


export interface PersonDocument extends IPerson, Document {}

const personSchema : Schema = new Schema(
      {
            name:  {type: String, required: true},
            email: {type: String, required: true, unique: true},
            phone: {type: String, required: true, unique: true},
            age: {type: Number, required: true},
            address: {type: String, required: true},
            category: {type: String, enum: ["Friends", "Family", "Colleagues", "Unknown"], default: "Unknown"},
            photo: {type: String},
      },
      {timestamps: true}
)

export const personModel = mongoose.model<PersonDocument>("person", personSchema);