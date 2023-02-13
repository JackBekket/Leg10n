//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";  
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Dictionary.sol";


//import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";    
//import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";

contract Leg10n is Ownable, AccessControl {
   
   
   uint private _passportFee; 
   address private _owner; 
   bytes32 public constant moderator = keccak256("moderator");
   address private murs = 0x383A9e83E36796106EaC11E8c2Fbe8b92Ff46D3a;   // TODO: consider remove
   
   address private bot = 0x0E5279edeD9Fe8281eB0f7277e51068c6DA2fa31; // TODO: consider remove

   struct User {
      address userAddress;
      int64 tgId;      // unic Id for telegram (number)
      bool valid;
      address validatorAddress;
      string codeName;
   }

 
   //mappings
   mapping(int64 => address) public tgIdToAddress;
  // mapping(address => Passport) public passports;
   mapping(address => User) public users;
   mapping(string => address) public codename_wallets;  // codenames protected by dictionary

   mapping(address => address[]) public ref_tree;  // from user to users
   


   mapping (address => mapping (address => bool)) public chain;

 
   // EVENTS
   
   event requestDenied(int64 applyerTg, address wallet);

   event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address);
   event joinRequestedIndexedTG(int64 applyerTg, address wallet_address, address indexed parent_address);
   event requestAccepted(int64 indexed applyerTg, address user_address, address parent_address);

   // Roles Engine
   Dictionary Enigma;


   constructor(address enigma_) Ownable() {
      _passportFee = 2000000000000000 wei; 
      _owner = owner();
        _grantRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _grantRole(moderator,msg.sender);
        _grantRole(moderator,bot);
        _grantRole(moderator,murs);
      Enigma = Dictionary(enigma_);
      // test data
      tgIdToAddress[1234] = msg.sender;
      codename_wallets["Adam"] = msg.sender;
   }


   function _updateAddress(int64 tgId, address userAddress, string memory code_name_,string memory parent_name) internal {
      require(tgIdToAddress[tgId] == address(0x0), "There's address connected to that TG ID already.");  // if cell is not empty revert
      bool flag = Enigma.checkDictionaryTree(code_name_,parent_name);
      require(flag == true);
      tgIdToAddress[tgId] = userAddress;
      codename_wallets[code_name_] = userAddress;
   }


   function RequestJoin(int64 applyerTg, string memory code_name_, string memory parent_name) public payable {
      address applyerAddress = msg.sender;      // ЛИЧНАЯ ПОДАЧА ПАСПОРТА В ТРЕТЬЕ ОКОШКО МФЦ
      _updateAddress(applyerTg,applyerAddress,code_name_,parent_name);  
      require (msg.value == _passportFee, "Request fee is not paid");

      address parent_address = codename_wallets[parent_name];
      users[msg.sender] = User(applyerAddress, applyerTg, false, parent_address,code_name_);
      (bool feePaid,) = bot.call{value: _passportFee}("");
      require(feePaid, "Unable to transfer fee");

      emit joinRequested(applyerTg, msg.sender, parent_address);
      emit joinRequestedIndexedTG(applyerTg, msg.sender, parent_address);

      chain[parent_address][msg.sender] = false;
   }

   function AcceptJoin(int64 applyerTg, string memory parent_name) public {
      address parent_address = codename_wallets[parent_name];
      require(parent_address == msg.sender, "only parent_name can accept it");
      address user_address = GetUserWalletByID(applyerTg);
      bool isNotRegistred = chain[parent_address][user_address];
      require(isNotRegistred == false, "already registred");
      address[] storage referals = ref_tree[parent_address];
      referals.push(user_address);
      users[user_address].valid = true;
      users[user_address].validatorAddress = msg.sender;
      chain[parent_address][user_address] = true;

    //  _updateAddress(applyerTg,user_address,code_name_);

   }



   /**
   *     @notice This function decline application end erase junk data
   *    
   */
   function DeclineRequest (int64 tgid) public  {
      address user_address = GetUserWalletByID(tgid);
     // int64 _tgId = users[passportToDecline].tgId;
      string memory user_name_ = users[user_address].codeName;
      require(users[user_address].valid == false, "already approved OR do not exists yet"); // it also means that record exists
      delete users[user_address];
      delete tgIdToAddress[tgid];
      delete codename_wallets[user_name_];
      emit requestDenied(tgid,user_address);
   }

   /**
    *  @dev This function is a service function which allow Owner to erase already approved passport
    *  and make clean state contract. NOT FOR USE IN PRODUCTION
    */
    function DeleteUser (address passportToDecline) public onlyRole(moderator) {
      int64 _tgId = users[passportToDecline].tgId;
      string memory user_name_ = users[passportToDecline].codeName;
      uint chainID = block.chainid;
      require(chainID == uint(5), "this function work's only for testnet");  
     // require(passports[passportToDecline].valid == false, "already approved OR do not exists yet"); // it also means that record exists
      delete users[passportToDecline];
      delete tgIdToAddress[_tgId];
      delete codename_wallets[user_name_];
      emit requestDenied(_tgId,passportToDecline);
   }  


    
    /**
     *  @dev setting fee for applying for passport
     */
    function SetPassportFee(uint passportFee_) public onlyOwner {
        _passportFee = passportFee_;
    }

    function SetBotAddress(address bot_) public onlyOwner {
      bot = bot_;
    }

    /**
     *  @dev getter to obtain how much user will pay for apply
     */
    function GetPassportFee() public view returns (uint) {
        return _passportFee;
    }


   function GetUserWalletByID(int64 tgId_) public view returns(address){
      return tgIdToAddress[tgId_];
   }

   function GetTgIdByAddress(address user_wallet) public view returns(int64 tgid) {
      User memory u = GetUserByAddress(user_wallet);
      tgid = u.tgId;
      return tgid;
   }

   function GetUserByAddress(address user_wallet) public view returns(User memory) {
      User memory u = users[user_wallet];
      return u;
   }

   //function GetUserByAddress(address user_wallet) public view returns

   function GetWalletByNickName(string memory user_name_) public view returns (address) {
      return codename_wallets[user_name_];
   }

   function GetUserByNickName(string memory user_name_) public view returns (User memory) {
      address wallet_ = GetWalletByNickName(user_name_);
      User memory u = users[wallet_];
      return u;
   }

   function GetUserByTgId(int64 tgId_) public view returns (User memory) {
      address wallet = GetUserWalletByID(tgId_);
      User memory u = users[wallet];
      return u;
   }

   function GetOwner() public view returns(address) {
      return _owner;
   }

   function getModeratorIdentifier() public pure returns (bytes32) {
       return moderator;
  }

}