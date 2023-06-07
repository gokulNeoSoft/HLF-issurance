import express, { Request, Response } from 'express';
import custController from "../Controllers/custController"
const router = express.Router();

router.post('/createUser', (req: Request, res: Response) => { custController.createCustomer(req, res) });
router.get('/getById/:id', (req: Request, res: Response) => { custController.getCustomerById(req, res) });
router.post('/createInsTrans', (req: Request, res: Response) => { custController.createInsTrans(req, res) });
router.put('/updateDocsInInsTrans', (req: Request, res: Response) => { custController.updateDocsInInsTrans(req, res) });


export default router;
