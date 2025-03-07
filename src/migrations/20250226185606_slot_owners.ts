import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("slot_owners", (builder) => {
            builder.string("property").index();
            builder.foreign("property").references("properties.address");
            builder.bigint("slot_id");
            builder.string("holder").index();
            builder.date("date").index();
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("slot_owners");
}
