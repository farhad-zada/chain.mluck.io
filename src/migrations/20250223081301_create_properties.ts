import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("properties", function (table) {
        table.string("address").unique().primary();
        table.string("name").unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("properties");
}
