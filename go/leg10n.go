// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package Leg10n

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// Leg10nUser is an auto generated low-level Go binding around an user-defined struct.
type Leg10nUser struct {
	UserAddress      common.Address
	TgId             int64
	Valid            bool
	ValidatorAddress common.Address
	CodeName         string
	PublicKey        string
}

// Leg10nMetaData contains all meta data concerning the Leg10n contract.
var Leg10nMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"turing_\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"previousAdminRole\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"newAdminRole\",\"type\":\"bytes32\"}],\"name\":\"RoleAdminChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleGranted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleRevoked\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int64\",\"name\":\"applyerTg\",\"type\":\"int64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"wallet_address\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"parent_address\",\"type\":\"address\"}],\"name\":\"joinRequested\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int64\",\"name\":\"applyerTg\",\"type\":\"int64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"wallet_address\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"parent_address\",\"type\":\"address\"}],\"name\":\"joinRequestedIndexedTG\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"high_node\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"low_node\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"pravda\",\"type\":\"bool\"}],\"name\":\"relationChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"int64\",\"name\":\"applyerTg\",\"type\":\"int64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"user_address\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"parent_address\",\"type\":\"address\"}],\"name\":\"requestAccepted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"int64\",\"name\":\"applyerTg\",\"type\":\"int64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"wallet\",\"type\":\"address\"}],\"name\":\"requestDenied\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"int64\",\"name\":\"applyerTg\",\"type\":\"int64\"},{\"internalType\":\"string\",\"name\":\"parent_name\",\"type\":\"string\"}],\"name\":\"AcceptJoin\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"parent_name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"child_name\",\"type\":\"string\"}],\"name\":\"ClearParent\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"DEFAULT_ADMIN_ROLE\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int64\",\"name\":\"tgid\",\"type\":\"int64\"}],\"name\":\"DeclineRequest\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"GetOwner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"GetPassportFee\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user_address\",\"type\":\"address\"}],\"name\":\"GetPublicKeyByAddress\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user_wallet\",\"type\":\"address\"}],\"name\":\"GetTgIdByAddress\",\"outputs\":[{\"internalType\":\"int64\",\"name\":\"tgid\",\"type\":\"int64\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user_wallet\",\"type\":\"address\"}],\"name\":\"GetUserByAddress\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"internalType\":\"int64\",\"name\":\"tgId\",\"type\":\"int64\"},{\"internalType\":\"bool\",\"name\":\"valid\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"validatorAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"codeName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"public_key\",\"type\":\"string\"}],\"internalType\":\"structLeg10n.User\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"user_name_\",\"type\":\"string\"}],\"name\":\"GetUserByNickName\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"internalType\":\"int64\",\"name\":\"tgId\",\"type\":\"int64\"},{\"internalType\":\"bool\",\"name\":\"valid\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"validatorAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"codeName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"public_key\",\"type\":\"string\"}],\"internalType\":\"structLeg10n.User\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int64\",\"name\":\"tgId_\",\"type\":\"int64\"}],\"name\":\"GetUserByTgId\",\"outputs\":[{\"components\":[{\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"internalType\":\"int64\",\"name\":\"tgId\",\"type\":\"int64\"},{\"internalType\":\"bool\",\"name\":\"valid\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"validatorAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"codeName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"public_key\",\"type\":\"string\"}],\"internalType\":\"structLeg10n.User\",\"name\":\"\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int64\",\"name\":\"tgId_\",\"type\":\"int64\"}],\"name\":\"GetUserWalletByID\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"user_name_\",\"type\":\"string\"}],\"name\":\"GetWalletByNickName\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int64\",\"name\":\"applyerTg\",\"type\":\"int64\"},{\"internalType\":\"string\",\"name\":\"code_name_\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"parent_name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"public_key\",\"type\":\"string\"}],\"name\":\"RequestJoin\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"passportFee_\",\"type\":\"uint256\"}],\"name\":\"SetPassportFee\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"chain\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"name\":\"codename_wallets\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"deleteYourSelf\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user_address\",\"type\":\"address\"}],\"name\":\"devDeleteUser\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getModeratorIdentifier\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"}],\"name\":\"getRoleAdmin\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"grantRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"hasRole\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"moderator\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"renounceRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"revokeRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"users\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"internalType\":\"int64\",\"name\":\"tgId\",\"type\":\"int64\"},{\"internalType\":\"bool\",\"name\":\"valid\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"validatorAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"codeName\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"public_key\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// Leg10nABI is the input ABI used to generate the binding from.
// Deprecated: Use Leg10nMetaData.ABI instead.
var Leg10nABI = Leg10nMetaData.ABI

// Leg10n is an auto generated Go binding around an Ethereum contract.
type Leg10n struct {
	Leg10nCaller     // Read-only binding to the contract
	Leg10nTransactor // Write-only binding to the contract
	Leg10nFilterer   // Log filterer for contract events
}

// Leg10nCaller is an auto generated read-only Go binding around an Ethereum contract.
type Leg10nCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// Leg10nTransactor is an auto generated write-only Go binding around an Ethereum contract.
type Leg10nTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// Leg10nFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type Leg10nFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// Leg10nSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type Leg10nSession struct {
	Contract     *Leg10n           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// Leg10nCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type Leg10nCallerSession struct {
	Contract *Leg10nCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// Leg10nTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type Leg10nTransactorSession struct {
	Contract     *Leg10nTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// Leg10nRaw is an auto generated low-level Go binding around an Ethereum contract.
type Leg10nRaw struct {
	Contract *Leg10n // Generic contract binding to access the raw methods on
}

// Leg10nCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type Leg10nCallerRaw struct {
	Contract *Leg10nCaller // Generic read-only contract binding to access the raw methods on
}

// Leg10nTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type Leg10nTransactorRaw struct {
	Contract *Leg10nTransactor // Generic write-only contract binding to access the raw methods on
}

