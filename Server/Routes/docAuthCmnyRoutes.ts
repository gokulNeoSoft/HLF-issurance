import express, { Request, Response } from 'express';
import docAuthCmnyController from '../Controllers/docAuthCmnyController';
const router = express.Router();

router.post('/createDocAuthCmny', (req: Request, res: Response) => { docAuthCmnyController.createDocAuthCmny(req, res) });
router.put('/updateInsTrans', (req: Request, res: Response) => { docAuthCmnyController.updateInsTrans(req, res) });


export default router;
