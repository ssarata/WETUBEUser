import express from "express";
import registerRoutes from './routes/index.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

registerRoutes(app);

app.listen(port, ()=>{
    console.log(`Server stared on ${port}`);
});

export default app;

