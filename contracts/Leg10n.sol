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
   
   event Initialized(address indexed admin);
   event requestDenied(int64 applyerTg, address wallet);

   event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address);
   event joinRequestedIndexedTG(int64 applyerTg, address wallet_address, address indexed parent_address);
   event requestAccepted(int64 indexed applyerTg, address user_address, address parent_address);
   event relationChanged(address high_node, address indexed low_node, bool pravda); // we can search by user_address (low_node address) to lookup user relationship

   // Roles Engine
   Dictionary Turing;


   constructor(address turing_,address admin_,int64 tgid_, string memory public_key_) Ownable() {
      _passportFee = 2000000000000000 wei; 
      _owner = owner();
        _grantRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _grantRole(moderator,msg.sender);
      Turing = Dictionary(turing_);
      // Factory init
      tgIdToAddress[tgid_] = msg.sender;
      codename_wallets["0"] = msg.sender;
      users[msg.sender] = User(msg.sender, tgid_, true, msg.sender,"0","zjXCj9iuse3gHGaAIIgyaiCOsJpQWSCEBBac/zPGrgQ=");
      // determine if contract deployed standalone or through factory contract
      if (admin_ == address(0x0) || tgid_ == 0) {
         // standalone deploy, deployer is admin
         _devInitAdmin(msg.sender,1234,"zjXCj9iuse3gHGaAIIgyaiCOsJpQWSCEBBac/zPGrgQ=");
      } else {
         // factory deploy, factory inputs admin credentials
         _devInitAdmin(admin_,tgid_,public_key_);
      }
      
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
      (bool feePaid,) = _owner.call{value: _passportFee}("");
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
    function devDeleteUser (address user_address) public onlyRole(moderator) {
      int64 _tgId = users[user_address].tgId;
      string memory user_name_ = users[user_address].codeName;
      uint chainID = block.chainid;
      require(chainID == uint(5), "this function work's only for testnet");  
      delete users[user_address];
      delete tgIdToAddress[_tgId];
      delete codename_wallets[user_name_];
      //delete chain[msg.sender][child_address];
      emit requestDenied(_tgId,user_address);
   }  

   
   function _devInitAdmin(address admin_, int64 tgid_, string memory public_key_) internal  {
      tgIdToAddress[tgid_] = admin_;
      codename_wallets["Adam"] = admin_;
      users[admin_] = User(admin_, tgid_, true, admin_,"Adam",public_key_);
      users[admin_].valid = true;
      users[admin_].validatorAddress = msg.sender;
      address zero = GetWalletByNickName("0");
      chain[zero][admin_] = true;
      emit Initialized(admin_);
   }


   /**
    *  @dev This function is a service function which allow delete profile of user. It does not clear command chain, so it's required to call ClearParent first
    */
    function DeleteUser (address user_address) internal {
      int64 _tgId = users[user_address].tgId;
      string memory user_name_ = users[user_address].codeName;
      delete users[user_address];
      delete tgIdToAddress[_tgId];
      delete codename_wallets[user_name_];
      //delete chain[msg.sender][child_address];
      emit requestDenied(_tgId,user_address);
   }  


   /**
    *  @dev delete yourself profile
    */
   function deleteYourSelf() public {
      bool attached = users[msg.sender].valid; 
      require(attached == false, "call ClearParent first");
      DeleteUser(msg.sender);
   }


   /**
    *  @dev allow users to clear their parenthesis
    *  @param parent_name name of high node
    *  @param child_name username
    */
   function ClearParent(string memory parent_name, string memory child_name)  public  {
      address user_address = GetWalletByNickName(child_name);
      address parent_address = GetWalletByNickName(parent_name);
      require(user_address == msg.sender, "users allowed only to clear themselfs");
      users[user_address].valid = false;
      chain[parent_address][msg.sender] = false;
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