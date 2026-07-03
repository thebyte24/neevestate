import express from "express";
import cors from "cors";
import propertiesRouter from "./routes/properties.js";
import adminRouter from "./routes/admin.js";
import heroRouter from "./routes/hero.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/properties", propertiesRouter);
app.use("/api/hero", heroRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => res.json({ message: "Real Estate API running" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
