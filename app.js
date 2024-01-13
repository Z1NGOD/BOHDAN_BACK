const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const noticeRouter = require("./routes/api/cars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API docs for my pet",
      version: "1.0.0",
      description: "Auto updating docs for the my pet store",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api/cars", noticeRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Server error" } = err;

  if (message.includes("ENOENT")) {
    message = "Server Error";
  }

  if (err.code === 11000) {
    message = "Server Error. Duplicate data";
  }

  res.status(status).json({ message });
});

module.exports = app;
