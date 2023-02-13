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
   address private murs = 0x383A9e83E36796106EaC11E8c2Fbe8b92Ff46D3a;
   
   address private bot = 0x0E5279edeD9Fe8281eB0f7277e51068c6DA2fa31;

   struct User {
      address userAddress;
      int64 tgId;      // unic Id for telegram (number)
      bool valid;
      address validatorAddress;
      string userName; // can be changed, do not trust it
      string codeName;
   }

 
   //mappings
   mapping(int64 => address) public tgIdToAddress;
  // mapping(address => Passport) public passports;
   mapping(address => User) public users;
   mapping(string => address) public codename_wallets;  // usernames can be changed, do not trust it, use as utility

   mapping(address => address[]) public ref_tree;  // from user to users
   
   mapping (int64 => mapping(int64 => bool)) public trust_global; // user id => [] user ids => trust
  

 
   // EVENTS
   //
   event passportApplied(int64 applyerTg, address wallet_address);
   event passportAppliedIndexed(int64 indexed applyerTg, address wallet_address);
   event passportApproved(int64 applyerTg, address wallet_address, address issuer);
   event passportDenied(int64 applyerTg, address wallet);

   event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address);
   
   Dictionary Enigma;

   constructor(address enigma_) Ownable() {
      _passportFee = 2000000000000000 wei; 
      _owner = owner();
        _grantRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _grantRole(moderator,msg.sender);
        _grantRole(moderator,bot);
        _grantRole(moderator,murs);
      Enigma = Dictionary(enigma_);
   }


   function _updateAddress(int64 tgId, address userAddress, string memory user_name_) internal {
      require(tgIdToAddress[tgId] == address(0x0), "There's address connected to that TG ID already.");  // if cell is not empty revert
      tgIdToAddress[tgId] = userAddress;
      codename_wallets[user_name_] = userAddress;
   }



   /**
   *   @notice This function for USER who try to obtain some tg_id
   *   @param applyerTg unic id for telegram user, in telegram it's int64 (number)
   *   @param user_name_ is username (like @username)
   **/
   function ApplyForPassport (int64 applyerTg, string memory user_name_) public payable {
      address applyerAddress = msg.sender;      // ЛИЧНАЯ ПОДАЧА ПАСПОРТА В ТРЕТЬЕ ОКОШКО МФЦ
      _updateAddress(applyerTg,applyerAddress,user_name_);  
      require (msg.value == _passportFee, "Passport fee is not paid");

      users[msg.sender] = User(applyerAddress, applyerTg, false, address(0x0),user_name_,user_name_);
      emit passportApplied(applyerTg, msg.sender);
      emit passportAppliedIndexed(applyerTg, msg.sender);
      (bool feePaid,) = bot.call{value: _passportFee}("");
      require(feePaid, "Unable to transfer fee");
   }



   function RequestJoin(int64 applyerTg, string memory code_name_, string memory parent_name) public payable {
      address applyerAddress = msg.sender;      // ЛИЧНАЯ ПОДАЧА ПАСПОРТА В ТРЕТЬЕ ОКОШКО МФЦ
      _updateAddress(applyerTg,applyerAddress,code_name_);  
      require (msg.value == _passportFee, "Request fee is not paid");

      address parent_address = codename_wallets[parent_name];

      users[msg.sender] = User(applyerAddress, applyerTg, false, parent_address,code_name_,code_name_);
      address[] storage referals = ref_tree[parent_address];
      referals.push(msg.sender);
      emit passportApplied(applyerTg, msg.sender);
      emit passportAppliedIndexed(applyerTg, msg.sender);
      emit joinRequested(applyerTg, msg.sender, parent_address);
      (bool feePaid,) = bot.call{value: _passportFee}("");
      require(feePaid, "Unable to transfer fee");
   }

   function AcceptJoin(int64 applyerTg, string memory code_name_, string memory parent_name) public {

   }

   /** 
   *    @notice  This function approving passport (use for bot) which approve that user owns it's tg_id and nicname he want to attach with
   *    @param passportToApprove address of user wallet which attached to him
   */
   function ApprovePassport (address passportToApprove) public onlyRole(moderator) {
        int64 _tgId = users[passportToApprove].tgId;
        string memory user_name_ = users[passportToApprove].userName;
        require(users[passportToApprove].valid == false, "already approved OR do not exists yet");
        trust_global[_tgId][_tgId] == true;
        users[passportToApprove] = User(passportToApprove, _tgId, true, msg.sender, user_name_,user_name_);  
        emit passportApproved(_tgId,passportToApprove,msg.sender);
   }

   /**
   *     @notice This function decline application end erase junk data
   *     @param passportToDecline address of user wallet
   */
   function DeclinePassport (address passportToDecline) public onlyRole(moderator) {
      int64 _tgId = users[passportToDecline].tgId;
      string memory user_name_ = users[passportToDecline].userName;
      require(users[passportToDecline].valid == false, "already approved OR do not exists yet"); // it also means that record exists
      delete users[passportToDecline];
      delete tgIdToAddress[_tgId];
      delete codename_wallets[user_name_];
      emit passportDenied(_tgId,passportToDecline);
   }

   /**
    *  @dev This function is a service function which allow Owner to erase already approved passport
    *  and make clean state contract. NOT FOR USE IN PRODUCTION
    */
    function DeletePassport (address passportToDecline) public onlyOwner {
      int64 _tgId = users[passportToDecline].tgId;
      string memory user_name_ = users[passportToDecline].userName;
      uint chainID = block.chainid;
      require(chainID == uint(5), "this function work's only for testnet");  
     // require(passports[passportToDecline].valid == false, "already approved OR do not exists yet"); // it also means that record exists
      delete users[passportToDecline];
      delete tgIdToAddress[_tgId];
      delete codename_wallets[user_name_];
      emit passportDenied(_tgId,passportToDecline);
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