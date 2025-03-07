import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("claims_slots", function (table) {
        table.integer("claim_id").unsigned().index();
        table.string("property").index();

        table.foreign("claim_id").references("claims.id");
        table.foreign("property").references("properties.address");
        
        table.string("slot_id").index();
        table.timestamps(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("claims_slots");
}
