const express = require('express')
const { Registeruser, afterRegistration } = require('../controler/Auth')
const { AddBlog } = require('../controler/AddBlog')
const { bloglike } = require('../controler/bloglike')
const { blogcomment } = require('../controler/blogcomment')
const { folower } = require('../controler/folower')
const { loginuser } = require('../controler/loginuser')
const { getUser } = require('../controler/getUser')
const { getblog } = require('../controler/getblog')
const router = express.Router()


router.post('/userregister', Registeruser)
.post('/afterRegisteration', afterRegistration)
.post('/loginuser', loginuser)
.post('/userBlog', AddBlog)
.post('/bloglike', bloglike)
.post('/blogcomment', blogcomment)
.post('/folower', folower)
.get('/loginuserDetail', getUser)
.get('/getblog', getblog)


module.exports = router