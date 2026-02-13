# UserRegistry – Struct Storage (Solidity)

This project demonstrates how protocols store structured state using `mapping(address => struct)`.

## Contract Overview

UserRegistry stores user data in a struct:

- `id` – unique identifier
- `name` – user name
- `isRegistered` – invariant flag

Storage model:

mapping(address => User) private users;

Each address maps deterministically to a storage slot via keccak256.

## Invariants enforced

- User can register only once
- Unregistered users cannot modify state
- updateName modifies only the name field
- Storage remains isolated per address

## Tests

Hardhat tests verify:

- Correct state transition on register()
- Revert when unregistered user calls updateName()
- Storage values match expected struct fields

Tests use beforeEach to guarantee isolation and deterministic execution.

## Tech Stack

- Solidity ^0.8.20
- Hardhat
- Chai / Ethers.js

## Repository purpose

Educational implementation focused on understanding:

- struct storage layout
- mapping(address => struct)
- storage vs memory
- state transition invariants
- smart contract testing