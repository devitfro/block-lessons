pragma solidity > 0.8.2 < 0.9.0;

contract Counter {
  uint value;

  function set_value(uint _value) public {
    value = _value;
  }

  function get_value() public view returns (uint) {
    return value;
  }
}