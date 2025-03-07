import type { Knex, SchemaBuilder} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("promo_codes", function (builder: Knex.CreateTableBuilder): SchemaBuilder {
        return builder.string("word", 100);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("promo_codes");
}

