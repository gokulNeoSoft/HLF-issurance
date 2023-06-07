import { basicEntityInterface } from '../Interfaces/basicEntityInterface';
import { prettyJSONString } from '../../fabric-samples/test-application/javascript/AppUtil';
import { InsTransInterface } from '../Interfaces/insTransInterface';
import auth from '../Authentication/auth';

let docAuthCmnySerice = {
    
    createDocAuthCmnyService: async (input: basicEntityInterface) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser3", "Org3MSP");
            const authorityCompany = {
                id: input.id,
                name: input.name,
                email: input.email,
                userType: 'docauthority'
            };
            console.log('\n--> Submit Transaction: addAuthorityCompany :');
            let res = await contract.submitTransaction('addAuthorityCompany', input.id.toString(), JSON.stringify(authorityCompany));
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString())
        }
        catch (error) {
            console.log("Error in docAuthCmnySerice.createUserService");
            throw error;
        }
    },

    updateInsuranceTransactionByDocCmnySerice: async (input: InsTransInterface) => {
        try {
            const contract = await auth.getSmartContractInstance("appUser3", "Org3MSP");
            console.log('\n--> Submit Transaction: updateInsuranceTransactionByDocCmny :');
            let res = await contract.submitTransaction('updateInsuranceTransactionByDocCmny', input.id);
            console.log(`*** Result: ${prettyJSONString(res.toString())}`);
            return prettyJSONString(res.toString())
        }
        catch (error) {
            console.log("Error in docAuthCmnySerice.createUserService");
            throw error;
        }
    }

}

export default docAuthCmnySerice