
import { Request, Response } from 'express';
import { basicEntityInterface } from '../Interfaces/basicEntityInterface';
import { InsTransInterface } from '../Interfaces/insTransInterface';
import insCmnyService from '../Services/insCmnyService';



let insCmnyController = {
    createInsCmny: async (req: Request, res: Response) => {
        try {
            let input: basicEntityInterface = req.body;
            let result = await insCmnyService.createInsCmnyService(input)
            res.status(201).send(result)
        } catch (error) {
            console.log("Error in insCmnyController.createInsCmny", error);
            res.status(400).send(error);
        }
    },

    getInsCmnyById: async (req: Request, res: Response) => {
        try {
            let input: string = req.params.id;
            let result = await insCmnyService.getInsCmnyByIdService(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in insCmnyController.getInsCmnyById", error);
            res.status(400).send(error);
        }
    },

    updateInsTrans: async (req: Request, res: Response) => {
        try {
            let input: InsTransInterface = req.body;
            let result = await insCmnyService.updateInsuranceTransService(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in insCmnyController.updateInsTrans", error);
            res.status(400).send(error);
        }
    },
}

export default insCmnyController;