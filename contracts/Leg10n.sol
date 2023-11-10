//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/access/Ownable.sol";  

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
//import "hardhat/console.sol";

contract Leg10n is Ownable {
    uint private _passportFee;
    address private _owner;

    struct User {
        address userAddress;
        string codeName;
        string public_key;
        string email;
    }

    //mappings
  
    mapping(address => User) private users;
    mapping(string => address) public codename_wallets; 
    mapping(string => address) public emailToAddress; 

    // EVENTS
    event join(
        string email,
        address wallet_address
    );
    event joinIndexed(
        string email,
        address wallet_address
    );
 
    constructor(
        address admin,
        string memory initCodename,
        string memory email,
        string memory public_key_
    ) Ownable() {
        _passportFee = 2000000000000000 wei;
        _owner = owner();
     
        // Factory init
        emailToAddress[email] = msg.sender;
        codename_wallets["0"] = msg.sender;
        users[msg.sender] = User(
            admin,
            initCodename,
            public_key_,
            email
        );
    }



    function _updateAddress(
        string memory email,
        address userAddress,
        string memory code_name_
    ) internal {

        require(
            emailToAddress[email] == address(0x0),
            "There is address connected to that email already"
        ); // if cell is not empty revert
     
        require(
            codename_wallets[code_name_] == address(0x0),
            "codename taken"
        );
        emailToAddress[email] = userAddress;
       // require(codename_wallets[code_name_] == address(0x0), "codename is already taken");
        codename_wallets[code_name_] = userAddress;
    }

    /**
     *  @dev This function is main entrance point, it is create join Request. User shoul know codename of superior inviter.
     * @param code_name_  code_name selected by user
     */
    function RequestJoin(
        string memory email,
        string memory code_name_,
        string memory public_key
    ) public payable {
        address applyerAddress = msg.sender; // ЛИЧНАЯ ПОДАЧА ПАСПОРТА В ТРЕТЬЕ ОКОШКО МФЦ

        require(msg.value == _passportFee, "Request fee is not paid");
        users[msg.sender] = User(
            applyerAddress,
        code_name_,
        public_key,
        email
        );
        // TODO: add codename_wallets[username] = msg.sender;
        (bool feePaid, ) = _owner.call{value: _passportFee}("");
        require(feePaid, "Unable to transfer fee");
        _updateAddress(email, applyerAddress, code_name_);

        emit join(email, msg.sender);
        emit joinIndexed(email, msg.sender);

    }

    function deleteUser(address user_address) public {
        string memory _email = users[user_address].email;
        string memory user_name_ = users[user_address].codeName     ;
        require(user_address == msg.sender, "Users may delete only themselves");
        delete users[user_address];
        delete emailToAddress[_email];
        delete codename_wallets[user_name_];
    }

    /**
     *  @dev setting fee for applying for passport
     */
    function SetPassportFee(uint passportFee_) public onlyOwner {
        _passportFee = passportFee_;
    }

    /**
     *  @dev getter to obtain how much user will pay for apply
     */
    function GetPassportFee() public view returns (uint) {
        return _passportFee;
    }

    function GetUserWalletByEmail(string memory email) public view returns (address) {
        return emailToAddress[email];
    }

    function GetEmailByAddress(
        address user_wallet
    ) public view returns (string memory email) {
        User memory u = GetUserByAddress(user_wallet);
        email = u.email;
        return email;
    }

    function GetUserByAddress(
        address user_wallet
    ) public view returns (User memory) {
        User memory u = users[user_wallet];
        return u;
    }

    //function GetUserByAddress(address user_wallet) public view returns

    function GetWalletByNickName(
        string memory user_name_
    ) public view returns (address) {
        return codename_wallets[user_name_];
    }

    function GetUserByNickName(
        string memory user_name_
    ) public view returns (User memory) {
        address wallet_ = GetWalletByNickName(user_name_);
        User memory u = users[wallet_];
        return u;
    }

    function GetUserByEmail(string memory email) public view returns (User memory) {
        address wallet = GetUserWalletByEmail(email);
        User memory u = users[wallet];
        return u;
    }



    function GetPublicKeyByAddress(
        address user_address
    ) public view returns (string memory) {
        User memory u = GetUserByAddress(user_address);
        string memory pk = u.public_key;
        return pk;
    }


    function GetPublicKeyByEmail(
        string memory email
    ) public view returns (string memory) {
        User memory u = GetUserByEmail(email);
        string memory pk = u.public_key;
        return pk;
    }

    function GetOwner() public view returns (address) {
        return _owner;
    }

//Not sure yet
   /**
    * 
    * @dev get keccak256 hash from string
    */
   function GetKeccakHash(string memory text) public pure returns (bytes32) {
        return keccak256(abi.encode(text));
    }
}
