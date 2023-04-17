//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./../Leg10n.sol";

contract Leg10nMock is Leg10n {
    constructor(
        address turing_,
        address admin_,
        string memory tgid_,
        string memory public_key_,
        string memory plain_id
    ) Leg10n(turing_, admin_, tgid_, public_key_,plain_id) {}

    //open intrernal functions

    function updateAddress(
        string memory tgId,
        address userAddress,
        string memory code_name_,
        string memory parent_name,
        string memory plain_id
    ) external {
        super._updateAddress(tgId, userAddress, code_name_, parent_name,plain_id);
    }

    function devInitAdmin(
        address admin_,
        string memory tgid_,
        string memory public_key_,
        string memory plain_id
    ) external {
        super._devInitAdmin(admin_, tgid_, public_key_,plain_id);
    }

    function deleteUser(address user_address) public {
        super.DeleteUser(user_address);
    }
}
