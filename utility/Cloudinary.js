import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAM,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'gallary',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});

const uploadToCloudinary = multer({ storage: storage });

const uploadMultipuleFile = uploadToCloudinary.array("image", 10)

const uploadSingleFile = uploadToCloudinary.single("image", 10)

export {
  uploadMultipuleFile,
  uploadSingleFile
}