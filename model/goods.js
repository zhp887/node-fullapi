var mongoose = require('mongoose')
var addGoodSchema = mongoose.Schema({
    img:String,//图片
    name: String,//商品名称
    desc:String,//商品描述
    price:Number,//价格
    cate:String,//品类
    hot:Boolean,//是否推荐
    rank: Number,   // 排名，先后顺序
    create_time:Number,
    cate_zh:String,
    shop:Object,
    shop_id:String
})

var addGoodModel = mongoose.model('goods', addGoodSchema)

module.exports = addGoodModel