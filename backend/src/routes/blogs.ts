import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import Blog from "../models/Blog";

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
  upload.single("thumbnailImage"),
  async (req: Request, res: Response) => {
    try {
      const thumbnailImage = req.file as Express.Multer.File;
      const newTitle: string = req.body.title;
      const newContent: string = req.body.content;
      const newAuthor: string = req.body.author;
      const newPublishDate: string = req.body.publishDate;

      // Upload illustration image to cloudinary
      const thumbnailImageUrl = await uploadImage(thumbnailImage);

      const newBlog = new Blog({
        title: newTitle,
        thumbnailImageUrl: thumbnailImageUrl,
        content: newContent,
        author: newAuthor,
        publishDate: newPublishDate,
      });

      // Save the new destination to the database
      await newBlog.save();

      res.status(201).send(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
router.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort("-publishDate");
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
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
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

// Search blogs
router.get("/", async (req, res) => {
  const { searchTerm } = req.query;
  try {
      let blogs;
      if (searchTerm) {
          blogs = await Blog.find({ title: { $regex: searchTerm, $options: "i" } });
      } else {
          blogs = await Blog.find();
      }
      res.json(blogs);
  } catch (error) {
      console.error("Failed to search blogs:", error);
      res.status(500).json({ message: "Failed to search blogs" });
  }
});

// Delete blog
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      await Blog.findByIdAndDelete(id);
      res.status(204).end();
  } catch (error) {
      console.error("Failed to delete blog:", error);
      res.status(500).json({ message: "Failed to delete blog" });
  }
});

export default router;
