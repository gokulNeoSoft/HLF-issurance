
import { Gateway, GatewayOptions, Wallets } from 'fabric-network';
const FabricCAServices = require('fabric-ca-client');
import * as path from 'path';
import { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildWallet } from '../../fabric-samples/test-application/javascript/AppUtil';
import { buildCAClient, enrollAdmin, registerAndEnrollUser } from '../../fabric-samples/test-application/javascript/CAUtil';

const channelName = 'mychannel';
const chaincodeName = 'basic';
let orgVar = {
    Org1MSP: {
        buildCCP: buildCCPOrg1,
        caName: "ca.org1.example.com",
        department: "org1.department1",
        walletPath:path.join(__dirname, 'walletOrg1')
    },
    Org2MSP: {
        buildCCP: buildCCPOrg2,
        caName: "ca.org2.example.com",
        department: "org2.department1",
        walletPath:path.join(__dirname, 'walletOrg2')
    },
    Org3MSP: {
        buildCCP: buildCCPOrg3,
        caName: "ca.org3.example.com",
        department: "org3.department1",
        walletPath:path.join(__dirname, 'walletOrg3')
    }
}

let auth = {
    getOrCreateUserCred: async (userId: string, OrgMsp: string) => {
        try {
            console.log("In auth.getOrCreateUserCred");
            const caClient = await buildCAClient(FabricCAServices, orgVar[OrgMsp].buildCCP(), orgVar[OrgMsp].caName);
            const wallet = await buildWallet(Wallets, orgVar[OrgMsp].walletPath);
            await enrollAdmin(caClient, wallet, OrgMsp);
            await registerAndEnrollUser(caClient, wallet, OrgMsp, userId, orgVar[OrgMsp].department);
            return wallet;
        } catch (error) {
            console.log("Error in getOrCreateUserCred", error);
            throw new Error(error)
        }
    },

    getSmartContractInstance: async (userId: string, OrgMsp: string) => {
        try {
            console.log("In auth.getOrCreateUserCred");
            await auth.getOrCreateUserCred(userId, OrgMsp)
            const wallet = await buildWallet(Wallets, orgVar[OrgMsp].walletPath);
            const gateway = new Gateway();
            const gatewayOpts: GatewayOptions = {
                wallet,
                identity: userId,
                discovery: { enabled: true, asLocalhost: true },
            };
            await gateway.connect(orgVar[OrgMsp].buildCCP(), gatewayOpts);
            const network = await gateway.getNetwork(channelName);
            const contract = network.getContract(chaincodeName);
            return contract;
        } catch (error) {
            console.log("Error in getSmartContractInstance", error);
            throw new Error(error)
        }
    }
}
export default auth