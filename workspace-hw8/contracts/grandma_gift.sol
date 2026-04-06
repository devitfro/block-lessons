// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GrandmaGift {

    address public grandma;

    address[] public grandchildren;

    mapping(address => uint) public birthdays;
    mapping(address => bool) public received;

    uint public giftAmount;

    constructor(
        address[] memory _grandchildren,
        uint[] memory _birthdays
    ) payable {
        require(_grandchildren.length == _birthdays.length, "Mismatch");

        grandma = msg.sender;
        grandchildren = _grandchildren;

        for (uint i = 0; i < _grandchildren.length; i++) {
            birthdays[_grandchildren[i]] = _birthdays[i];
        }

        // делим ETH на всех
        giftAmount = msg.value / _grandchildren.length;
    }

    function withdraw() public {
        require(birthdays[msg.sender] != 0, "Not a grandchild");
        require(!received[msg.sender], "Already received");

        // можно в день рождения И ПОСЛЕ
        require(block.timestamp >= birthdays[msg.sender], "Too early");

        received[msg.sender] = true;

        payable(msg.sender).transfer(giftAmount);
    }

    function getGrandchildren() public view returns (address[] memory) {
        return grandchildren;
    }
}