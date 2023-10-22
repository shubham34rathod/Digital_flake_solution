const router=require('express').Router()
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
let nodemailer = require('nodemailer');
const {userModel, categoryModel, productModel}=require('../data_base/db.js')

router.get('/',(req,res)=>{
    res.send('hi')
})

//new user

router.post('/new_user',async(req,res)=>{
    try 
    {
        console.log(req.body);
        req.body.password=await bcrypt.hash(req.body.password,10)
        let token=await jwt.sign(req.body.email,process.env.SECRET_KET)
        let doc=new userModel({...req.body,token:token})        
        let new_user=await doc.save()
        res.json(new_user);
    } 
    catch (error) 
    {
        
    }
})

//login user

router.post('/login',async(req,res)=>{
    try 
    {
        // console.log(req.body);
        let user_data=await userModel.findOne({email:req.body.email})
        if(user_data)
        {
            // res.json(user_data.name)
            let check_password=await bcrypt.compare(req.body.password,user_data.password)
            if(check_password)
            {
                let {password,...other_data}=user_data._doc
                // console.log('true');
                res.json(['login success',other_data])
            }
            else
            {
                res.json('wront password');
            }
        }
        else
        {
            res.json('user not registered')
        }
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//forgot password 

router.post('/forgot_password',async(req,res)=>{
    try 
    {
        console.log('forgot called');
        console.log(req.body.email);
        // console.log(req.body);
        let user=await userModel.findOne({email:req.body.email})
        if(user)
        {
            res.json('user found')
            let token=jwt.sign({id:user._id},process.env.SECRET_KET,{expiresIn:"1d"})

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'shubhamrathod267@gmail.com',
                  pass: 'qoet wpka uznl fczm'
                }
              });
              
              let mailOptions = {
                from: 'shubhamrathod267@gmail.com',
                // to: user.email,
                to: 'rathod22shubham@gmail.com ',
                subject: 'Reset your password',
                text: `http://localhost:3000/forgot_password/${user._id}/${token}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                //   console.log('Email sent: ' + info.response);
                    res.json('status success')
                }
              });
        }
        else
        {
            res.json('user not found')
        }
    } 
    catch (error) 
    {
        
    }
})

//reset password 

router.post('/reset_password/:id/:token',async(req,res)=>{
    try 
    {
        let id=req.params.id
        let token=req.params.token
        // console.log('reset called');
        // console.log(req.body);
        req.body.newPassword=await bcrypt.hash(req.body.newPassword,10)
        let user=await userModel.findByIdAndUpdate(id,{$set:{password:req.body.newPassword}})
        res.json('password update successfully')
    } 
    catch (error) 
    {
        
    }
})

//get category

router.get('/get_category',async(req,res)=>{
    try 
    {
        let data=await categoryModel.find()
        res.json(data)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//get category by id

router.get('/get_category/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        // console.log(id);
        let data=await categoryModel.findById(id)
        res.json(data)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

// update category

router.post('/update_category/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        // console.log(id);
        // console.log(req.body);
        let data=await categoryModel.findByIdAndUpdate(id,{$set:{category:req.body.name,description:req.body.description,status:req.body.status}})
        res.json('data updated')
    } 
    catch (error) 
    {
        res.json(error)
    }
})


//add category

router.post('/add_category',async(req,res)=>{
    try 
    {
        console.log(req.body);
        let new_category=await categoryModel({
            category:req.body.name,
            description:req.body.description,
            status:req.body.status
        })
        await new_category.save()

        res.json('category added')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//delete category 

router.get('/delete_category/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        console.log('delete',id);
        await categoryModel.findByIdAndDelete(id)
        res.json('category deleted')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//get products

router.get('/get_products',async(req,res)=>{
    try 
    {
        let data=await productModel.find()
        res.json(data)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//get product by id

router.get('/get_product/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        // console.log(id);
        let data=await productModel.findById(id)
        res.json(data)
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//add product

router.post('/add_product',async(req,res)=>{
    try 
    {
        // console.log(req.body);
        let new_category=await productModel({
            userId:req.body.userID,
            category:req.body.category,
            name:req.body.name,
            size:req.body.size,
            price:req.body.mrp,
            image:req.body.image,
            status:req.body.status
        })
        await new_category.save()

        res.json('product added')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

// update product

router.post('/update_product/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        console.log(id);
        console.log(req.body);
        let data=await productModel.findByIdAndUpdate(id,{$set:
            {
                userId:req.body.userID,
                category:req.body.category,
                name:req.body.name,
                size:req.body.size,
                price:req.body.mrp,
                image:req.body.image,
                status:req.body.status
            }
        })
        res.json('data updated')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

//delete product 

router.get('/delete_product/:id',async(req,res)=>{
    try 
    {
        let id=req.params.id
        console.log('delete',id);
        await productModel.findByIdAndDelete(id)
        res.json('product deleted')
    } 
    catch (error) 
    {
        res.json(error)
    }
})

module.exports=router