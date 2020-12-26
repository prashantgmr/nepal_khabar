const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getNews, addNews, deleteNews ,updateNews ,updateStatus, getOneNews} = require('../controller/newsController');


const Storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './user/public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() +"-"+ file.originalname);
  }
});



const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
  
};
const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
});

router
  .route('/')
  .get(getNews)
  .post(upload.single("imageFile"), addNews);
router
  .route('/update/:id')
  .put(upload.single("imageFile"), updateNews);
router
  .route('/change_status')
  .post(updateStatus)
router
  // .route('/?status=approved')
  // .get(getApproved)
router
  .route('/:id')
  .get(getOneNews)
  .delete(deleteNews);

module.exports = router;