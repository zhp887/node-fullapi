var mongoose = require('mongoose')

//操作的基础单元，就是集合
module.exports = mongoose.model('users',mongoose.Schema({
    username:String,
    password:String,
    role:Number,
    phone:String,
    email:String,
    create_time:Number,
}))
