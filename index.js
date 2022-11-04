const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

// app middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
  
app.use(cors());

// route middlewares
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    author: "Oliver Ikegah",
    project: "Simple Blog API with JWT auth"
  })
})

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is up and running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

