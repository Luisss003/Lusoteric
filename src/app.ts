import express from 'express';
import challengesRouter from './routes/challengesRoutes.js';
import codeRouter from './routes/codeRoutes.js';
let app = express();

app.use(express.json());

//Routes
app.use('/challenges', challengesRouter);
app.use('/code', codeRouter);

// Error handling middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({ message: 'Not Found' });
});


export default app;
