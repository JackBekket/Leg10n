//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


// in-direct imports

import "./Leg10n.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// direct imports
//import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {


event LegionCreated(address indexed creator, address collection);

// from creator to address
mapping (address => address) public Collections ;

address payable public treasure_fund;
address public dictionary;

constructor(address dictionary_) {
    treasure_fund = payable(msg.sender);
    dictionary = dictionary_;
}



    /**
     *  @dev deploy new instance of Legion contract
     */
    function DeployLegion(address admin_, int64 tgid_,string memory public_key_) public returns (address) {
        address legion = address(new Leg10n(dictionary,admin_,tgid_,public_key_));
        //Leg10n L = Leg10n(legion);
        
        emit LegionCreated(msg.sender,legion);
        return legion;
    }



    
    // TODO - change to interface
    /**
     * @dev allow owner of factory to accept joins within child Legion contracts. Typically there is a probable sitation where
     * original deployer or admin of organisation has been compromised and his profile no longer exists. In such scenario recruiting mechanism
     * could be broken, so there is a fix for this specific scenario. 
     * @param legion_ address of organisation contract
     * @param user_to_join user who need to be accepted.
     */
    /*
    function _dev_acceptJoin(address legion_, int64 user_to_join, string memory parent_name) public onlyOwner  {
        Leg10n L = Leg10n(legion_);
        L.AcceptJoin(user_to_join,parent_name);

    }
    */

}