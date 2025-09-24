import express from "express";
import multer from "multer";
import * as personController from "./person.controller";
import { authenticate, authorize } from "../../middlewares/authMiddleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });



// Get all persons (with pagination)
router.get("/", authenticate, authorize(["admin", "user"]), personController.getAllPersons);

// Group persons by category
router.get("/group/category", authenticate, authorize(["admin", "user"]), personController.groupByCategory);

// Single person by ID
router.get("/:id", authenticate, authorize(["admin", "user"]), personController.getPersonById);

// Create person
router.post("/", authenticate, authorize(["admin", "user"]), upload.single("photo"), personController.createPerson);

// Update person
router.patch("/:id", authenticate, authorize(["admin", "user"]), upload.single("photo"), personController.updatePerson);

// Delete person
router.delete("/:id", authenticate, authorize(["admin", "user"]), personController.deletePerson);

// Bulk import (CSV/Excel)
router.post("/import", authenticate, authorize(["admin", "user"]), upload.single("file"), personController.importCSV);

export const PersonRoute = router;
