const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const tradeRouter = require("./routers/tradeRouter");
const userRouter = require("./routers/userRouter");

app.use(
    cors({
        origin: "*",
    })
);

app.use("/trade", tradeRouter);
app.use("/user", userRouter);

app.listen(1337, () => {
    console.log("server is running on port 1337");
});