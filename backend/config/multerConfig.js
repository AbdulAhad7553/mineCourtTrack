// config/multerConfig.js
import multer from 'multer';
import cloudinary from './Cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // You can change this to any folder you want in your Cloudinary account
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

const parser = multer({ storage: storage });

export default parser;
