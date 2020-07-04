var mongoose = require('mongoose')

// 操作的基础单元，就是集合
module.exports = mongoose.model('carts', mongoose.Schema({
  create_time: Number,
  order_id: String,
  good_id: String,
  user_id: String
}))
