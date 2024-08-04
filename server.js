const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cityRouter = require('./Router/Router');

const ROUTER = 4010;

app.use(express.json());

app.use("/api/v1", cityRouter);

const uri = "mongodb+srv://yen:Zenmind@cluster0.l71c9kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectDb() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
        console.log("error: " + error);
    }
}

app.listen(ROUTER, async () => {
    await connectDb().catch(console.dir);
    console.log(`http://localhost:${ROUTER}`);
});