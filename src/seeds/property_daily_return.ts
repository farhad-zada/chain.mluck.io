import { ethers } from "ethers";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("property_daily_return").del();

    const properties = await knex("properties").select("address");
    const propertyDailyReturns = properties.map((property) => ({
        property: property.address,
        daily_return: ethers.parseEther("0.01").toString(),
        status: "active",
    }));
    // Inserts seed entries
    await knex("property_daily_return").insert(propertyDailyReturns);
}
