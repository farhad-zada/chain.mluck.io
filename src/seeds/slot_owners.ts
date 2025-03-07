import { Knex } from "knex";
import { ethers } from "ethers";

export async function seed(knex: Knex): Promise<void> {
    let table = knex("slot_owners");
    // Deletes ALL existing entries
    await table.del();
    const days = 15;
    const currentDate = new Date();

    const properties = (await knex.select("address").from("properties"));

    let owners = [
        ethers.Wallet.createRandom(),
        ethers.Wallet.createRandom(),
        ethers.Wallet.createRandom(),
        ethers.Wallet.createRandom(),
        ethers.Wallet.createRandom(),
    ];
    let data: object[] = [];
    for (let day = 15; day > 0; day--) {
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDay() - day);
        for (let i = 1; i < 30; i++) {
            let record = {
                property: properties[i % properties.length].address,
                slot_id: i,
                holder: owners[i % owners.length].address,
                date,
            };
            data.push(record);
        }
    }

    // Inserts seed entries
    await table.insert(data);
}
