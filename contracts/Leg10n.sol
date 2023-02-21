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
      string public_key;
   }

 
   //mappings
   mapping(int64 => address) private tgIdToAddress;
   mapping(address => User) public users;
   mapping(string => address) public codename_wallets;  // codenames protected by dictionary
   mapping (address => mapping (address => bool)) public chain; // from parent to child to flag

 
   // EVENTS
   
   event requestDenied(int64 applyerTg, address wallet);

   event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address);
   event joinRequestedIndexedTG(int64 applyerTg, address wallet_address, address indexed parent_address);
   event requestAccepted(int64 indexed applyerTg, address user_address, address parent_address);
   event relationChanged(address high_node, address indexed low_node, bool pravda); // we can search by user_address (low_node address) to lookup user relationship

   // Roles Engine
   Dictionary Turing;


   constructor(address turing_) Ownable() {
      _passportFee = 2000000000000000 wei; 
      _owner = owner();
        _grantRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _grantRole(moderator,msg.sender);
        _grantRole(moderator,bot);
        _grantRole(moderator,murs);
      Turing = Dictionary(turing_);
      // test data
      tgIdToAddress[1234] = msg.sender;
      codename_wallets["Adam"] = msg.sender;
      users[msg.sender] = User(0x16d97A46030C5D3D705bca45439e48529997D8b2, 1234, true, 0x16d97A46030C5D3D705bca45439e48529997D8b2,"Adam","zjXCj9iuse3gHGaAIIgyaiCOsJpQWSCEBBac/zPGrgQ=");
      //TODO: add publicKey in constructor
   }


   function _updateAddress(int64 tgId, address userAddress, string memory code_name_,string memory parent_name) internal {
      require(tgIdToAddress[tgId] == address(0x0), "There's address connected to that TG ID already.");  // if cell is not empty revert
      bool flag = Turing.checkDictionaryTree(code_name_,parent_name);
      require(flag == true);
      tgIdToAddress[tgId] = userAddress;
      codename_wallets[code_name_] = userAddress;
   }


   /**
    *  @dev This function is main entrance point, it is create join Request. User shoul know codename of superior inviter.
    * @param applyerTg tgid of user who wants to join
    * @param code_name_  code_name selected by user
    * @param parent_name  code_name of parent_node
    */
   function RequestJoin(int64 applyerTg, string memory code_name_, string memory parent_name, string memory public_key) public payable {
      address applyerAddress = msg.sender;      // ЛИЧНАЯ ПОДАЧА ПАСПОРТА В ТРЕТЬЕ ОКОШКО МФЦ
       
      require (msg.value == _passportFee, "Request fee is not paid");

      

      address parent_address = codename_wallets[parent_name];
      users[msg.sender] = User(applyerAddress, applyerTg, false, parent_address,code_name_,public_key);
      // TODO: add codename_wallets[username] = msg.sender;
      (bool feePaid,) = bot.call{value: _passportFee}("");
      require(feePaid, "Unable to transfer fee");

      emit joinRequested(applyerTg, msg.sender, parent_address);
      emit joinRequestedIndexedTG(applyerTg, msg.sender, parent_address);


      chain[parent_address][msg.sender] = false;
      _updateAddress(applyerTg,applyerAddress,code_name_,parent_name); 
   }

   /**
    *  @dev Accept user intent to join
    * @param applyerTg tgid of user who want to join
    * @param parent_name code_name of parent_node
    */
   function AcceptJoin(int64 applyerTg, string memory parent_name) public {
      address parent_address = codename_wallets[parent_name];
      require(parent_address == msg.sender, "only parent_name can accept it");
      address user_address = GetUserWalletByID(applyerTg);
      bool isRegistred = chain[parent_address][user_address];
      require(isRegistred == false, "already registred");
      users[user_address].valid = true;
      users[user_address].validatorAddress = msg.sender;
      chain[parent_address][user_address] = true;
      emit relationChanged(parent_address,user_address,true);

    //  _updateAddress(applyerTg,user_address,code_name_);
   }



   /**
   *     @notice This function decline application end erase junk data
   *    
   */
   function DeclineRequest (int64 tgid) public  {
      address child_address = GetUserWalletByID(tgid);
      //int64 parent_id = GetTgIdByAddress(msg.sender);
      //string memory parent_name = users[msg.sender].codeName;
      string memory user_name_ = users[child_address].codeName;
      require(users[child_address].valid == false, "already approved OR do not exists yet"); // it also means that record exists
      bool linked = chain[msg.sender][child_address];
      require(linked == false, "already linked OR dont exists");
      delete users[child_address];
      delete tgIdToAddress[tgid];
      delete codename_wallets[user_name_];
      delete chain[msg.sender][child_address];
      emit requestDenied(tgid,child_address);
   }

   /**
    *  @dev This function is a service function which allow Owner to erase already approved passport
    *  and make clean state contract. NOT FOR USE IN PRODUCTION
    *  it does not clear chain of command
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
      //delete chain[msg.sender][child_address];
      emit requestDenied(_tgId,passportToDecline);
   }  

   /**
    * 
    * 
    */
   function ClearParent()  public  {
      
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

   function GetPublicKeyByAddress(address user_address) public view returns (string memory) {
      User memory u = GetUserByAddress(user_address);
      string memory pk = u.public_key;
      return pk;
   }

   function GetOwner() public view returns(address) {
      return _owner;
   }

   function getModeratorIdentifier() public pure returns (bytes32) {
       return moderator;
  }

}