Insurance Network
This project implements a network for insurance transactions involving customers, an insurance company, and a document verification authority. It uses Hyperledger Fabric to create a blockchain network for secure and transparent insurance transactions.

Network Participants
Customer: The customer is an individual who has taken car or bike insurance from the insurance company.
Bajaj Insurance: This is the insurance company that provides insurance services to customers.
AGS Agent: AGS is a third-party verification company responsible for verifying the documents submitted by customers.
Network Setup
The network consists of the following components:

Orderer: 3-node Raft consensus orderer for ordering and validating transactions.
Channel
A channel is created to facilitate the exchange of data related to insurance transactions.

Chaincode
The chaincode is responsible for implementing the smart contract that governs the insurance transactions. The following functionality is provided:

Add customer details: Adds customer information to the network. Each customer is identified by a unique ID and includes attributes such as name, email, user type, and age.
Add insurance company details: Adds insurance company information to the network. Each company is identified by a unique ID and includes attributes such as name, email, and user type.
Add authority company details: Adds authority company information to the network. Each company is identified by a unique ID and includes attributes such as name, email, and user type.
Get customer details by ID: Retrieves customer information based on the provided ID.
Get insurance company details by ID: Retrieves insurance company information based on the provided ID.
Add insurance transaction by customer: Allows a customer to add an insurance transaction to the network. Each transaction is identified by a unique ID and includes attributes such as insurance amount, status, customer ID, etc.
Update insurance object by insurance company: Updates the insurance object with information provided by the insurance company. This includes attributes such as insurance create date, insurance end date, status, customer ID, insurance company ID, document list, and document verification status.
Update document details by customer: Allows the customer to update document details in the insurance object.
Verify document by AGS agent: AGS agent verifies the documents and updates the document verification status and overall status of the insurance object.
Mark insurance as approved by insurance company: Marks the insurance object as finally approved by the insurance company.
API Layer
An API layer is developed using Express.js and TypeScript to expose the functionality of the insurance network through RESTful APIs. The APIs allow interaction with the network, including adding customer details, retrieving customer information, adding insurance transactions, updating document details, verifying documents, and marking insurance as approved.

Prerequisites
Hyperledger Fabric (version 2.3.0)
Node.js (version 14.x.x or higher)
npm (version 6.x.x or higher)



