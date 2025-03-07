import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("property_daily_return", function (table) {
        table.increments("id").primary();
        table.string("property").index();
        table.foreign("property").references("properties.address");
        table.decimal("daily_return", 65, 0).notNullable().unsigned();
        table.enum("status", ["active", "deactive"]).index();
        table.timestamps(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("property_daily_returns");
}
