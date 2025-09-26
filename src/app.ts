import express from 'express';
import challengesRouter from './routes/challengesRoutes.js';
import codeRouter from './routes/codeRoutes.js';
import authRouter from './routes/authRoutes.js';
import execRouter from './routes/execRoutes.js'
let app = express();

app.use(express.json());

console.log("WORKING 1")
//Routes
app.use('/challenges', challengesRouter);
app.use('/code', codeRouter);
app.use('/auth', authRouter);
app.use('/execute', execRouter);

// Error handling middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({ message: 'Not Found' });
});


export default app;
