import express from 'express';
import challengesRouter from './routes/challengesRoutes.js';
import codeRouter from './routes/codeRoutes.js';
import authRouter from './routes/authRoutes.js';
import execRouter from './routes/execRoutes.js'
import passport from 'passport';
import testcaseRouter from './routes/testcaseRoutes.js';

import { passportConfig } from './utils/passport.js';


let app = express();

//Configure passport obj and then initialize so it can be used in every req
passportConfig(passport);
app.use(passport.initialize());

app.use(express.json());

//Routes
app.use('/challenges', challengesRouter);
app.use('/code', codeRouter);
app.use('/auth', authRouter);
app.use('/execute', execRouter);
app.use('/testcase', testcaseRouter);

// Error handling middleware
app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({ message: 'Not Found' });
});


export default app;
