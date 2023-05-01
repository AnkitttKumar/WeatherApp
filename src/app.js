//all dependencies

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
// public static path

const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../Templates/views");
const partials_path = path.join(__dirname, "../Templates/partials");

//setting up dynamically hbs

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.static(staticPath));

//routing

app.get("", (req, res) => {
  res.render("index");
});

//about page

app.get("/about", (req, res) => {
  res.render("about");
});

//weather page

app.get("/weather", (req, res) => {
  res.render("weather");
});

// else error page

app.get("*", (req, res) => {
  res.render("error", {
    errorMsg: "Oops! Page Doesn't exist",
  });
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});

// test
