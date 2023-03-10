const express = require("express");

const showRouter = require("./routes/shows");
const userRouter = require("./routes/users");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/shows", showRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