// NewLeg10n creates a new instance of Leg10n, bound to a specific deployed contract.
func NewLeg10n(address common.Address, backend bind.ContractBackend) (*Leg10n, error) {
	contract, err := bindLeg10n(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Leg10n{Leg10nCaller: Leg10nCaller{contract: contract}, Leg10nTransactor: Leg10nTransactor{contract: contract}, Leg10nFilterer: Leg10nFilterer{contract: contract}}, nil
}

// NewLeg10nCaller creates a new read-only instance of Leg10n, bound to a specific deployed contract.
func NewLeg10nCaller(address common.Address, caller bind.ContractCaller) (*Leg10nCaller, error) {
	contract, err := bindLeg10n(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &Leg10nCaller{contract: contract}, nil
}

// NewLeg10nTransactor creates a new write-only instance of Leg10n, bound to a specific deployed contract.
func NewLeg10nTransactor(address common.Address, transactor bind.ContractTransactor) (*Leg10nTransactor, error) {
	contract, err := bindLeg10n(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &Leg10nTransactor{contract: contract}, nil
}

// NewLeg10nFilterer creates a new log filterer instance of Leg10n, bound to a specific deployed contract.
func NewLeg10nFilterer(address common.Address, filterer bind.ContractFilterer) (*Leg10nFilterer, error) {
	contract, err := bindLeg10n(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &Leg10nFilterer{contract: contract}, nil
}

// bindLeg10n binds a generic wrapper to an already deployed contract.
func bindLeg10n(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(Leg10nABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Leg10n *Leg10nRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Leg10n.Contract.Leg10nCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Leg10n *Leg10nRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Leg10n.Contract.Leg10nTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Leg10n *Leg10nRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Leg10n.Contract.Leg10nTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Leg10n *Leg10nCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Leg10n.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Leg10n *Leg10nTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Leg10n.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Leg10n *Leg10nTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Leg10n.Contract.contract.Transact(opts, method, params...)
}

// DEFAULTADMINROLE is a free data retrieval call binding the contract method 0xa217fddf.
//
// Solidity: function DEFAULT_ADMIN_ROLE() view returns(bytes32)
func (_Leg10n *Leg10nCaller) DEFAULTADMINROLE(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "DEFAULT_ADMIN_ROLE")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// DEFAULTADMINROLE is a free data retrieval call binding the contract method 0xa217fddf.
//
// Solidity: function DEFAULT_ADMIN_ROLE() view returns(bytes32)
func (_Leg10n *Leg10nSession) DEFAULTADMINROLE() ([32]byte, error) {
	return _Leg10n.Contract.DEFAULTADMINROLE(&_Leg10n.CallOpts)
}

// DEFAULTADMINROLE is a free data retrieval call binding the contract method 0xa217fddf.
//
// Solidity: function DEFAULT_ADMIN_ROLE() view returns(bytes32)
func (_Leg10n *Leg10nCallerSession) DEFAULTADMINROLE() ([32]byte, error) {
	return _Leg10n.Contract.DEFAULTADMINROLE(&_Leg10n.CallOpts)
}

// GetOwner is a free data retrieval call binding the contract method 0x0ae50a39.
//
// Solidity: function GetOwner() view returns(address)
func (_Leg10n *Leg10nCaller) GetOwner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetOwner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetOwner is a free data retrieval call binding the contract method 0x0ae50a39.
//
// Solidity: function GetOwner() view returns(address)
func (_Leg10n *Leg10nSession) GetOwner() (common.Address, error) {
	return _Leg10n.Contract.GetOwner(&_Leg10n.CallOpts)
}

// GetOwner is a free data retrieval call binding the contract method 0x0ae50a39.
//
// Solidity: function GetOwner() view returns(address)
func (_Leg10n *Leg10nCallerSession) GetOwner() (common.Address, error) {
	return _Leg10n.Contract.GetOwner(&_Leg10n.CallOpts)
}

// GetPassportFee is a free data retrieval call binding the contract method 0x48dc1561.
//
// Solidity: function GetPassportFee() view returns(uint256)
func (_Leg10n *Leg10nCaller) GetPassportFee(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetPassportFee")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// GetPassportFee is a free data retrieval call binding the contract method 0x48dc1561.
//
// Solidity: function GetPassportFee() view returns(uint256)
func (_Leg10n *Leg10nSession) GetPassportFee() (*big.Int, error) {
	return _Leg10n.Contract.GetPassportFee(&_Leg10n.CallOpts)
}

// GetPassportFee is a free data retrieval call binding the contract method 0x48dc1561.
//
// Solidity: function GetPassportFee() view returns(uint256)
func (_Leg10n *Leg10nCallerSession) GetPassportFee() (*big.Int, error) {
	return _Leg10n.Contract.GetPassportFee(&_Leg10n.CallOpts)
}

// GetPublicKeyByAddress is a free data retrieval call binding the contract method 0xb932fbfa.
//
// Solidity: function GetPublicKeyByAddress(address user_address) view returns(string)
func (_Leg10n *Leg10nCaller) GetPublicKeyByAddress(opts *bind.CallOpts, user_address common.Address) (string, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetPublicKeyByAddress", user_address)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// GetPublicKeyByAddress is a free data retrieval call binding the contract method 0xb932fbfa.
//
// Solidity: function GetPublicKeyByAddress(address user_address) view returns(string)
func (_Leg10n *Leg10nSession) GetPublicKeyByAddress(user_address common.Address) (string, error) {
	return _Leg10n.Contract.GetPublicKeyByAddress(&_Leg10n.CallOpts, user_address)
}

// GetPublicKeyByAddress is a free data retrieval call binding the contract method 0xb932fbfa.
//
// Solidity: function GetPublicKeyByAddress(address user_address) view returns(string)
func (_Leg10n *Leg10nCallerSession) GetPublicKeyByAddress(user_address common.Address) (string, error) {
	return _Leg10n.Contract.GetPublicKeyByAddress(&_Leg10n.CallOpts, user_address)
}

// GetTgIdByAddress is a free data retrieval call binding the contract method 0x61cabe37.
//
// Solidity: function GetTgIdByAddress(address user_wallet) view returns(int64 tgid)
func (_Leg10n *Leg10nCaller) GetTgIdByAddress(opts *bind.CallOpts, user_wallet common.Address) (int64, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetTgIdByAddress", user_wallet)

	if err != nil {
		return *new(int64), err
	}

	out0 := *abi.ConvertType(out[0], new(int64)).(*int64)

	return out0, err

}

// GetTgIdByAddress is a free data retrieval call binding the contract method 0x61cabe37.
//
// Solidity: function GetTgIdByAddress(address user_wallet) view returns(int64 tgid)
func (_Leg10n *Leg10nSession) GetTgIdByAddress(user_wallet common.Address) (int64, error) {
	return _Leg10n.Contract.GetTgIdByAddress(&_Leg10n.CallOpts, user_wallet)
}

// GetTgIdByAddress is a free data retrieval call binding the contract method 0x61cabe37.
//
// Solidity: function GetTgIdByAddress(address user_wallet) view returns(int64 tgid)
func (_Leg10n *Leg10nCallerSession) GetTgIdByAddress(user_wallet common.Address) (int64, error) {
	return _Leg10n.Contract.GetTgIdByAddress(&_Leg10n.CallOpts, user_wallet)
}

// GetUserByAddress is a free data retrieval call binding the contract method 0x1892fd78.
//
// Solidity: function GetUserByAddress(address user_wallet) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nCaller) GetUserByAddress(opts *bind.CallOpts, user_wallet common.Address) (Leg10nUser, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetUserByAddress", user_wallet)

	if err != nil {
		return *new(Leg10nUser), err
	}

	out0 := *abi.ConvertType(out[0], new(Leg10nUser)).(*Leg10nUser)

	return out0, err

}

// GetUserByAddress is a free data retrieval call binding the contract method 0x1892fd78.
//
// Solidity: function GetUserByAddress(address user_wallet) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nSession) GetUserByAddress(user_wallet common.Address) (Leg10nUser, error) {
	return _Leg10n.Contract.GetUserByAddress(&_Leg10n.CallOpts, user_wallet)
}

// GetUserByAddress is a free data retrieval call binding the contract method 0x1892fd78.
//
// Solidity: function GetUserByAddress(address user_wallet) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nCallerSession) GetUserByAddress(user_wallet common.Address) (Leg10nUser, error) {
	return _Leg10n.Contract.GetUserByAddress(&_Leg10n.CallOpts, user_wallet)
}

// GetUserByNickName is a free data retrieval call binding the contract method 0x0d48cae8.
//
// Solidity: function GetUserByNickName(string user_name_) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nCaller) GetUserByNickName(opts *bind.CallOpts, user_name_ string) (Leg10nUser, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetUserByNickName", user_name_)

	if err != nil {
		return *new(Leg10nUser), err
	}

	out0 := *abi.ConvertType(out[0], new(Leg10nUser)).(*Leg10nUser)

	return out0, err

}

// GetUserByNickName is a free data retrieval call binding the contract method 0x0d48cae8.
//
// Solidity: function GetUserByNickName(string user_name_) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nSession) GetUserByNickName(user_name_ string) (Leg10nUser, error) {
	return _Leg10n.Contract.GetUserByNickName(&_Leg10n.CallOpts, user_name_)
}

// GetUserByNickName is a free data retrieval call binding the contract method 0x0d48cae8.
//
// Solidity: function GetUserByNickName(string user_name_) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nCallerSession) GetUserByNickName(user_name_ string) (Leg10nUser, error) {
	return _Leg10n.Contract.GetUserByNickName(&_Leg10n.CallOpts, user_name_)
}

// GetUserByTgId is a free data retrieval call binding the contract method 0xc1cada78.
//
// Solidity: function GetUserByTgId(int64 tgId_) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nCaller) GetUserByTgId(opts *bind.CallOpts, tgId_ int64) (Leg10nUser, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetUserByTgId", tgId_)

	if err != nil {
		return *new(Leg10nUser), err
	}

	out0 := *abi.ConvertType(out[0], new(Leg10nUser)).(*Leg10nUser)

	return out0, err

}

