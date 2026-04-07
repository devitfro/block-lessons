// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MediaStore {

    struct Media {
        uint id;
        string url;
        address owner;
        uint createdAt;
        bool isDeleted;
    }

    Media[] public mediaList;

    // CREATE
    function addMedia(string memory _url) public {
        mediaList.push(Media(
            mediaList.length,
            _url,
            msg.sender,
            block.timestamp,
            false
        ));
    }

    // READ
    function getMedia() public view returns (Media[] memory) {
        return mediaList;
    }

    // DELETE (через флаг)
    function deleteMedia(uint _id) public {
        require(mediaList[_id].owner == msg.sender, "Not owner");

        mediaList[_id].isDeleted = true;
    }
}