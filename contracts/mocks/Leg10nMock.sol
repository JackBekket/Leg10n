//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./../Leg10n.sol";

contract Leg10nMock is Leg10n {
    constructor(
        address turing_,
        address admin_,
        int64 tgid_,
        string memory public_key_
    ) Leg10n(turing_, admin_, tgid_, public_key_) {}

    //open intrernal functions

    function updateAddress(
        int64 tgId,
        address userAddress,
        string memory code_name_,
        string memory parent_name
    ) external {
        super._updateAddress(tgId, userAddress, code_name_, parent_name);
    }

    function devInitAdmin(
        address admin_,
        int64 tgid_,
        string memory public_key_
    ) external {
        super._devInitAdmin(admin_, tgid_, public_key_);
    }
}