// GetUserByTgId is a free data retrieval call binding the contract method 0xc1cada78.
//
// Solidity: function GetUserByTgId(int64 tgId_) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nSession) GetUserByTgId(tgId_ int64) (Leg10nUser, error) {
	return _Leg10n.Contract.GetUserByTgId(&_Leg10n.CallOpts, tgId_)
}

// GetUserByTgId is a free data retrieval call binding the contract method 0xc1cada78.
//
// Solidity: function GetUserByTgId(int64 tgId_) view returns((address,int64,bool,address,string,string))
func (_Leg10n *Leg10nCallerSession) GetUserByTgId(tgId_ int64) (Leg10nUser, error) {
	return _Leg10n.Contract.GetUserByTgId(&_Leg10n.CallOpts, tgId_)
}

// GetUserWalletByID is a free data retrieval call binding the contract method 0x7cec446b.
//
// Solidity: function GetUserWalletByID(int64 tgId_) view returns(address)
func (_Leg10n *Leg10nCaller) GetUserWalletByID(opts *bind.CallOpts, tgId_ int64) (common.Address, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetUserWalletByID", tgId_)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetUserWalletByID is a free data retrieval call binding the contract method 0x7cec446b.
//
// Solidity: function GetUserWalletByID(int64 tgId_) view returns(address)
func (_Leg10n *Leg10nSession) GetUserWalletByID(tgId_ int64) (common.Address, error) {
	return _Leg10n.Contract.GetUserWalletByID(&_Leg10n.CallOpts, tgId_)
}

// GetUserWalletByID is a free data retrieval call binding the contract method 0x7cec446b.
//
// Solidity: function GetUserWalletByID(int64 tgId_) view returns(address)
func (_Leg10n *Leg10nCallerSession) GetUserWalletByID(tgId_ int64) (common.Address, error) {
	return _Leg10n.Contract.GetUserWalletByID(&_Leg10n.CallOpts, tgId_)
}

// GetWalletByNickName is a free data retrieval call binding the contract method 0xd2114e18.
//
// Solidity: function GetWalletByNickName(string user_name_) view returns(address)
func (_Leg10n *Leg10nCaller) GetWalletByNickName(opts *bind.CallOpts, user_name_ string) (common.Address, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "GetWalletByNickName", user_name_)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// GetWalletByNickName is a free data retrieval call binding the contract method 0xd2114e18.
//
// Solidity: function GetWalletByNickName(string user_name_) view returns(address)
func (_Leg10n *Leg10nSession) GetWalletByNickName(user_name_ string) (common.Address, error) {
	return _Leg10n.Contract.GetWalletByNickName(&_Leg10n.CallOpts, user_name_)
}

// GetWalletByNickName is a free data retrieval call binding the contract method 0xd2114e18.
//
// Solidity: function GetWalletByNickName(string user_name_) view returns(address)
func (_Leg10n *Leg10nCallerSession) GetWalletByNickName(user_name_ string) (common.Address, error) {
	return _Leg10n.Contract.GetWalletByNickName(&_Leg10n.CallOpts, user_name_)
}

// Chain is a free data retrieval call binding the contract method 0x460e6c9c.
//
// Solidity: function chain(address , address ) view returns(bool)
func (_Leg10n *Leg10nCaller) Chain(opts *bind.CallOpts, arg0 common.Address, arg1 common.Address) (bool, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "chain", arg0, arg1)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// Chain is a free data retrieval call binding the contract method 0x460e6c9c.
//
// Solidity: function chain(address , address ) view returns(bool)
func (_Leg10n *Leg10nSession) Chain(arg0 common.Address, arg1 common.Address) (bool, error) {
	return _Leg10n.Contract.Chain(&_Leg10n.CallOpts, arg0, arg1)
}

// Chain is a free data retrieval call binding the contract method 0x460e6c9c.
//
// Solidity: function chain(address , address ) view returns(bool)
func (_Leg10n *Leg10nCallerSession) Chain(arg0 common.Address, arg1 common.Address) (bool, error) {
	return _Leg10n.Contract.Chain(&_Leg10n.CallOpts, arg0, arg1)
}

// CodenameWallets is a free data retrieval call binding the contract method 0x6e312028.
//
// Solidity: function codename_wallets(string ) view returns(address)
func (_Leg10n *Leg10nCaller) CodenameWallets(opts *bind.CallOpts, arg0 string) (common.Address, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "codename_wallets", arg0)

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// CodenameWallets is a free data retrieval call binding the contract method 0x6e312028.
//
// Solidity: function codename_wallets(string ) view returns(address)
func (_Leg10n *Leg10nSession) CodenameWallets(arg0 string) (common.Address, error) {
	return _Leg10n.Contract.CodenameWallets(&_Leg10n.CallOpts, arg0)
}

// CodenameWallets is a free data retrieval call binding the contract method 0x6e312028.
//
// Solidity: function codename_wallets(string ) view returns(address)
func (_Leg10n *Leg10nCallerSession) CodenameWallets(arg0 string) (common.Address, error) {
	return _Leg10n.Contract.CodenameWallets(&_Leg10n.CallOpts, arg0)
}

// GetModeratorIdentifier is a free data retrieval call binding the contract method 0x5d1ce88f.
//
// Solidity: function getModeratorIdentifier() pure returns(bytes32)
func (_Leg10n *Leg10nCaller) GetModeratorIdentifier(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "getModeratorIdentifier")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// GetModeratorIdentifier is a free data retrieval call binding the contract method 0x5d1ce88f.
//
// Solidity: function getModeratorIdentifier() pure returns(bytes32)
func (_Leg10n *Leg10nSession) GetModeratorIdentifier() ([32]byte, error) {
	return _Leg10n.Contract.GetModeratorIdentifier(&_Leg10n.CallOpts)
}

// GetModeratorIdentifier is a free data retrieval call binding the contract method 0x5d1ce88f.
//
// Solidity: function getModeratorIdentifier() pure returns(bytes32)
func (_Leg10n *Leg10nCallerSession) GetModeratorIdentifier() ([32]byte, error) {
	return _Leg10n.Contract.GetModeratorIdentifier(&_Leg10n.CallOpts)
}

// GetRoleAdmin is a free data retrieval call binding the contract method 0x248a9ca3.
//
// Solidity: function getRoleAdmin(bytes32 role) view returns(bytes32)
func (_Leg10n *Leg10nCaller) GetRoleAdmin(opts *bind.CallOpts, role [32]byte) ([32]byte, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "getRoleAdmin", role)

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// GetRoleAdmin is a free data retrieval call binding the contract method 0x248a9ca3.
//
// Solidity: function getRoleAdmin(bytes32 role) view returns(bytes32)
func (_Leg10n *Leg10nSession) GetRoleAdmin(role [32]byte) ([32]byte, error) {
	return _Leg10n.Contract.GetRoleAdmin(&_Leg10n.CallOpts, role)
}

// GetRoleAdmin is a free data retrieval call binding the contract method 0x248a9ca3.
//
// Solidity: function getRoleAdmin(bytes32 role) view returns(bytes32)
func (_Leg10n *Leg10nCallerSession) GetRoleAdmin(role [32]byte) ([32]byte, error) {
	return _Leg10n.Contract.GetRoleAdmin(&_Leg10n.CallOpts, role)
}

// HasRole is a free data retrieval call binding the contract method 0x91d14854.
//
// Solidity: function hasRole(bytes32 role, address account) view returns(bool)
func (_Leg10n *Leg10nCaller) HasRole(opts *bind.CallOpts, role [32]byte, account common.Address) (bool, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "hasRole", role, account)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// HasRole is a free data retrieval call binding the contract method 0x91d14854.
//
// Solidity: function hasRole(bytes32 role, address account) view returns(bool)
func (_Leg10n *Leg10nSession) HasRole(role [32]byte, account common.Address) (bool, error) {
	return _Leg10n.Contract.HasRole(&_Leg10n.CallOpts, role, account)
}

// HasRole is a free data retrieval call binding the contract method 0x91d14854.
//
// Solidity: function hasRole(bytes32 role, address account) view returns(bool)
func (_Leg10n *Leg10nCallerSession) HasRole(role [32]byte, account common.Address) (bool, error) {
	return _Leg10n.Contract.HasRole(&_Leg10n.CallOpts, role, account)
}

// Moderator is a free data retrieval call binding the contract method 0x38743904.
//
// Solidity: function moderator() view returns(bytes32)
func (_Leg10n *Leg10nCaller) Moderator(opts *bind.CallOpts) ([32]byte, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "moderator")

	if err != nil {
		return *new([32]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([32]byte)).(*[32]byte)

	return out0, err

}

// Moderator is a free data retrieval call binding the contract method 0x38743904.
//
// Solidity: function moderator() view returns(bytes32)
func (_Leg10n *Leg10nSession) Moderator() ([32]byte, error) {
	return _Leg10n.Contract.Moderator(&_Leg10n.CallOpts)
}

// Moderator is a free data retrieval call binding the contract method 0x38743904.
//
// Solidity: function moderator() view returns(bytes32)
func (_Leg10n *Leg10nCallerSession) Moderator() ([32]byte, error) {
	return _Leg10n.Contract.Moderator(&_Leg10n.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Leg10n *Leg10nCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Leg10n *Leg10nSession) Owner() (common.Address, error) {
	return _Leg10n.Contract.Owner(&_Leg10n.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Leg10n *Leg10nCallerSession) Owner() (common.Address, error) {
	return _Leg10n.Contract.Owner(&_Leg10n.CallOpts)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Leg10n *Leg10nCaller) SupportsInterface(opts *bind.CallOpts, interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "supportsInterface", interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Leg10n *Leg10nSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _Leg10n.Contract.SupportsInterface(&_Leg10n.CallOpts, interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Leg10n *Leg10nCallerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _Leg10n.Contract.SupportsInterface(&_Leg10n.CallOpts, interfaceId)
}

// Users is a free data retrieval call binding the contract method 0xa87430ba.
//
// Solidity: function users(address ) view returns(address userAddress, int64 tgId, bool valid, address validatorAddress, string codeName, string public_key)
func (_Leg10n *Leg10nCaller) Users(opts *bind.CallOpts, arg0 common.Address) (struct {
	UserAddress      common.Address
	TgId             int64
	Valid            bool
	ValidatorAddress common.Address
	CodeName         string
	PublicKey        string
}, error) {
	var out []interface{}
	err := _Leg10n.contract.Call(opts, &out, "users", arg0)

	outstruct := new(struct {
		UserAddress      common.Address
		TgId             int64
		Valid            bool
		ValidatorAddress common.Address
		CodeName         string
		PublicKey        string
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.UserAddress = *abi.ConvertType(out[0], new(common.Address)).(*common.Address)
	outstruct.TgId = *abi.ConvertType(out[1], new(int64)).(*int64)
	outstruct.Valid = *abi.ConvertType(out[2], new(bool)).(*bool)
	outstruct.ValidatorAddress = *abi.ConvertType(out[3], new(common.Address)).(*common.Address)
	outstruct.CodeName = *abi.ConvertType(out[4], new(string)).(*string)
	outstruct.PublicKey = *abi.ConvertType(out[5], new(string)).(*string)

	return *outstruct, err

}

// Users is a free data retrieval call binding the contract method 0xa87430ba.
//
// Solidity: function users(address ) view returns(address userAddress, int64 tgId, bool valid, address validatorAddress, string codeName, string public_key)
func (_Leg10n *Leg10nSession) Users(arg0 common.Address) (struct {
	UserAddress      common.Address
	TgId             int64
	Valid            bool
	ValidatorAddress common.Address
	CodeName         string
	PublicKey        string
}, error) {
	return _Leg10n.Contract.Users(&_Leg10n.CallOpts, arg0)
}

// Users is a free data retrieval call binding the contract method 0xa87430ba.
//
// Solidity: function users(address ) view returns(address userAddress, int64 tgId, bool valid, address validatorAddress, string codeName, string public_key)
func (_Leg10n *Leg10nCallerSession) Users(arg0 common.Address) (struct {
	UserAddress      common.Address
	TgId             int64
	Valid            bool
	ValidatorAddress common.Address
	CodeName         string
	PublicKey        string
}, error) {
	return _Leg10n.Contract.Users(&_Leg10n.CallOpts, arg0)
}

// AcceptJoin is a paid mutator transaction binding the contract method 0xb233e5eb.
//
// Solidity: function AcceptJoin(int64 applyerTg, string parent_name) returns()
func (_Leg10n *Leg10nTransactor) AcceptJoin(opts *bind.TransactOpts, applyerTg int64, parent_name string) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "AcceptJoin", applyerTg, parent_name)
}

// AcceptJoin is a paid mutator transaction binding the contract method 0xb233e5eb.
//
// Solidity: function AcceptJoin(int64 applyerTg, string parent_name) returns()
func (_Leg10n *Leg10nSession) AcceptJoin(applyerTg int64, parent_name string) (*types.Transaction, error) {
	return _Leg10n.Contract.AcceptJoin(&_Leg10n.TransactOpts, applyerTg, parent_name)
}

// AcceptJoin is a paid mutator transaction binding the contract method 0xb233e5eb.
//
// Solidity: function AcceptJoin(int64 applyerTg, string parent_name) returns()
func (_Leg10n *Leg10nTransactorSession) AcceptJoin(applyerTg int64, parent_name string) (*types.Transaction, error) {
	return _Leg10n.Contract.AcceptJoin(&_Leg10n.TransactOpts, applyerTg, parent_name)
}

// ClearParent is a paid mutator transaction binding the contract method 0x018d3dc9.
//
// Solidity: function ClearParent(string parent_name, string child_name) returns()
func (_Leg10n *Leg10nTransactor) ClearParent(opts *bind.TransactOpts, parent_name string, child_name string) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "ClearParent", parent_name, child_name)
}

// ClearParent is a paid mutator transaction binding the contract method 0x018d3dc9.
//
// Solidity: function ClearParent(string parent_name, string child_name) returns()
func (_Leg10n *Leg10nSession) ClearParent(parent_name string, child_name string) (*types.Transaction, error) {
	return _Leg10n.Contract.ClearParent(&_Leg10n.TransactOpts, parent_name, child_name)
}

// ClearParent is a paid mutator transaction binding the contract method 0x018d3dc9.
//
// Solidity: function ClearParent(string parent_name, string child_name) returns()
func (_Leg10n *Leg10nTransactorSession) ClearParent(parent_name string, child_name string) (*types.Transaction, error) {
	return _Leg10n.Contract.ClearParent(&_Leg10n.TransactOpts, parent_name, child_name)
}

// DeclineRequest is a paid mutator transaction binding the contract method 0x00d396ed.
//
// Solidity: function DeclineRequest(int64 tgid) returns()
func (_Leg10n *Leg10nTransactor) DeclineRequest(opts *bind.TransactOpts, tgid int64) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "DeclineRequest", tgid)
}

