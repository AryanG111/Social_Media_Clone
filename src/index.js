import { config } from './config/config.js';
import app from './app.js';
import mongoose from 'mongoose';


// Connect to MongoDB
mongoose.connect(config.mongoURI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});


// Start Server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

