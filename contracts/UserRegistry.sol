// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistry{
    struct User {
        uint256 id;
        string name;
        bool isRegistered;
    }

    mapping(address => User) private users;

    function register(uint256 id,string calldata name ) external {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender] = User(id, name, true);
    }

    function getUser(address user) external view returns (uint256, string memory, bool){
        User storage u = users[user];
        return (u.id, u.name, u.isRegistered);
    }

    function getMyUser() external view returns (uint256, string memory, bool) {
        return this.getUser(msg.sender);
    }

    function updateName(string calldata newName) external {
        require(users[msg.sender].isRegistered, "Not registered");
        users[msg.sender].name = newName;
    }


 }