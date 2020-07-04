var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')
var fs = require('fs')
var path = require('path')

router.post('/img',function(req,res,next){
    var form = new multiparty.Form()
    form.parse(req,function(err,fields,files){
        if (err) {
            res.json({err:1,msg:'图片上传失败'})
        } else {
            var img = files.file[0]
            // 管道流
            // 读取流 ---  > 写入流
            // 把临时路径中的图片读取，写入到静态资源服务器/public
            var now = Date.now()
            var readStream = fs.createReadStream(img.path)
               // 相对路径
                // var writeStream = fs.createWriteStream('./public/imgs/'+img.originalFilename)
            //绝对路径
            var writeStream = fs.createWriteStream(path.join(__dirname,'../public/imgs/'+now+img.originalFilename))
            readStream.pipe(writeStream)
            //当管理流关闭时（即文件读写完成时）
            writeStream.on('close',function(){
                res.json({err:0,msg:'success',data:{
                    url: '/imgs/' + now + img.originalFilename
                }})
            })
        }
    })
})

module.exports = router