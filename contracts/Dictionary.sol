//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Storage contract for dictionary
contract Dictionary {




    
    string[] public Capitals =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q", "R","S","T","U","V","W","X","Y","Z"]; // index starts with 0
    uint public range_max = Capitals.length;
    mapping (string => uint) public Cusror; 




    constructor() {
        fillCursor;
    }

    function fillCursor() internal {
        for (uint i = 0; i < Capitals.length; i++) {
            Cusror[Capitals[i]] = i;
        }
    }


    function GetCursorByCapital(string memory input) public view returns (uint) {
       uint c = Cusror[input];
       return c;
    }

    function GetCapitalByCursor(uint input) public view returns (string memory) {
        string memory c = Capitals[input];
        return c;
    }

    


}