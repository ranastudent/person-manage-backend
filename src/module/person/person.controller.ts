import { Request, Response } from "express";
import * as personService from "./person.service";
import { AuthRequest } from "../../middlewares/authMiddleware";

export const createPerson = async (req: Request, res: Response) => {
  try {
    const photo = req.file ? req.file.path : undefined;
    const payload = { ...req.body, photo };
    const person = await personService.createPerson(payload);
    res.status(201).json({ success: true, data: person });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllPersons = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const persons = await personService.getAllPersons(page, limit);
    res.json({ success: true, data: persons });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  const person = await personService.getPersonById(req.params.id);
  res.json({ success: true, data: person });
};

export const updatePerson = async (req: Request, res: Response) => {
  const photo = req.file ? req.file.path : undefined;
  const payload = { ...req.body, ...(photo && { photo }) };
  const updated = await personService.updatePerson(req.params.id, payload);
  res.json({ success: true, data: updated });
};

export const deletePerson = async (req: Request, res: Response) => {
  await personService.deletePerson(req.params.id);
  res.json({ success: true, message: "Person deleted" });
};

export const importCSV = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path as string;
    const imported = await personService.importPersonsFormCSV(filePath);
    res.status(201).json({ success: true, data: imported });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
