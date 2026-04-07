// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PostStorage {

    struct Post {
        uint id;
        string title;
        string content;
        address author;
        uint createdAt;
        string imageUrl;
        uint likes;
    }

    Post[] public posts;

    mapping(uint => mapping(address => bool)) public liked;

    function createPost(
        string memory _title,
        string memory _content,
        string memory _imageUrl
    ) public {
        posts.push(Post(
            posts.length,
            _title,
            _content,
            msg.sender,
            block.timestamp,
            _imageUrl,
            0
        ));
    }

    function getPosts() public view returns (Post[] memory) {
        return posts;
    }

    function deletePost(uint _id) public {
        require(posts[_id].author == msg.sender, "Not author");
        delete posts[_id];
    }

    function toggleLike(uint _id) public {
        if (liked[_id][msg.sender]) {
            liked[_id][msg.sender] = false;
            posts[_id].likes--;
        } else {
            liked[_id][msg.sender] = true;
            posts[_id].likes++;
        }
    }

    function isLiked(uint _id, address user) public view returns (bool) {
        return liked[_id][user];
    }
}