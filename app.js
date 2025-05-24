import dotenv from "dotenv";
dotenv.config();
import path, { join } from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser;
import helmet from "helmet";
import compression from "compression";
import ErrorMiddleware from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "https://www.instagram.com"],
        "style-src": [
          "'self'",
          "https://fonts.googleapis.com"
        ],
        "font-src": [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        "frame-src": [
          "'self'",
          "https://www.google.com",
          "https://maps.google.com",
          "https://www.instagram.com"
        ],
        "connect-src": [
          "'self'",
          "https://opensheet.elk.sh"
        ]
      },
    },
  })
);

app.use(compression());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "public")));
app.use("/image", express.static(join(__dirname, "data", "image")));
app.use("/video", express.static(join(__dirname, "data", "video")));

import defaultRoutes from "./routes/default.js";

app.use(defaultRoutes);

app.use((req, res, next) => {
  const error = new Error("Stranica nije pronađena.");
  error.statusCode = 404;
  next(error);
});

app.use(ErrorMiddleware);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});