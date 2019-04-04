const User = require("../model/user");
const bcrypt = require("bcryptjs");
const passport = require('passport');

exports.userLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login Page"
  });
};

exports.userRegister = (req, res, next) => {
  res.render("register", {
    pageTitle: "registration Page"
  });
};

exports.postUserRegister = (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check all fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //password check
  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  //check for password length
  if (password.length < 6) {
    errors.push({ msg: "password must be at least of 6 character" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
      pageTitle: "error"
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "email is already in use" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
          pageTitle: "error"
        });
      } else {
        const user = new User({
          name,
          email,
          password
        });
        //hash password
        bcrypt.genSalt(12, (err, salt) =>
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw new err();
            user.password = hash;

            //save user
            user
              .save()
              .then(user => {
                req.flash('success_msg', 'You are now registered')
                res.redirect("/user/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }

  // User.findOne({ email: email })
  // .then(userDoc => {
  //   if (userDoc) {
  //     return res.redirect("/user/register");
  //   }
  //   return bcrypt
  //     .hash(password, 12)
  //     .then(hashedPassword => {
  //       const user = new User({
  //         name: name,
  //         email: email,
  //         password: hashedPassword,
  //       });
  //       return user.save();
  //     })
  //     .then(result => {
  //       res.redirect("/user/login");
  //     });
  // })

  // .catch(err => console.log(err));
};


exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
}

exports.logout = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are logged out!!!');
  res.redirect('/user/login');
}