// DeclineRequest is a paid mutator transaction binding the contract method 0x00d396ed.
//
// Solidity: function DeclineRequest(int64 tgid) returns()
func (_Leg10n *Leg10nSession) DeclineRequest(tgid int64) (*types.Transaction, error) {
	return _Leg10n.Contract.DeclineRequest(&_Leg10n.TransactOpts, tgid)
}

// DeclineRequest is a paid mutator transaction binding the contract method 0x00d396ed.
//
// Solidity: function DeclineRequest(int64 tgid) returns()
func (_Leg10n *Leg10nTransactorSession) DeclineRequest(tgid int64) (*types.Transaction, error) {
	return _Leg10n.Contract.DeclineRequest(&_Leg10n.TransactOpts, tgid)
}

// RequestJoin is a paid mutator transaction binding the contract method 0xb44cf600.
//
// Solidity: function RequestJoin(int64 applyerTg, string code_name_, string parent_name, string public_key) payable returns()
func (_Leg10n *Leg10nTransactor) RequestJoin(opts *bind.TransactOpts, applyerTg int64, code_name_ string, parent_name string, public_key string) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "RequestJoin", applyerTg, code_name_, parent_name, public_key)
}

// RequestJoin is a paid mutator transaction binding the contract method 0xb44cf600.
//
// Solidity: function RequestJoin(int64 applyerTg, string code_name_, string parent_name, string public_key) payable returns()
func (_Leg10n *Leg10nSession) RequestJoin(applyerTg int64, code_name_ string, parent_name string, public_key string) (*types.Transaction, error) {
	return _Leg10n.Contract.RequestJoin(&_Leg10n.TransactOpts, applyerTg, code_name_, parent_name, public_key)
}

