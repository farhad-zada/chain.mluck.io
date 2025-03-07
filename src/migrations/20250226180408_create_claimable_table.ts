import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("claimable", function (table) {
        table.string("holder").index();
        table.string("property").index();
        table.string("slot").index();
        table.foreign("property").references("properties.address");
        table.decimal("claimable", 65, 0).notNullable().unsigned();
        table.timestamps(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("claimable");
}
