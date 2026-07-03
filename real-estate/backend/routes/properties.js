import { Router } from "express";
import { properties } from "../data/properties.js";

const router = Router();

// GET all properties with optional filters
router.get("/", (req, res) => {
  const { city, category } = req.query;
  let result = [...properties];

  if (city) result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
  if (category) result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  res.json(result);
});

// GET single property
router.get("/:id", (req, res) => {
  const property = properties.find((p) => p.id === parseInt(req.params.id));
  if (!property) return res.status(404).json({ message: "Plot not found" });
  res.json(property);
});

export default router;
