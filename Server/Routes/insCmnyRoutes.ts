import express, { Request, Response } from 'express';
import insCmnyController from '../Controllers/insCmnyController';
const router = express.Router();

router.post('/createInsCmny', (req: Request, res: Response) => { insCmnyController.createInsCmny(req, res) });
router.get('/getById/:id', (req: Request, res: Response) => { insCmnyController.getInsCmnyById(req, res) });
router.put('/updateInsTrans', (req: Request, res: Response) => { insCmnyController.updateInsTrans(req, res) });


export default router;
