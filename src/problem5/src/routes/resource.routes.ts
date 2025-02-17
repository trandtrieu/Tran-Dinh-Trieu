import { Router, Request, Response } from "express";
import Resource from "../models/resource.model";

const router = Router();

// Create a resource
router.post("/", async (req: Request, res: Response) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ error: "Failed to create resource" });
    }
});

// List resources with basic filters
router.get("/", async (req: Request, res: Response) => {
    try {
        const resources = await Resource.find(req.query);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve resources" });
    }
});

// Get details of a resource
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const resource = await Resource.findById(req.params.id);
        res.json(resource);
    } catch (error) {
        res.status(404).json({ error: "Resource not found" });
    }
});

// Update resource details
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: "Failed to update resource" });
    }
});

// Delete a resource
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete resource" });
    }
});

export default router;
