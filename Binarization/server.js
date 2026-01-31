const express = require("express");
const binarizeRoute = require("./routes/binarize");

const app = express();
app.use("/binarization", express.static("public"));
app.use("/binarization/upload", binarizeRoute);

app.listen(5000, () =>
  console.log("Running on http://localhost:5000/binarization")
);
