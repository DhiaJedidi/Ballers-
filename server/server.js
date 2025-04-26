const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");

const fs = require('fs');
const path = require('path');
const multer = require('multer');


const UserModel = require('./models/User');
const ProductModel = require('./models/Product');
const AdminModel = require('./models/Admin');
const Order = require('./models/Order');

const app = express()
const b=express.urlencoded({extends:true})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json())
app.use(cors())


const url = 'mongodb://localhost:27017/ballers';
mongoose.connect(url)


// Setup where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // make filename unique
  },
});

const upload = multer({ storage });



// app.post('/login', (req,res) =>{
//    const {email , password , displayId} = req.body
//    UserModel.findOne({email : email})
//    .then(user =>{
//       console.log(user)
//       if(user){
//          if(user.password === password){
//             res.json('success')
//          }
//          else{
//             res.json("incorrect password ")
//          }
//       }
//       else{
//          res.send('invalid email')
//       }
// })})

app.post('/login', async (req, res) => {
   const { email, password } = req.body;
   const user = await user.findOne({ email });
 
   if (!user || !password) {
     return res.status(401).json({ message: 'Invalid credentials' });
   }
 
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
     expiresIn: '1d',
   });
 
   res.json({ token });
 });

app.post('/loginadmin', (req,res) =>{
   const {email , password } = req.body
   AdminModel.findOne({email : email})
   .then(admin =>{
      console.log(admin)
      if(admin){
         if(admin.password === password){
            res.json('success')
         }
         else{
            res.json("incorrect password ")
         }
      }
      else{
         res.send('invalid email')
      }
})})

app.post('/signin',(req,res) =>  {
   UserModel.create(req.body)
   .then(Users => res.json(Users))
   .catch(err => res.json(err))
} )

app.post('/signupadmin', (req, res) => {
   console.log('Received admin signup:', req.body); // 👈 Add this

   AdminModel.create(req.body)
     .then(admin => {
        console.log('Admin saved:', admin); // 👈 And this
        res.json(admin);
     })
     .catch(err => {
        console.error('Error saving admin:', err); // 👈 And this
        res.status(500).json({ error: 'Could not save admin' });
     });
});

// In your Node.js backend (Express)
app.get('/products', async (req, res) => {
   try {
     const products = await ProductModel.find();  // Use the Product model here
     res.json(products); // Send the products array as JSON to the frontend
   } catch (err) {
     console.error("Error fetching products:", err);
     res.status(500).send("Error fetching products");
   }
 });


 app.get('/users', async (req, res) => {
   try {
     const users = await UserModel.find();
     res.json(users);
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 });


 
 app.delete('/users/:id', async (req, res) => {
   try {
     const result = await UserModel.findByIdAndDelete(req.params.id);
     if (!result) {
       return res.status(404).send({ error: 'User not found' });
     }
     res.status(200).send({ message: 'User deleted' });
   } catch (err) {
     console.error('Error deleting user:', err);
     res.status(500).send({ error: 'Server error' });
   }
 });
 
 app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Assuming you're using Mongoose
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

app.post('/products', upload.single('img'), async (req, res) => {
  try {
    console.log('req.file:', req.file);   // this should now exist!

    const { nom, price, color, categorie } = req.body;
    const img = req.file.filename;  // this will no longer crash

    const newProduct = new ProductModel({
      nom,
      price,
      color,
      categorie,
      img
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});


app.listen(3001,() => {
   console.log("server work")
})