import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("claims", function (table) {
        table.increments("id").primary();
        table.string("holder").index();
        table.date("until").index();
        table.enum("status", ["pending", "confirmed", "rejected"]);
        table.text("reject_reason");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("claims");
}
