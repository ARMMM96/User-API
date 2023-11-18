require("dotenv").config();
const app = require("./app/app");
const colors = require("colors");

app.listen(process.env.PORT || 3000, () =>
  console.log(`http://localhost:${process.env.PORT|| 3000}`.bold.brightBlue.underline)
);
