var express = require('express');
var router = express.Router();
var data=require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/list', function(req, res, next) {
  var username=req.body.username;
  var pwd=req.body.pwd;
  var username1=data.users[0].username;
  var pwd1=data.users[0].password;
  req.setEncoding('utf-8');
  if(username==username1 && pwd==pwd1){
    res.render('list',{chapterList:data.chapterList});
  }
  else{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end('用户名密码错误');
  }
  // res.render('list', { title: 'Express' });
});
router.get('/list',function(req,res,next) {
  res.render('list',{chapterList:data.chapterList})
})




// router.get("/login",function(req,res,next){
//   res.render("login","success");
//   console.log("success");
// }) 


module.exports = router;
