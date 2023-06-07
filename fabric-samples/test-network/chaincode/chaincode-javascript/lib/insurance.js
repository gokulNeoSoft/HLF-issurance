'use strict';

const { Contract } = require('fabric-contract-api');

class InsuranceChaincode extends Contract {
    async addCustomer(ctx, id, value) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID != "Org1MSP") throw new Error("Only customer org can add customer details!")
        try {
            await ctx.stub.putState(id, Buffer.from(JSON.stringify(value)));
            console.log('Customer details added successfully:', value);
        } catch (error) {
            console.error('Error adding customer details:', error);
            throw new Error('Failed to add customer details');
        }
    }

    async addInsuranceCompany(ctx, id, value) {

        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID != "Org2MSP") throw new Error("Only insurance cmny  org can add cmny details!")
        try {
            await ctx.stub.putState(id, Buffer.from(value));
            console.log('Insurance company details added successfully:', value);
        } catch (error) {
            console.error('Error adding insurance company details:', error);
            throw new Error('Failed to add insurance company details');
        }
    }

    async addAuthorityCompany(ctx, id, value) {

        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID != "Org3MSP") throw new Error("Only authority cmny  org can add authority cmny details!")
        try {
            await ctx.stub.putState(id, Buffer.from(JSON.stringify(value)));
            console.log('Authority company details added successfully:', value);
        } catch (error) {
            console.error('Error adding authority company details:', error);
            throw new Error('Failed to add authority company details');
        }
    }

    async getCustomerDetailsById(ctx, customerId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID != "Org1MSP") throw new Error("Only customer org can access customer details!")
        try {
            const customerData = await ctx.stub.getState(customerId);
            const customer = JSON.parse(customerData.toString());
            console.log('Customer details retrieved successfully:', customer);
            return customer;
        } catch (error) {
            console.error('Error retrieving customer details:', error);
            throw new Error('Failed to get customer details');
        }
    }

    async getInsuranceCompanyDetailsById(ctx, companyId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID != "Org2MSP") throw new Error("Only insurance cmny  org can access insurance cmny details!")
        try {
            const insuranceCompanyData = await ctx.stub.getState(companyId);
            const insuranceCompany = JSON.parse(insuranceCompanyData.toString());
            console.log('Insurance company details retrieved successfully:', insuranceCompany);
            return insuranceCompany;
        } catch (error) {
            console.error('Error retrieving insurance company details:', error);
            throw new Error('Failed to get insurance company details');
        }
    }

    async addInsuranceTransaction(ctx, value) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID != "Org1MSP") throw new Error("Only Customer can create ins trans!")
        try {
            value = JSON.parse(value)
            value.status = "created";
            value.docType = "insData"
            await ctx.stub.putState(value.id, Buffer.from(JSON.stringify(value)));
            console.log('Insurance trans added successfully:', value);
            return value
        } catch (error) {
            console.error('Error adding insurance transaction:', error);
            throw new Error('Failed to add insurance transaction');
        }
    }

    async updateInsuranceTransactionByInsCmny(ctx, transactionId, inscompId) {
        const mspID = ctx.clientIdentity.getMSPID();
        try {
            if (mspID != "Org2MSP") throw new Error("Only insurance cmny  org can add cmny details!")
            const transactionData = await ctx.stub.getState(transactionId);
            if (!transactionData) throw new Error("Transaction not found!")
            console.log(transactionData)
            const transaction = JSON.parse(transactionData.toString());
            if (transaction.status != "created") throw new Error("insurance Company cannot update transaction now!")
            // Get the current date
            const currentDate = new Date();
            const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
            nextYear.setHours(0, 0, 0, 0);
            const formattedDate = nextYear.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            transaction.insuranceCreateDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
            transaction.insuranceEndDate = formattedDate;
            transaction.status = "waitingForDoc";
            transaction.inscompId = inscompId;
            transaction.documentList = { "pancard": "", "rc": "" };
            transaction.vehicleType = "nil"
            transaction.documentVerified = false;
            await ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
            console.log('Insurance object updated successfully:', transaction);
            return transaction
        } catch (error) {
            console.error('Error updating insurance object:', error);
            throw new Error('Failed to update insurance object');
        }
    }

    async updateDocsIntransactionByCust(ctx, transactionId, panNumber, rcNumber, vehicleType) {
        const mspID = ctx.clientIdentity.getMSPID();
        try {
            if (mspID != "Org1MSP") throw new Error("Only Customer can upload Docs!")
            const transactionData = await ctx.stub.getState(transactionId);
            if (!transactionData) throw new Error("Transaction not found!")
            console.log(transactionData)
            const transaction = JSON.parse(transactionData.toString());
            if (transaction.status != "waitingForDoc") throw new Error("insurance Company need to update transaction!")
            transaction.documentList = {
                pancard: panNumber,
                rc: rcNumber
            }
            transaction.vehicleType = vehicleType
            transaction.status = "DocUpdated";
            await ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
            console.log('Insurance object updated successfully:', transaction);
            return transaction
        } catch (error) {
            console.error('Error updating insurance object:', error);
            throw new Error('Failed to update insurance object');
        }
    }

    async updateInsuranceTransactionByDocCmny(ctx, transactionId) {
        const mspID = ctx.clientIdentity.getMSPID();
        try {
            if (mspID != "Org3MSP") throw new Error("Only doc cmny  org can access doc details!")
            const transactionData = await ctx.stub.getState(transactionId);
            if (!transactionData) throw new Error("Transaction not found!")
            const transaction = JSON.parse(transactionData.toString());
            if (transaction.status != "DocUpdated") throw new Error("insurance Company need to update transaction!")
            if (transaction.documentList.pancard == "" || transaction.documentList.rc == "") throw new Error("user need to update doc details in transaction!")
            transaction.status = "documentApproved";
            transaction.documentVerified = true;
            await ctx.stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)));
            console.log('Insurance object updated successfully:', transaction);
            return transaction
        } catch (error) {
            console.error('Error updating insurance object:', error);
            throw new Error('Failed to update insurance object');
        }
    }
}

module.exports = InsuranceChaincode;
