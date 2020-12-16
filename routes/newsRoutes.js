const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getNews, addNews, deleteNews ,updateNews ,updateStatus } = require('../controller/newsController');


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
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router
  .route('/')
  .get(getNews)
  .post(upload.single("imageFile"), addNews);
router
  .route('/edit/:id')
  .post(updateNews);
router
  .route('/change_status')
  .post(updateStatus)
  router
  .get('/?district=:idx')
router
  .route('/:id')
  .delete(deleteNews);

module.exports = router;