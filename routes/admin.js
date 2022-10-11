var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
  if (req.session.error) {
    res.render('admin_login', { title: 'Disney-Plus', "error": req.session.error });
    req.session.error = false
  }else if(req.session.user){
    res.redirect('/home')
  } else  {
    res.render('admin_login', { title: 'Disney-Plus' });
  }
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  if(req.session.user){
    res.render('admin_home', { title: 'Disney-Plus',movies});
  }else{
    res.redirect('/')
  }
});

/* GET login data collect. */

router.post('/login', function (req, res, next) {
  const data = req.body
  let user = {
    email: "nihal@gmail.com",
    password: 1234
  }
  if (user.email == data.email) {
    if (user.password == data.password) {
      req.session.user=data
      res.redirect('/home');
    } else {
      req.session.error = "Incorrect password"
      res.redirect('/')
    }
  } else {
    req.session.error = "Incorrect email"
    res.redirect('/')
  }
});

/* GET sign-out setup */

router.get('/signout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/');
});

/* Adiing card details */

let movies=[
  {
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_FGPQFao-KxfMQhF2bCgm1Uk9fVwTBIvuQQ&usqp=CAU",
    title:"Ratatouille",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content."
  },
  {
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0HfsyWpIByC7sv8zNkzQ9wyHINCPABCk0A&usqp=CAU",
    title:"Strange World",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content."
  },
  {
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8ylCXSGUayNN0hzlwFuWeDHOLQV55msGww&usqp=CAU",
    title:"Zootopia",
    description:"Some quick example text to build on the card title and make up the bulk of the card's content."
  }
]

module.exports = router;
