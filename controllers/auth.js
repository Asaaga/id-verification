const User = require('../models/users');
const bcrypt = require('bcryptjs');

exports.postAdminsignin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((admin) => {
    if (!admin) {
      req.flash('error', 'invalid email or password');
      return res.redirect('/adminsignin');
    }
    return bcrypt
      .compare(password, admin.password)
      .then((match) => {
        if (match) {
          req.session.isLoggedIn = true;
          req.session.admin = admin;
          return req.session.save((err) => {
            console.log(err);
            res.redirect('/dashboard');
          });
        }
        res.redirect('/');
        req.flash('error', 'invalid email or password');
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.postLoggedOut = (req, res, next) => {
  return req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
