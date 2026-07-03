import { Router } from "express";

const router = Router();

// Shared hero store (imported by admin route too)
export let heroConfig = {
  badge: "OPEN PLOTS • FARM LANDS • ANDHRA PRADESH",
  headline: "Own a piece of\nAndhra's growth\nstory.",
  subtext:
    "Neev Estate brings you DTCP-approved open plots and farm lands across Amaravati, Vijayawada, Guntur, Visakhapatnam and Tirupati — with clear titles and transparent pricing.",
  cta1: "View available plots",
  cta2: "Book a site visit",
  imageUrl:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80",
};

export const updateHero = (data) => {
  heroConfig = { ...heroConfig, ...data };
  return heroConfig;
};

router.get("/", (req, res) => res.json(heroConfig));

export default router;
