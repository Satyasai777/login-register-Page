const express=require("express");
const mongoose=require("mongoose");
const cors=require('cors');
const app=express();
const dotEnv=require('dotenv');
const bcrypt=require('bcrypt');
const userSchema=require('./model/CreateUser');

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended : true}))
dotEnv.config();

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log('succesfully connected to MongoDB')
})
.catch((err)=>{
    console.log(err)
})



app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userSchema.findOne({ email });

        if (user) {
            return res.status(200).json("User exists" );
        } else {
            return res.status(404).json("User does not exist");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userSchema({
            userName,
            email,
            password: hashedPassword
        });

        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }
        else{
            // await user.save();
            await userSchema.insertMany([user]);
            res.status(201).json("User registered successfully");
        }
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(8000,()=>[
    console.log("succesfully running the server")
])



