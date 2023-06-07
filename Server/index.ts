import express, { Request, Response } from 'express';
import custRoutes from './Routes/custRoutes';
import insCmnyRoutes from './Routes/insCmnyRoutes'
import docAuthCmnyRoutes from './Routes/docAuthCmnyRoutes'

// Create Express app
const app = express();
const port = 3000;

// Use JSON body parser middleware
app.use(express.json());

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Mount user routes
app.use('/customer', custRoutes);
app.use('/insuranceCompany', insCmnyRoutes);
app.use('/documentAuthCompany',docAuthCmnyRoutes)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
