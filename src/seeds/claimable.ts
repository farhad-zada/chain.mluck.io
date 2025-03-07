import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("claimable").del();

    const rows = await knex
        .select("so.holder")
        .select("so.property")
        .select("so.slot_id as slot")
        .sum("pdr.daily_return as claimable")
        .from("slot_owners as so")
        .join("property_daily_return as pdr", "so.property", "pdr.property")
        .groupBy(["so.holder", "so.property", "so.slot_id"]);
    // Inserts seed entries
    await knex("claimable").insert(rows);
}
