var mongoose = require('mongoose')
//注意数据库名称
mongoose.connect('mongodb://localhost:27017/qf2001',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var con = mongoose.connection

con.on('error',function(err){
    console.log('数据库连接失败',err)
})
con.once('open',function(){
    console.log('数据库连接成功')
})