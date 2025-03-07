### MIGRATIONS ORDER

-   `20250220092417_create_promo_codes_table.ts`
-   `20250223081301_create_properties.ts`
-   `20250223060134_create_slot_owners_daily_record.ts`
-   `20250223100223_create_claims_table.ts`
-   `20250223100912_create_claims_slots_table.ts`
-   `20250223104253_create_property_daily_return_table.ts`
-   `20250226180408_create_claimable_table.ts`


#### Commands
```bash
npx knex migrate:up 20250220092417_create_promo_codes_table.ts --env production
npx knex migrate:up 20250223081301_create_properties.ts --env production
npx knex migrate:up 20250226185606_slot_owners.ts --env production
npx knex migrate:up 20250223100223_create_claims_table.ts --env production
npx knex migrate:up 20250223100912_create_claims_slots_table.ts --env production
npx knex migrate:up 20250223104253_create_property_daily_return_table.ts --env production
npx knex migrate:up 20250226180408_create_claimable_table.ts --env production
``` 