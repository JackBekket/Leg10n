//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Storage contract for dictionary
contract Dictionary {
    // TODO change to privates

    string[] public Capitals =["0","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q", "R","S","T","U","V","W","X","Y","Z"]; // index starts with 0
    uint public range_max = Capitals.length;
    mapping (string => uint) public Cusror; 

    constructor() {
        fillCursor();
    }

    function fillCursor() internal {
        for (uint i = 0; i < Capitals.length; i++) {
            Cusror[Capitals[i]] = i;
        }
    }

    function GetCursorByCapital(
        string memory input
    ) public view returns (uint) {
        uint c = Cusror[input];
        return c;
    }

    function GetCapitalByCursor(
        uint input
    ) public view returns (string memory) {
        string memory c = Capitals[input];
        return c;
    }

    function Substring(
        string memory str,
        uint startIndex,
        uint endIndex
    ) public pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    function GetCapitalFromString(
        string memory code_name
    ) public pure returns (string memory) {
        string memory capital = Substring(code_name, 0, 1);
        return capital;
    }

    /*
     *     1. get capital from word
     *     2. ???
     *     3. PROFIT!
     */
    function checkDictionaryTree(
        string memory requested_name,
        string memory parent_name
    ) public view returns (bool) {
        string memory r_cap = GetCapitalFromString(requested_name);
        string memory p_cap = GetCapitalFromString(parent_name);
        uint r_ind = GetCursorByCapital(r_cap);
        uint p_ind = GetCursorByCapital(p_cap);
        //uint delta = uint(1);
        uint condition = p_ind + 1;
        require(
            r_ind == condition,
            "Children_name != parent_name+1, replace capital of your codename +1"
        );
        return true;
    }
}