// RequestJoin is a paid mutator transaction binding the contract method 0xb44cf600.
//
// Solidity: function RequestJoin(int64 applyerTg, string code_name_, string parent_name, string public_key) payable returns()
func (_Leg10n *Leg10nTransactorSession) RequestJoin(applyerTg int64, code_name_ string, parent_name string, public_key string) (*types.Transaction, error) {
	return _Leg10n.Contract.RequestJoin(&_Leg10n.TransactOpts, applyerTg, code_name_, parent_name, public_key)
}

// SetPassportFee is a paid mutator transaction binding the contract method 0xd2125bd2.
//
// Solidity: function SetPassportFee(uint256 passportFee_) returns()
func (_Leg10n *Leg10nTransactor) SetPassportFee(opts *bind.TransactOpts, passportFee_ *big.Int) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "SetPassportFee", passportFee_)
}

// SetPassportFee is a paid mutator transaction binding the contract method 0xd2125bd2.
//
// Solidity: function SetPassportFee(uint256 passportFee_) returns()
func (_Leg10n *Leg10nSession) SetPassportFee(passportFee_ *big.Int) (*types.Transaction, error) {
	return _Leg10n.Contract.SetPassportFee(&_Leg10n.TransactOpts, passportFee_)
}

// SetPassportFee is a paid mutator transaction binding the contract method 0xd2125bd2.
//
// Solidity: function SetPassportFee(uint256 passportFee_) returns()
func (_Leg10n *Leg10nTransactorSession) SetPassportFee(passportFee_ *big.Int) (*types.Transaction, error) {
	return _Leg10n.Contract.SetPassportFee(&_Leg10n.TransactOpts, passportFee_)
}

// DeleteYourSelf is a paid mutator transaction binding the contract method 0x679b06be.
//
// Solidity: function deleteYourSelf() returns()
func (_Leg10n *Leg10nTransactor) DeleteYourSelf(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "deleteYourSelf")
}

// DeleteYourSelf is a paid mutator transaction binding the contract method 0x679b06be.
//
// Solidity: function deleteYourSelf() returns()
func (_Leg10n *Leg10nSession) DeleteYourSelf() (*types.Transaction, error) {
	return _Leg10n.Contract.DeleteYourSelf(&_Leg10n.TransactOpts)
}

// DeleteYourSelf is a paid mutator transaction binding the contract method 0x679b06be.
//
// Solidity: function deleteYourSelf() returns()
func (_Leg10n *Leg10nTransactorSession) DeleteYourSelf() (*types.Transaction, error) {
	return _Leg10n.Contract.DeleteYourSelf(&_Leg10n.TransactOpts)
}

// DevDeleteUser is a paid mutator transaction binding the contract method 0x2067eac8.
//
// Solidity: function devDeleteUser(address user_address) returns()
func (_Leg10n *Leg10nTransactor) DevDeleteUser(opts *bind.TransactOpts, user_address common.Address) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "devDeleteUser", user_address)
}

// DevDeleteUser is a paid mutator transaction binding the contract method 0x2067eac8.
//
// Solidity: function devDeleteUser(address user_address) returns()
func (_Leg10n *Leg10nSession) DevDeleteUser(user_address common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.DevDeleteUser(&_Leg10n.TransactOpts, user_address)
}

// DevDeleteUser is a paid mutator transaction binding the contract method 0x2067eac8.
//
// Solidity: function devDeleteUser(address user_address) returns()
func (_Leg10n *Leg10nTransactorSession) DevDeleteUser(user_address common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.DevDeleteUser(&_Leg10n.TransactOpts, user_address)
}

// GrantRole is a paid mutator transaction binding the contract method 0x2f2ff15d.
//
// Solidity: function grantRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nTransactor) GrantRole(opts *bind.TransactOpts, role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "grantRole", role, account)
}

// GrantRole is a paid mutator transaction binding the contract method 0x2f2ff15d.
//
// Solidity: function grantRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nSession) GrantRole(role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.GrantRole(&_Leg10n.TransactOpts, role, account)
}

// GrantRole is a paid mutator transaction binding the contract method 0x2f2ff15d.
//
// Solidity: function grantRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nTransactorSession) GrantRole(role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.GrantRole(&_Leg10n.TransactOpts, role, account)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Leg10n *Leg10nTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Leg10n *Leg10nSession) RenounceOwnership() (*types.Transaction, error) {
	return _Leg10n.Contract.RenounceOwnership(&_Leg10n.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Leg10n *Leg10nTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Leg10n.Contract.RenounceOwnership(&_Leg10n.TransactOpts)
}

// RenounceRole is a paid mutator transaction binding the contract method 0x36568abe.
//
// Solidity: function renounceRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nTransactor) RenounceRole(opts *bind.TransactOpts, role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "renounceRole", role, account)
}

// RenounceRole is a paid mutator transaction binding the contract method 0x36568abe.
//
// Solidity: function renounceRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nSession) RenounceRole(role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.RenounceRole(&_Leg10n.TransactOpts, role, account)
}

// RenounceRole is a paid mutator transaction binding the contract method 0x36568abe.
//
// Solidity: function renounceRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nTransactorSession) RenounceRole(role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.RenounceRole(&_Leg10n.TransactOpts, role, account)
}

