var express = require('express');
var router = express.Router();

var userModel = require('../model/users')
var jwt = require('../utils/jwt')
var md5 = require('md5');

//用户注册
router.post('/regist', function (req, res, next) {

  // var username = req.body.username
  // var password = req.body.password
  var { username, password ,role} = req.body
  //必填与非必填验证
  if (!username) return res.json({ err: -1, msg: '缺少必填参数用户名' })
  if (!password) return res.json({ err: -1, msg: '缺少必填参数密码' })
  //数据类型以及数据格式（需求）
  if (!/[a-zA-Z]{3,16}/.test(username)) {
    return res.json({ res: 2, msg: '用户名要求是3-16位纯字母组成' })
  }
  if (!/^[a-zA-Z][a-zA-Z0-9\@\_\-]{5,17}$/.test(password)) {
    return res.json({ res: 2, msg: '密码不符合要求' })
  }
  //业务验证
  userModel.find({ username }).then(arr => {
    if (arr && arr.length > 0) {
      res.json({ err: 3, msg: '用户名已被占用' })
    } else {
      var ele ={
        username,
        password:md5(password),
        role:role ? role : 1,
        create_time: Date.now()
      }
      userModel.insertMany([ele]).then(() => {
        res.json({ err: 0, msg: 'success', data: {username} })
      }).catch().finally()
    }
  })
  // console.log('入参', req.body)
})

//用户登录
router.post('/login',function(req,res){
  var username = req.body.username
  var password= req.body.password


   //必填与非必填验证
   if (!username) return res.json({ err: -1, msg: '缺少必填参数用户名' })
   if (!password) return res.json({ err: -1, msg: '缺少必填参数密码' })
   //查询集合，如果有这条记录就是登录成功
  //  var ele = {
  //   username:md5(username),
  //   password:md5(password),
  // }
  // console.log(ele)
   userModel.find({username}).then(arr=>{
     if (arr && arr.length>0) {
       //查询其他集合
       res.json({err:0,msg:'success',data:{
         navs:[],
         role:1,
         username,
         avatar:'',
         token:jwt.createToken({username,password})
       }})
     }
   })
})
module.exports = router;
