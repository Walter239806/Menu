import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

const NODE_PORT = 3000;
app.listen(NODE_PORT, () => {
  console.log(`Escuchando puerto ${NODE_PORT}`);
});

