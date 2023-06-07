
import express, { Request, Response } from 'express';
import custService from '../Services/custService';
import { basicEntityInterface } from '../Interfaces/basicEntityInterface';
import { InsTransInterface } from '../Interfaces/insTransInterface';



let custController = {
    createCustomer: async (req: Request, res: Response) => {
        try {
            let input: basicEntityInterface = req.body;
            let result = await custService.createUserService(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in custController.createCustomer", error);
            res.status(400).send(error);
        }
    },

    getCustomerById: async (req: Request, res: Response) => {
        try {
            let input: string = req.params.id;
            let result = await custService.getUserByIdService(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in custController.getCustomerById", error);
            res.status(400).send(error);
        }
    },

    createInsTrans: async (req: Request, res: Response) => {
        try {
            let input: InsTransInterface = req.body;
            let result = await custService.createInsuranceTransService(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in custController.createInsTrans", error);
            res.status(400).send(error);
        }
    },

    updateDocsInInsTrans: async (req: Request, res: Response) => {
        try {
            let input: InsTransInterface = req.body;
            let result = await custService.updateInsuranceTransService(input);
            res.status(200).send(result)
        } catch (error) {
            console.log("Error in custController.updateDocsInInsTrans", error);
            res.status(400).send(error);
        }
    },

}

export default custController;