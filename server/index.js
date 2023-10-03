    import express from 'express'
    import bodyParser from 'body-parser'
    import mongoose from 'mongoose';
    import cors from 'cors'
    import dotenv from 'dotenv'
    import postRoute from './routes/posts.js';
    import userRouter from "./routes/users.js";
   
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());
    dotenv.config() 
    app.use(cors())
    app.use('/posts',postRoute)
    app.use("/user", userRouter);

    app.use(bodyParser.json({limit:"30mb",extended:true}))
    app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
    

    const PORT =  process.env.PORT || 5001

    app.listen(PORT, "0.0.0.0", function() {
        console.log("Listening on Port 3000");
        });

    app.get('/',(req,res) => {
        res.send('Hello to memories api')
    })

    //const CONNECTION_URL = 'mongodb+srv://similrenjith:4oOjiKR2zLfXH4Jq@cluster0.cbgtfzk.mongodb.net/post'
    

    mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology:true}).then(
        ()=>{ 

        }
    ).catch((error)=>{
        console.log(error);
    })

    //mongoose.set('useFindAndModify',false);
