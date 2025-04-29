import { Router } from "express";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../controllers/menuItems.controller";

const router = Router();

router.get("/", getMenuItems);
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
