const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const upload = require('../middleware/upload');

router.get('/', studentController.getIndex);
router.get('/dashboard', studentController.getDashboard);
router.get('/add-student', studentController.getAddStudent);
router.post(
  '/add_student',
  upload.single('image'),
  studentController.postAddStudent
);

router.post('/delete', studentController.postDeleteStudent);
router.get('/student/:studId', studentController.getStudent);
module.exports = router;
