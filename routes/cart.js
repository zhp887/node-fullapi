var express = require('express');
var router = express.Router();
var cartModel = require('../model/carts')
var userModel = require('../model/users')
var goodModel = require('../model/goods')
var jwt = require('../utils/jwt')

//买东西，添加购物车（用户鉴权）
router.get('add',function(req,res,next){
    var {good_id} = req.query
    //验证必填参数
    if(!good_id) return res.json({err:1,msg:'good_id是必填字段'})
    //判断该商品是否存在
    goodModel.find({_id:good_id}).then(arr=>{
        if (arr.length > 0) {
            //判断token有没有传递过来
            var token = req.headers.authorization
            if (!token) return res.json({err:-1,msg:'token无效，请重新登录'})
            //用户鉴权
            jwt.verifyToken(token).then(user=>{
                //根据用户名查询用户信息
                userModel.find(user).then(arr=>{
                    var user_id = arr[0]._id
                    //入库操作
                    var ele = {
                        good_id,
                        user_id,
                        create_time:Date.now(),
                        order_id:'QF'+Date.now()
                    }
                    cartModel.insertMany([ele]).then(()=>{
                        res.json({err:0,msg:'添加购物车成功',data:ele})
                    })
                })
            }).catch(()=>{
                res.json({err:-1,msg:'token无效，请重新登录'})
            })
        }
    }).catch(()=>{
        res.json({err:0,msg:'当前商品不存在，无法购买'})
    })
})
module.exports = router