// RevokeRole is a paid mutator transaction binding the contract method 0xd547741f.
//
// Solidity: function revokeRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nTransactor) RevokeRole(opts *bind.TransactOpts, role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "revokeRole", role, account)
}

// RevokeRole is a paid mutator transaction binding the contract method 0xd547741f.
//
// Solidity: function revokeRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nSession) RevokeRole(role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.RevokeRole(&_Leg10n.TransactOpts, role, account)
}

// RevokeRole is a paid mutator transaction binding the contract method 0xd547741f.
//
// Solidity: function revokeRole(bytes32 role, address account) returns()
func (_Leg10n *Leg10nTransactorSession) RevokeRole(role [32]byte, account common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.RevokeRole(&_Leg10n.TransactOpts, role, account)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Leg10n *Leg10nTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Leg10n.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Leg10n *Leg10nSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.TransferOwnership(&_Leg10n.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Leg10n *Leg10nTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Leg10n.Contract.TransferOwnership(&_Leg10n.TransactOpts, newOwner)
}

// Leg10nOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Leg10n contract.
type Leg10nOwnershipTransferredIterator struct {
	Event *Leg10nOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nOwnershipTransferred represents a OwnershipTransferred event raised by the Leg10n contract.
type Leg10nOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Leg10n *Leg10nFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*Leg10nOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nOwnershipTransferredIterator{contract: _Leg10n.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Leg10n *Leg10nFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *Leg10nOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nOwnershipTransferred)
				if err := _Leg10n.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Leg10n *Leg10nFilterer) ParseOwnershipTransferred(log types.Log) (*Leg10nOwnershipTransferred, error) {
	event := new(Leg10nOwnershipTransferred)
	if err := _Leg10n.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nRoleAdminChangedIterator is returned from FilterRoleAdminChanged and is used to iterate over the raw logs and unpacked data for RoleAdminChanged events raised by the Leg10n contract.
type Leg10nRoleAdminChangedIterator struct {
	Event *Leg10nRoleAdminChanged // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nRoleAdminChangedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nRoleAdminChanged)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nRoleAdminChanged)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nRoleAdminChangedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nRoleAdminChangedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nRoleAdminChanged represents a RoleAdminChanged event raised by the Leg10n contract.
type Leg10nRoleAdminChanged struct {
	Role              [32]byte
	PreviousAdminRole [32]byte
	NewAdminRole      [32]byte
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterRoleAdminChanged is a free log retrieval operation binding the contract event 0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff.
//
// Solidity: event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)
func (_Leg10n *Leg10nFilterer) FilterRoleAdminChanged(opts *bind.FilterOpts, role [][32]byte, previousAdminRole [][32]byte, newAdminRole [][32]byte) (*Leg10nRoleAdminChangedIterator, error) {

	var roleRule []interface{}
	for _, roleItem := range role {
		roleRule = append(roleRule, roleItem)
	}
	var previousAdminRoleRule []interface{}
	for _, previousAdminRoleItem := range previousAdminRole {
		previousAdminRoleRule = append(previousAdminRoleRule, previousAdminRoleItem)
	}
	var newAdminRoleRule []interface{}
	for _, newAdminRoleItem := range newAdminRole {
		newAdminRoleRule = append(newAdminRoleRule, newAdminRoleItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "RoleAdminChanged", roleRule, previousAdminRoleRule, newAdminRoleRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nRoleAdminChangedIterator{contract: _Leg10n.contract, event: "RoleAdminChanged", logs: logs, sub: sub}, nil
}

// WatchRoleAdminChanged is a free log subscription operation binding the contract event 0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff.
//
// Solidity: event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)
func (_Leg10n *Leg10nFilterer) WatchRoleAdminChanged(opts *bind.WatchOpts, sink chan<- *Leg10nRoleAdminChanged, role [][32]byte, previousAdminRole [][32]byte, newAdminRole [][32]byte) (event.Subscription, error) {

	var roleRule []interface{}
	for _, roleItem := range role {
		roleRule = append(roleRule, roleItem)
	}
	var previousAdminRoleRule []interface{}
	for _, previousAdminRoleItem := range previousAdminRole {
		previousAdminRoleRule = append(previousAdminRoleRule, previousAdminRoleItem)
	}
	var newAdminRoleRule []interface{}
	for _, newAdminRoleItem := range newAdminRole {
		newAdminRoleRule = append(newAdminRoleRule, newAdminRoleItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "RoleAdminChanged", roleRule, previousAdminRoleRule, newAdminRoleRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nRoleAdminChanged)
				if err := _Leg10n.contract.UnpackLog(event, "RoleAdminChanged", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRoleAdminChanged is a log parse operation binding the contract event 0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff.
//
// Solidity: event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)
func (_Leg10n *Leg10nFilterer) ParseRoleAdminChanged(log types.Log) (*Leg10nRoleAdminChanged, error) {
	event := new(Leg10nRoleAdminChanged)
	if err := _Leg10n.contract.UnpackLog(event, "RoleAdminChanged", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nRoleGrantedIterator is returned from FilterRoleGranted and is used to iterate over the raw logs and unpacked data for RoleGranted events raised by the Leg10n contract.
type Leg10nRoleGrantedIterator struct {
	Event *Leg10nRoleGranted // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nRoleGrantedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nRoleGranted)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nRoleGranted)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nRoleGrantedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nRoleGrantedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nRoleGranted represents a RoleGranted event raised by the Leg10n contract.
type Leg10nRoleGranted struct {
	Role    [32]byte
	Account common.Address
	Sender  common.Address
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterRoleGranted is a free log retrieval operation binding the contract event 0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d.
//
// Solidity: event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)
func (_Leg10n *Leg10nFilterer) FilterRoleGranted(opts *bind.FilterOpts, role [][32]byte, account []common.Address, sender []common.Address) (*Leg10nRoleGrantedIterator, error) {

	var roleRule []interface{}
	for _, roleItem := range role {
		roleRule = append(roleRule, roleItem)
	}
	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "RoleGranted", roleRule, accountRule, senderRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nRoleGrantedIterator{contract: _Leg10n.contract, event: "RoleGranted", logs: logs, sub: sub}, nil
}

// WatchRoleGranted is a free log subscription operation binding the contract event 0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d.
//
// Solidity: event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)
func (_Leg10n *Leg10nFilterer) WatchRoleGranted(opts *bind.WatchOpts, sink chan<- *Leg10nRoleGranted, role [][32]byte, account []common.Address, sender []common.Address) (event.Subscription, error) {

	var roleRule []interface{}
	for _, roleItem := range role {
		roleRule = append(roleRule, roleItem)
	}
	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "RoleGranted", roleRule, accountRule, senderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nRoleGranted)
				if err := _Leg10n.contract.UnpackLog(event, "RoleGranted", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRoleGranted is a log parse operation binding the contract event 0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d.
//
// Solidity: event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)
func (_Leg10n *Leg10nFilterer) ParseRoleGranted(log types.Log) (*Leg10nRoleGranted, error) {
	event := new(Leg10nRoleGranted)
	if err := _Leg10n.contract.UnpackLog(event, "RoleGranted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nRoleRevokedIterator is returned from FilterRoleRevoked and is used to iterate over the raw logs and unpacked data for RoleRevoked events raised by the Leg10n contract.
type Leg10nRoleRevokedIterator struct {
	Event *Leg10nRoleRevoked // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nRoleRevokedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nRoleRevoked)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nRoleRevoked)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nRoleRevokedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nRoleRevokedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nRoleRevoked represents a RoleRevoked event raised by the Leg10n contract.
type Leg10nRoleRevoked struct {
	Role    [32]byte
	Account common.Address
	Sender  common.Address
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterRoleRevoked is a free log retrieval operation binding the contract event 0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b.
//
// Solidity: event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)
func (_Leg10n *Leg10nFilterer) FilterRoleRevoked(opts *bind.FilterOpts, role [][32]byte, account []common.Address, sender []common.Address) (*Leg10nRoleRevokedIterator, error) {

	var roleRule []interface{}
	for _, roleItem := range role {
		roleRule = append(roleRule, roleItem)
	}
	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "RoleRevoked", roleRule, accountRule, senderRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nRoleRevokedIterator{contract: _Leg10n.contract, event: "RoleRevoked", logs: logs, sub: sub}, nil
}

// WatchRoleRevoked is a free log subscription operation binding the contract event 0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b.
//
// Solidity: event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)
func (_Leg10n *Leg10nFilterer) WatchRoleRevoked(opts *bind.WatchOpts, sink chan<- *Leg10nRoleRevoked, role [][32]byte, account []common.Address, sender []common.Address) (event.Subscription, error) {

	var roleRule []interface{}
	for _, roleItem := range role {
		roleRule = append(roleRule, roleItem)
	}
	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var senderRule []interface{}
	for _, senderItem := range sender {
		senderRule = append(senderRule, senderItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "RoleRevoked", roleRule, accountRule, senderRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nRoleRevoked)
				if err := _Leg10n.contract.UnpackLog(event, "RoleRevoked", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRoleRevoked is a log parse operation binding the contract event 0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b.
//
// Solidity: event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)
func (_Leg10n *Leg10nFilterer) ParseRoleRevoked(log types.Log) (*Leg10nRoleRevoked, error) {
	event := new(Leg10nRoleRevoked)
	if err := _Leg10n.contract.UnpackLog(event, "RoleRevoked", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nJoinRequestedIterator is returned from FilterJoinRequested and is used to iterate over the raw logs and unpacked data for JoinRequested events raised by the Leg10n contract.
type Leg10nJoinRequestedIterator struct {
	Event *Leg10nJoinRequested // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nJoinRequestedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nJoinRequested)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nJoinRequested)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nJoinRequestedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nJoinRequestedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nJoinRequested represents a JoinRequested event raised by the Leg10n contract.
type Leg10nJoinRequested struct {
	ApplyerTg     int64
	WalletAddress common.Address
	ParentAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterJoinRequested is a free log retrieval operation binding the contract event 0x217213f52d0ada6519b1710cff4d5e622165afded08327f17577ff3c30371360.
//
// Solidity: event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address)
func (_Leg10n *Leg10nFilterer) FilterJoinRequested(opts *bind.FilterOpts, parent_address []common.Address) (*Leg10nJoinRequestedIterator, error) {

	var parent_addressRule []interface{}
	for _, parent_addressItem := range parent_address {
		parent_addressRule = append(parent_addressRule, parent_addressItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "joinRequested", parent_addressRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nJoinRequestedIterator{contract: _Leg10n.contract, event: "joinRequested", logs: logs, sub: sub}, nil
}

// WatchJoinRequested is a free log subscription operation binding the contract event 0x217213f52d0ada6519b1710cff4d5e622165afded08327f17577ff3c30371360.
//
// Solidity: event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address)
func (_Leg10n *Leg10nFilterer) WatchJoinRequested(opts *bind.WatchOpts, sink chan<- *Leg10nJoinRequested, parent_address []common.Address) (event.Subscription, error) {

	var parent_addressRule []interface{}
	for _, parent_addressItem := range parent_address {
		parent_addressRule = append(parent_addressRule, parent_addressItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "joinRequested", parent_addressRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nJoinRequested)
				if err := _Leg10n.contract.UnpackLog(event, "joinRequested", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseJoinRequested is a log parse operation binding the contract event 0x217213f52d0ada6519b1710cff4d5e622165afded08327f17577ff3c30371360.
//
// Solidity: event joinRequested(int64 applyerTg, address wallet_address, address indexed parent_address)
func (_Leg10n *Leg10nFilterer) ParseJoinRequested(log types.Log) (*Leg10nJoinRequested, error) {
	event := new(Leg10nJoinRequested)
	if err := _Leg10n.contract.UnpackLog(event, "joinRequested", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nJoinRequestedIndexedTGIterator is returned from FilterJoinRequestedIndexedTG and is used to iterate over the raw logs and unpacked data for JoinRequestedIndexedTG events raised by the Leg10n contract.
type Leg10nJoinRequestedIndexedTGIterator struct {
	Event *Leg10nJoinRequestedIndexedTG // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nJoinRequestedIndexedTGIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nJoinRequestedIndexedTG)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nJoinRequestedIndexedTG)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nJoinRequestedIndexedTGIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nJoinRequestedIndexedTGIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nJoinRequestedIndexedTG represents a JoinRequestedIndexedTG event raised by the Leg10n contract.
type Leg10nJoinRequestedIndexedTG struct {
	ApplyerTg     int64
	WalletAddress common.Address
	ParentAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterJoinRequestedIndexedTG is a free log retrieval operation binding the contract event 0x2f9961dc36e79933613fb931d5ca8392c911b25840b07276e17e19961d228240.
//
// Solidity: event joinRequestedIndexedTG(int64 applyerTg, address wallet_address, address indexed parent_address)
func (_Leg10n *Leg10nFilterer) FilterJoinRequestedIndexedTG(opts *bind.FilterOpts, parent_address []common.Address) (*Leg10nJoinRequestedIndexedTGIterator, error) {

	var parent_addressRule []interface{}
	for _, parent_addressItem := range parent_address {
		parent_addressRule = append(parent_addressRule, parent_addressItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "joinRequestedIndexedTG", parent_addressRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nJoinRequestedIndexedTGIterator{contract: _Leg10n.contract, event: "joinRequestedIndexedTG", logs: logs, sub: sub}, nil
}

// WatchJoinRequestedIndexedTG is a free log subscription operation binding the contract event 0x2f9961dc36e79933613fb931d5ca8392c911b25840b07276e17e19961d228240.
//
// Solidity: event joinRequestedIndexedTG(int64 applyerTg, address wallet_address, address indexed parent_address)
func (_Leg10n *Leg10nFilterer) WatchJoinRequestedIndexedTG(opts *bind.WatchOpts, sink chan<- *Leg10nJoinRequestedIndexedTG, parent_address []common.Address) (event.Subscription, error) {

	var parent_addressRule []interface{}
	for _, parent_addressItem := range parent_address {
		parent_addressRule = append(parent_addressRule, parent_addressItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "joinRequestedIndexedTG", parent_addressRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nJoinRequestedIndexedTG)
				if err := _Leg10n.contract.UnpackLog(event, "joinRequestedIndexedTG", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseJoinRequestedIndexedTG is a log parse operation binding the contract event 0x2f9961dc36e79933613fb931d5ca8392c911b25840b07276e17e19961d228240.
//
// Solidity: event joinRequestedIndexedTG(int64 applyerTg, address wallet_address, address indexed parent_address)
func (_Leg10n *Leg10nFilterer) ParseJoinRequestedIndexedTG(log types.Log) (*Leg10nJoinRequestedIndexedTG, error) {
	event := new(Leg10nJoinRequestedIndexedTG)
	if err := _Leg10n.contract.UnpackLog(event, "joinRequestedIndexedTG", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nRelationChangedIterator is returned from FilterRelationChanged and is used to iterate over the raw logs and unpacked data for RelationChanged events raised by the Leg10n contract.
type Leg10nRelationChangedIterator struct {
	Event *Leg10nRelationChanged // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nRelationChangedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nRelationChanged)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nRelationChanged)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nRelationChangedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nRelationChangedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nRelationChanged represents a RelationChanged event raised by the Leg10n contract.
type Leg10nRelationChanged struct {
	HighNode common.Address
	LowNode  common.Address
	Pravda   bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterRelationChanged is a free log retrieval operation binding the contract event 0xadbeb0a5d66e2be993428864e5c86f7c8aa562e2c58131d193ac2eeb7443817a.
//
// Solidity: event relationChanged(address high_node, address indexed low_node, bool pravda)
func (_Leg10n *Leg10nFilterer) FilterRelationChanged(opts *bind.FilterOpts, low_node []common.Address) (*Leg10nRelationChangedIterator, error) {

	var low_nodeRule []interface{}
	for _, low_nodeItem := range low_node {
		low_nodeRule = append(low_nodeRule, low_nodeItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "relationChanged", low_nodeRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nRelationChangedIterator{contract: _Leg10n.contract, event: "relationChanged", logs: logs, sub: sub}, nil
}

// WatchRelationChanged is a free log subscription operation binding the contract event 0xadbeb0a5d66e2be993428864e5c86f7c8aa562e2c58131d193ac2eeb7443817a.
//
// Solidity: event relationChanged(address high_node, address indexed low_node, bool pravda)
func (_Leg10n *Leg10nFilterer) WatchRelationChanged(opts *bind.WatchOpts, sink chan<- *Leg10nRelationChanged, low_node []common.Address) (event.Subscription, error) {

	var low_nodeRule []interface{}
	for _, low_nodeItem := range low_node {
		low_nodeRule = append(low_nodeRule, low_nodeItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "relationChanged", low_nodeRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nRelationChanged)
				if err := _Leg10n.contract.UnpackLog(event, "relationChanged", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRelationChanged is a log parse operation binding the contract event 0xadbeb0a5d66e2be993428864e5c86f7c8aa562e2c58131d193ac2eeb7443817a.
//
// Solidity: event relationChanged(address high_node, address indexed low_node, bool pravda)
func (_Leg10n *Leg10nFilterer) ParseRelationChanged(log types.Log) (*Leg10nRelationChanged, error) {
	event := new(Leg10nRelationChanged)
	if err := _Leg10n.contract.UnpackLog(event, "relationChanged", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nRequestAcceptedIterator is returned from FilterRequestAccepted and is used to iterate over the raw logs and unpacked data for RequestAccepted events raised by the Leg10n contract.
type Leg10nRequestAcceptedIterator struct {
	Event *Leg10nRequestAccepted // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nRequestAcceptedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nRequestAccepted)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nRequestAccepted)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nRequestAcceptedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nRequestAcceptedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nRequestAccepted represents a RequestAccepted event raised by the Leg10n contract.
type Leg10nRequestAccepted struct {
	ApplyerTg     int64
	UserAddress   common.Address
	ParentAddress common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterRequestAccepted is a free log retrieval operation binding the contract event 0x1eae2e277962887ad58eeeadb2b3aa51b47e4a8f2caabf46938991ab7d9e29e2.
//
// Solidity: event requestAccepted(int64 indexed applyerTg, address user_address, address parent_address)
func (_Leg10n *Leg10nFilterer) FilterRequestAccepted(opts *bind.FilterOpts, applyerTg []int64) (*Leg10nRequestAcceptedIterator, error) {

	var applyerTgRule []interface{}
	for _, applyerTgItem := range applyerTg {
		applyerTgRule = append(applyerTgRule, applyerTgItem)
	}

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "requestAccepted", applyerTgRule)
	if err != nil {
		return nil, err
	}
	return &Leg10nRequestAcceptedIterator{contract: _Leg10n.contract, event: "requestAccepted", logs: logs, sub: sub}, nil
}

// WatchRequestAccepted is a free log subscription operation binding the contract event 0x1eae2e277962887ad58eeeadb2b3aa51b47e4a8f2caabf46938991ab7d9e29e2.
//
// Solidity: event requestAccepted(int64 indexed applyerTg, address user_address, address parent_address)
func (_Leg10n *Leg10nFilterer) WatchRequestAccepted(opts *bind.WatchOpts, sink chan<- *Leg10nRequestAccepted, applyerTg []int64) (event.Subscription, error) {

	var applyerTgRule []interface{}
	for _, applyerTgItem := range applyerTg {
		applyerTgRule = append(applyerTgRule, applyerTgItem)
	}

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "requestAccepted", applyerTgRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nRequestAccepted)
				if err := _Leg10n.contract.UnpackLog(event, "requestAccepted", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRequestAccepted is a log parse operation binding the contract event 0x1eae2e277962887ad58eeeadb2b3aa51b47e4a8f2caabf46938991ab7d9e29e2.
//
// Solidity: event requestAccepted(int64 indexed applyerTg, address user_address, address parent_address)
func (_Leg10n *Leg10nFilterer) ParseRequestAccepted(log types.Log) (*Leg10nRequestAccepted, error) {
	event := new(Leg10nRequestAccepted)
	if err := _Leg10n.contract.UnpackLog(event, "requestAccepted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// Leg10nRequestDeniedIterator is returned from FilterRequestDenied and is used to iterate over the raw logs and unpacked data for RequestDenied events raised by the Leg10n contract.
type Leg10nRequestDeniedIterator struct {
	Event *Leg10nRequestDenied // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *Leg10nRequestDeniedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(Leg10nRequestDenied)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(Leg10nRequestDenied)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *Leg10nRequestDeniedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *Leg10nRequestDeniedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// Leg10nRequestDenied represents a RequestDenied event raised by the Leg10n contract.
type Leg10nRequestDenied struct {
	ApplyerTg int64
	Wallet    common.Address
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterRequestDenied is a free log retrieval operation binding the contract event 0x7f25a59d906bf9fb883c74ad54e4b0e924fb0326f2f946caf2875485585d0fbf.
//
// Solidity: event requestDenied(int64 applyerTg, address wallet)
func (_Leg10n *Leg10nFilterer) FilterRequestDenied(opts *bind.FilterOpts) (*Leg10nRequestDeniedIterator, error) {

	logs, sub, err := _Leg10n.contract.FilterLogs(opts, "requestDenied")
	if err != nil {
		return nil, err
	}
	return &Leg10nRequestDeniedIterator{contract: _Leg10n.contract, event: "requestDenied", logs: logs, sub: sub}, nil
}

// WatchRequestDenied is a free log subscription operation binding the contract event 0x7f25a59d906bf9fb883c74ad54e4b0e924fb0326f2f946caf2875485585d0fbf.
//
// Solidity: event requestDenied(int64 applyerTg, address wallet)
func (_Leg10n *Leg10nFilterer) WatchRequestDenied(opts *bind.WatchOpts, sink chan<- *Leg10nRequestDenied) (event.Subscription, error) {

	logs, sub, err := _Leg10n.contract.WatchLogs(opts, "requestDenied")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(Leg10nRequestDenied)
				if err := _Leg10n.contract.UnpackLog(event, "requestDenied", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRequestDenied is a log parse operation binding the contract event 0x7f25a59d906bf9fb883c74ad54e4b0e924fb0326f2f946caf2875485585d0fbf.
//
// Solidity: event requestDenied(int64 applyerTg, address wallet)
func (_Leg10n *Leg10nFilterer) ParseRequestDenied(log types.Log) (*Leg10nRequestDenied, error) {
	event := new(Leg10nRequestDenied)
	if err := _Leg10n.contract.UnpackLog(event, "requestDenied", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
