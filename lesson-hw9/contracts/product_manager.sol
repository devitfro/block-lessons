pragma solidity ^0.8.0;

contract ProductManager {

    struct Product {
        string name;
        string description;
        uint price;
        address creator;
        uint timestamp;
        string image;
    }

    Product[] public products;

    function createProduct(
        string memory _name,
        string memory _description,
        uint _price,
        string memory _image
    ) public {
        products.push(Product(
            _name,
            _description,
            _price,
            msg.sender,
            block.timestamp,
            _image
        ));
    }

    function getProducts() public view returns (Product[] memory) {
        return products;
    }
}