var express = require('express');
var router = express.Router();

var goodModel = require('../model/goods');
var cateModel =require('../model/cates')
var articleModel = require('../model/article')

//新增商品
router.post('/addGood',function(req, res, next){
    let { name, img, price, desc, hot, cate,id,create_time} = req.body

    var good = {
        hot:(hot ? hot :false),
        name,
        img,
        price,
        desc,
        cate,
        create_time:Date.now()
    }
    if (id) {
        goodModel.updateOne({_id:id},good).then(()=>{
            res.json({err:0,msg:'修改成功'})
        })
    }else{
        goodModel.insertMany([good]).then(()=>{
            res.json({err:0,msg:'添加成功'})
        })
    }
})
//删除
router.get('/del',function(req,res){
    var {id} = req.query
    goodModel.deleteOne({_id:id}).then(()=>{
        res.json({err:0,msg:'删除成功'})
    })
})
// 获取全部品类
router.get('/getAllCates', function(req, res, next) {
    // 1 由小到大
    cateModel.find({}).then(arr=>{
        // console.log(arr)
      res.json({err:0,msg:'success',data:arr})
    }).catch(err=>{
      res.json({err:1,msg:'fail',err})
    })
  })
//商品详情
router.get('/detail',function(req,res){
    var {good_id} = req.query
    goodModel.find({_id:good_id}).then(arr=>{
        res.json({err:0,msg:'success',data:arr[0]})
    }).catch(()=>{
        res.json({err:1,msg:'没有找到当前商品'})
    })
})

//文章
router.post('/create',function(req,res){
    var {title,content} = req.body
    var article ={
        title,
        content,
        author:'zhp',
        create_time:Date.now()
    }
    articleModel.insertMany([article]).then(()=>{
        res.json({err:0,msg:'success'})
    })
})
// 查询
router.get('/list',function(req,res){
    var {page,size,name,hot,cate,max_price,min_price,brand,shop_id,create_time} = req.query
    //非必填数据处理
    page = parseInt(page ? page : 1)
    size = parseInt(size ? size : 2)

    var params = {
        hot: hot ? hot :false,
        cate: cate ? cate : false,
    }
    if (!params.hot) delete params.hot
    if (!params.cate) delete params.cate
    goodModel.count().then(total=>{
        goodModel.find(params).skip((page-1)*size).limit(size).sort({create_time:-1}).then(arr=>{
            res.json({err:0,msg:'success',data:{
                total:total,
                list:arr
            }})
        })
    })
})
module.exports = router;