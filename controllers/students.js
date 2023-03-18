const Student = require('../models/students');

const qr = require('qrcode');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    pageTitle: 'HOME',
    path: '/',
  });
};
exports.getDashboard = (req, res, next) => {
  Student.find().then((students) => {
    res.render('dashboard', {
      pageTitle: 'Dashboard',
      path: '/dashboard',
      students: students,
    });
  });
};
exports.getAddStudent = (req, res, next) => {
  res.render('add-student', {
    pageTitle: 'Dashboard',
    path: '/add-student',
  });
};
exports.postAddStudent = (req, res, next) => {
  const firstName = req.body.fname;
  const secondName = req.body.sname;
  const matric = req.body.matric;
  const level = req.body.level;
  const Expiry = req.body.expire_date;
  const school = 'bingham University';

  let data = {
    name: firstName + ' ' + secondName,
    Expiry: Expiry,
    school: school,
    matric: matric,
  };
  let stJson = JSON.stringify(data);
  const field = `images/${Date.now()}.png`;
  qr.toFile(field, stJson, (err) => {
    if (err) return console.log('error');
  });

  const student = new Student({
    firstName: firstName,
    secondName: secondName,
    matric: matric,
    level: level,
    Expiry: Expiry,
    school: school,
    barcode: field,
  });

  if (req.file) {
    student.image = req.file.path;
  }
  student
    .save()
    .then((result) => {
      res.redirect('/dashboard');
    })
    .catch((err) => {
      console.log('error ');
    });
};
exports.getStudent = (req, res, next) => {
  const studId = req.params.studId;
  Student.findById(studId).then((student) => {
    res.render('student', {
      pageTitle: 'Student Profile',
      path: '/student',
      student: student,
    });
  });
};
exports.postDeleteStudent = (req, res, next) => {
  const studentId = req.body.studentId;
  Student.findByIdAndRemove(studentId)
    .then((result) => {
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.log(error);
    });
};
