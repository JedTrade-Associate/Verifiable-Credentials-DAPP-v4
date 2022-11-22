pragma solidity ^0.5.12;

contract DocumentStoreMapping {
        
    mapping(address => mapping(bytes32 => address)) public mappings;
    
    function setMapping(address signer, bytes32 document, address docStore) public {
        
        mappings[signer][document] = docStore;
        
    }
}