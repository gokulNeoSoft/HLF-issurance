./network.sh up -ca -s couchdb 
./network.sh createChannel
./network.sh deployCC -ccn basic -ccp ./chaincode/chaincode-javascript -ccl javascript

