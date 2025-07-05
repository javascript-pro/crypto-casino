// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DiceGame {
    event Commit(address indexed player, bytes32 commitment);
    event Reveal(address indexed player, uint8 roll, string seed);

    struct Game {
        bytes32 commitment;
        bool revealed;
    }

    mapping(address => Game) public games;

    function commit(bytes32 _commitment) external {
        require(games[msg.sender].commitment == 0, "Already committed");
        games[msg.sender] = Game(_commitment, false);
        emit Commit(msg.sender, _commitment);
    }

    function reveal(string memory _seed) external {
        Game storage game = games[msg.sender];
        require(!game.revealed, "Already revealed");
        require(game.commitment == keccak256(abi.encodePacked(_seed)), "Invalid seed");

        game.revealed = true;
        uint8 roll = uint8(uint256(keccak256(abi.encodePacked(_seed))) % 6 + 1);
        emit Reveal(msg.sender, roll, _seed);
    }
}
