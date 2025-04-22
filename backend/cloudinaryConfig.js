import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const singleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`
  }
});
export const uploadSingle = multer({ storage: singleStorage });

const multiStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'lostandfound_items',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`
  }
});
export const uploadMultiple = multer({ storage: multiStorage });
