const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserRegistry", function () {

    let registry;
    let owner;
    let alice;

    beforeEach(async function () {
        [owner, alice] = await ethers.getSigners();

        const UserRegistry = await ethers.getContractFactory("UserRegistry");
        registry = await UserRegistry.deploy();
        await registry.waitForDeployment();
    });

    it("Should register user correctly", async function () {
        await registry.register(1, "Milos");

        const user = await registry.getUser(owner.address);

        expect(user[0]).to.equal(1);
        expect(user[1]).to.equal("Milos");
        expect(user[2]).to.equal(true);
    });

    it("Should revert updateName for unregistered user", async function () {
        await expect(
            registry.connect(alice).updateName("Hacker")
        ).to.be.revertedWith("Not registered");
    });

});
