import { Router } from "express";
import { properties } from "../data/properties.js";
import { heroConfig, updateHero } from "./hero.js";

const router = Router();

const ADMIN_PASSWORD = "neev@admin123";

router.use((req, res, next) => {
  const auth = req.headers["x-admin-password"];
  if (auth !== ADMIN_PASSWORD) return res.status(401).json({ message: "Unauthorized" });
  next();
});

// Hero
router.get("/hero", (req, res) => res.json(heroConfig));
router.put("/hero", (req, res) => res.json(updateHero(req.body)));

// Plots
router.get("/plots", (req, res) => res.json(properties));

router.post("/plots", (req, res) => {
  const newPlot = { ...req.body, id: Date.now() };
  properties.push(newPlot);
  res.status(201).json(newPlot);
});

router.put("/plots/:id", (req, res) => {
  const idx = properties.findIndex((p) => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  properties[idx] = { ...properties[idx], ...req.body };
  res.json(properties[idx]);
});

router.delete("/plots/:id", (req, res) => {
  const idx = properties.findIndex((p) => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  properties.splice(idx, 1);
  res.json({ message: "Deleted" });
});

export default router;
