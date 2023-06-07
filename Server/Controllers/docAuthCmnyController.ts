
import { Request, Response } from 'express';
import { basicEntityInterface } from '../Interfaces/basicEntityInterface';
import { InsTransInterface } from '../Interfaces/insTransInterface';
import docAuthCmnySerice from '../Services/docAuthCmnyService';



let docAuthCmnyController = {
    createDocAuthCmny: async (req: Request, res: Response) => {
        try {
            let input: basicEntityInterface = req.body;
            let result = await docAuthCmnySerice.createDocAuthCmnyService(input)
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in docAuthCmnyController.createDocAuthCmny", error);
            res.status(400).send(error);
        }
    },

    updateInsTrans: async (req: Request, res: Response) => {
        try {
            let input: InsTransInterface = req.body;
            let result = await docAuthCmnySerice.updateInsuranceTransactionByDocCmnySerice(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in docAuthCmnyController.updateCustomer", error);
            res.status(400).send(error);
        }
    },
}

export default docAuthCmnyController;