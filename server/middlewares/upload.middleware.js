const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const v2 = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "product-users/profile-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        height: 400,
        width: 400,
        crop: "fill",
      },
    ],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});
module.exports = upload;
