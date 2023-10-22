const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(`${process.env.DB_URL}+${process.env.DB_NAME}`)
.then(()=>console.log('connected to db'))
.catch(()=>console.log('connection error'))

//user schema

let userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    token:{type:String},
    password:{type:String}
},{timestamps:true})

let userModel=mongoose.model('user_info',userSchema)

//product schema

let productSchema=new mongoose.Schema({
    userId:{type:String},
    category:{type:String},
    name:{type:String},
    size:{type:String},
    price:{type:String},
    image:{type:String},
    status:{type:String}
})

let productModel=mongoose.model('products',productSchema)

//category schema

let categorySchama=new mongoose.Schema({
    category:{type:String},
    description:{type:String},
    status:{type:String}
})

let categoryModel=mongoose.model('category',categorySchama)

module.exports={userModel,productModel,categoryModel}