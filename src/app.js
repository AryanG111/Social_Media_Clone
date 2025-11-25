import express from 'express';

const app = express();

// define routes
//app.use("/api/users", usersRoutes);
//app.use("/api/posts", postRoutes);
app.get("/", (req, res)=>{
    res.status(404);
    res.json({message: "Hello World"});
})      
app.get("/greet/:name", (req, res)=>{
    res.send("<h1>Hello " + req.params.name + "</h1>");
})


export default app;