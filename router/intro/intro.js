var express = require("express")
var app = express();
var router = express.Router();
var mysql = require("mysql");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var options = require('../option');
var mysql = require('mysql');

var loginData = {
        host: options.storageConfig.HOST,
        user: options.storageConfig.user,
        password: options.storageConfig.password
};


var connection = mysql.createConnection({
  host: loginData.host,
  port:3306,
  user:loginData.user,
  password:loginData.password,
  database:'sns'
})
connection.connect();

router.get('/', function(req, res){
  res.render('intro.ejs',{message:""})
})

passport.serializeUser(function(user, done){
  console.log("passport session save :", user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  console.log("passport session get id :", id);
  done(null, id);
});


passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'pw',
    passReqToCallback: true
  }, function(req, email, password, done){
    var query = connection.query('select * from user where email = ? and pw = ?', [email, password], function(err, rows){
      if(err) return done(err);
      if(rows.length){
          return done(null, {'email': email, 'id' :rows[0].id})
      }else{
          if(err) {throw err};
          return done(null, false, {'message':''});
      }
    })
  }
));

router.post('/login', function(req, res, next){
  passport.authenticate('local-login',function(err, user, info){
    if(err) res.status(500).json(err);
    if(!user){return res.status(400).json(info.message);}

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
})

passport.use('local-join', new localStrategy({
    usernameField: 'email',
    passwordField: 'pw',
    passReqToCallback: true
  }, function(req, email, password, done){
    var phone = req.body.phone;
    var intro = req.body.intro;
    var repw = req.body.repw;
    var picture = req.body.picture;


    if(email==="이메일을 입력하세요"){
      return done(null, false,{message: '이메일을 입력하셔야 합니다.'})
    }
    if(email.indexOf('@')===-1||email.indexOf('.')===-1){
      return done(null, false,{message: '이메일을 양식에 맞게 입력하셔야 합니다.'})
    }
    if(password==="ipsumipsumipsum"){
      return done(null, false,{message: '비밀번호를 입력하셔야 합니다.'})
    }
    if(password!==repw){
      return done(null, false,{message: '확인 비밀번호가 다릅니다'})
    }
    if(phone==="( - ) 없이 입력하세요"){
      phone = null;
    }
    if(intro==="자기소개를 입력하세요"){
      intro = null;
    }
    var query = connection.query('select * from user where email = ?', [email], function(err, rows){
      if(err) return done(err);
      if(rows.length){
        return done(null, false,{message: '사용중인 이메일 입니다.'})
      }else{
        var sql = {email:email, pw:password, phone:phone, intro:intro, picture:picture}
        var query = connection.query('insert into user set ?', sql, function(err,rows){
          if(err) {throw err};
          return done(null, {'email':email, 'id' :rows.insertId})
        })
      }
    })
  }
));

router.post('/join', passport.authenticate('local-join', {
  successRedirect: '/intro/',
  failureRedirect: '/intro/join',
  failureFlash: true,
}))

module.exports = router;
