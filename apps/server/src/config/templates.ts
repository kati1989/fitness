import express from "express";
import path from "path";

const templateConfiguration = (app: express.Application) => {
  const engine = process.env.TEMPLATE_ENGINE;

  switch (engine) {
    case "ejs":
      app.set("view engine", "ejs");
      app.set("views", path.join(__dirname, "../templates/ejs"));
      break;
    case "pug":
      app.set("view engine", "pug");
      app.set("views", path.join(__dirname, "../templates/pug"));
      break;
    case "handlebars":
      const handlebars = require("express-handlebars");
      app.engine("handlebars", handlebars());
      app.set("view engine", "handlebars");
      app.set("views", path.join(__dirname, "../templates/handlebars"));
      break;
    default:
      throw new Error("Motor de șabloane invalid!");
  }
};

export default templateConfiguration;
