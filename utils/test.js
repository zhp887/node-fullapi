// var jwt = require('jsonwebtoken')

// function verifyToken(token){
//     var decoded = jwt.verify(token,"qfhappy")
//     console.log('token',decoded)
// }

// module.exports = verifyToken

// var jwt = require('jsonwebtoken')

// function verifyToken(token) {
//   return new Promise(function(resolve, reject){
//     try {
//       var decoded = jwt.verify(token, 'qfhappy');
//       resolve(decoded.data)
//     } catch(err) {
//       reject('token验证失败')
//     }
//   })
// }

// verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTM1NzQ4OTAsImRhdGEiOnsidXNlcm5hbWUiOiJ4aWEiLCJwYXNzd29yZCI6ImFiYzEyMyJ9LCJpYXQiOjE1OTM1NzEyOTB9.0qks0opj0nU3KR6MdXUY-xDLxTi72GTQpOXzRbrdU0Pc').then((res)=>{
//   console.log('user', res)
// }).catch(err=>{
//   console.log(err)
// })
