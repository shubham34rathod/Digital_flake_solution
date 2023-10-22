const express=require('express')
const {userModel}=require('./data_base/db.js')
const cors=require('cors')
const router=require('./router/router.js')
require('dotenv').config()

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)


// app.get('/',(req,res)=>{
//     res.send('hello')
// })

app.listen(8000,()=>{console.log('coonected to 8000 port')})