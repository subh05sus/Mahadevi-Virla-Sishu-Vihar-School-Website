import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import CarouselImage from "../models/CarouselImage";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Upload carousel image
router.post(
  "/",
  verifyToken,
  upload.single("carouselImage"),
  async (req: Request, res: Response) => {
    try {
      const carouselImage = req.file as Express.Multer.File;
      const featuredText: string = req.body.featuredText;
      const ButtonLink: string = req.body.ButtonLink;

      // Upload image to cloudinary
      const imageUrl = await uploadImage(carouselImage);

      const newCarouselImage = new CarouselImage({
        imageUrl: imageUrl,
        featuredText:featuredText,
        ButtonLink:ButtonLink,
      });

      // Save the new carousel image to the database
      await newCarouselImage.save();

      res.status(201).send(newCarouselImage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Fetch all carousel images
router.get("/", async (req: Request, res: Response) => {
  try {
    const carouselImages = await CarouselImage.find();
    res.status(200).json(carouselImages);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    res.status(500).json({ message: "Failed to fetch carousel images" });
  }
});

// Delete carousel image
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await CarouselImage.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Failed to delete carousel image:", error);
    res.status(500).json({ message: "Failed to delete carousel image" });
  }
});

async function uploadImage(image: Express.Multer.File) {
  const b64 = Buffer.from(image.buffer).toString("base64");
  let dataURI = "data:" + image.mimetype + ";base64," + b64;
  const res = await cloudinary.v2.uploader.upload(dataURI);
  return res.url;
}

export default router;
