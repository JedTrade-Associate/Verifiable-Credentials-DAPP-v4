pragma solidity ^0.5.12;

import "./DocumentStore.sol";
import "./DocumentStoreMapping.sol";

contract DocumentStoreFactory {

  uint256 public count;
  address public mappingAddress;

  event DocStoreDeployed(DocumentStore newInstance);

  mapping(address => DocumentStore) public assets;
  
  constructor() public {
    mappingAddress = address(new DocumentStoreMapping());
  }
	
  function deployDocStore(string memory name) public returns (DocumentStore) {
    DocumentStore newInstance = new DocumentStore(name, mappingAddress);
    count++;
    assets[msg.sender] = newInstance;
    emit DocStoreDeployed(newInstance);
		newInstance.transferOwnership(msg.sender);
    return newInstance;
  }
}
