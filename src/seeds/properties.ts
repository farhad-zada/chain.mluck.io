import { ethers } from "ethers";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("properties").del();

    // Inserts seed entries
    await knex("properties").insert([
        { address: ethers.Wallet.createRandom().address, name: "Property #1" },
        { address: ethers.Wallet.createRandom().address, name: "Property #2" },
        { address: ethers.Wallet.createRandom().address, name: "Property #3" },
    ]);
}
