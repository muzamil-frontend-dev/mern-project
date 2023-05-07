import asyncHandler from "express-async-handler";
import multer from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().now() + "-" + Math.round(Math.random() * 1e9);
    const fileEx = path.extname(file.originalname);
    console.log(fileEx);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileEx);
  },
});

const fileFilter = function (file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  let types = /.jpg|.png|.jpeg/;

  let fileTypes = path.extname(file.originalname).toLocaleLowerCase();

  let mimeTypes = file.mimetype.toLocaleLowerCase();

  console.log(fileTypes, mimeTypes);

  const fileTypeValid = types.test(fileTypes);
  const mimeTypeValid = types.test(mimeTypes);

  if (fileTypeValid && mimeTypeValid) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To accept the file pass `false`, like so:
    cb(null, false);
  }
};

export const multerConfig = multer({
  storage: diskStorage,
  fileFilter: function (req, file, cb) {
    return fileFilter(file, cd);
  },
});

// Path     /api/admin/uploads
// Type     PUT
// Access   Private
// Desc     Upload Product Image
export const uploadImage = asyncHandler(async (req, res) => {
  const image = req.url;
  return res.json({ imageUrl: image.path });
});
