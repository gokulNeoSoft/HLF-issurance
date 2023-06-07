
import { InsTransInterface } from '../Interfaces/insTransInterface';
import auth from '../Authentication/auth';
import { basicEntityInterface } from '../Interfaces/basicEntityInterface';
import { prettyJSONString } from '../../fabric-samples/test-application/javascript/AppUtil';


let custService = {
    
    createUserService: async (input: basicEntityInterface) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser1","Org1MSP");
            console.log('\n--> Submit Transaction: addCustomer : ');
            const customer = {
                id: input.id,
                name: input.name,
                email: input.email,
                userType: 'customer',
                docType:'userData'
            };
            let res = await contract.submitTransaction('addCustomer',input.id,JSON.stringify(customer));
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString());
        }
        catch (error) {
            console.log("Error in custService.createUserService");
            throw error;
        }

    },

    getUserByIdService: async (input: string) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser1","Org1MSP");
            console.log('\n--> Submit Transaction: getCustomerDetailsById:');
            let res = await contract.submitTransaction('getCustomerDetailsById', input);
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString())
        }
        catch (error) {
            console.log("Error in custService.getUserByIdService");
            throw error;
        }
    },

    createInsuranceTransService: async (input: InsTransInterface) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser1","Org1MSP");
            console.log('\n--> Submit Transaction: addInsuranceTransaction:');
            let res = await contract.submitTransaction('addInsuranceTransaction', JSON.stringify(input));
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString());
        }
        catch (error) {
            console.log("Error in custService.createInsuranceTransService");
            throw error;
        }
    },

    updateInsuranceTransService: async (input: InsTransInterface) => {
        try {
            console.log("input",input)
            const contract = await auth.getSmartContractInstance("appUser1","Org1MSP");
            console.log('\n--> Submit Transaction: updateDocsIntransactionByCust :');
            let res = await contract.submitTransaction('updateDocsIntransactionByCust', input.id, input.documentList['pancard'], input.documentList['rc'],input.vehicleType);
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString());
        }
        catch (error) {
            console.log("Error in custService.updateInsuranceTransService");
            throw error;
        }
    }

}

export default custService