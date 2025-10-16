import express from 'express';
import multer from 'multer';
import { uploadXML } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadXML);

router.get('/', (req, res) => {
  res.send('Upload API is active ✅');
});

export default router;
