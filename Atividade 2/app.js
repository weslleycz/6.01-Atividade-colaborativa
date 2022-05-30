const http = require("http");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const open = require("open");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

let tasks = [];

app.locals.tasks = tasks;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/add-Tasks/:task", (request, response) => {
  tasks.push(request.params.task);
  tasks.sort();
  return response.json({
    status: "ok",
    has_error: false,
  });
});

app.get("/complete-all", (request, response) => {
  tasks.length = 0;
  return response.json({
    status: "ok",
    has_error: false,
  });
});

app.get("/complete-task/:index", (request, response) => {
  console.log(request.params.index);
  tasks.splice(request.params.index,1);
  return response.json({
    status: "ok",
    has_error: false,
  });
});

http.createServer(app).listen(3000, async function () {
  console.log(`Server running on port ${3000}`);
  await open("http://localhost:3000");
});
