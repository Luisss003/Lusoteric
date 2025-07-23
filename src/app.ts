import express from 'express';
import challengesRouter from './routes/challengesRoutes';

let app = express();

app.use(express.json());

app.use('/api/v1/challenges', challengesRouter);

export default app;
