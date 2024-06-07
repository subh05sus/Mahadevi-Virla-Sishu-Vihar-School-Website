import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import Highlight from "../models/Highlight";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const image = req.file as Express.Multer.File;
      const newTitle: string = req.body.title;
      const newContent: string = req.body.content;

      // Upload image to cloudinary
      const imageUrl = await uploadImage(image);

      const newHighlight = new Highlight({
        title: newTitle,
        imageUrl: imageUrl,
        content: newContent,
      });

      // Save the new highlight to the database
      await newHighlight.save();

      res.status(201).send(newHighlight);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);


router.get("/", async (req: Request, res: Response) => {
  try {
    const highlights = await Highlight.find().sort("-_id");
    res.status(200).json(highlights);
  } catch (error) {
    console.error("Error fetching highlights:", error);
    res.status(500).json({ message: "Failed to fetch highlights" });
  }
});

async function uploadImage(image: Express.Multer.File) {
  const b64 = Buffer.from(image.buffer).toString("base64");
  let dataURI = "data:" + image.mimetype + ";base64," + b64;
  const res = await cloudinary.v2.uploader.upload(dataURI);
  return res.url;
}

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    if (!highlight) {
      return res.status(404).json({ message: "Highlight not found" });
    }
    res.status(200).json(highlight);
  } catch (error) {
    console.error("Error fetching highlight:", error);
    res.status(500).json({ message: "Failed to fetch highlight" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Highlight.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Failed to delete highlight:", error);
    res.status(500).json({ message: "Failed to delete highlight" });
  }
});


export default router;
