import { basicEntityInterface } from '../Interfaces/basicEntityInterface';
import {prettyJSONString } from '../../fabric-samples/test-application/javascript/AppUtil';
import { InsTransInterface } from '../Interfaces/insTransInterface';
import auth from '../Authentication/auth';


let insCmnyService = {
    
    createInsCmnyService: async (input: basicEntityInterface) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser2","Org2MSP");
            const insuranceCompany = {
                id: input.id,
                name: input.name,
                email: input.email,
                userType: 'insuranceCmny'
            };
            console.log('\n--> Submit Transaction: addInsuranceCompany :');
            let res = await contract.submitTransaction('addInsuranceCompany',input.id, JSON.stringify(insuranceCompany));
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString());
        }
        catch (error) {
            console.log("Error in insCmnyService.createInsCmnyService");
            throw error;
        }

    },

    getInsCmnyByIdService: async (input: string) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser2","Org2MSP");
            console.log('\n--> Submit Transaction: getInsuranceCompanyDetailsById :');
            let res = await contract.submitTransaction('getInsuranceCompanyDetailsById', input);
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString());
        }
        catch (error) {
            console.log("Error in insCmnyService.getInsCmnyByIdService");
            throw error;
        }
    },

    updateInsuranceTransService: async (input: InsTransInterface) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser2","Org2MSP");
            console.log('\n--> Submit Transaction: updateInsuranceTransactionByInsCmny :');
            let res = await contract.submitTransaction('updateInsuranceTransactionByInsCmny', input.id,input.inscompId);
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString());
        }
        catch (error) {
            console.log("Error in insCmnyService.updateInsuranceTransService");
            throw error;
        }
    }

}

export default insCmnyService