import { knex } from "knex"

export const db = knex ({
    client: "sqlite3",
    connection: {
        filename: "./src/database/labecommerce.db", //localização do arquivo .db
    },
    useNullAsDefault: true,  //definirá NULL quando encontrar valores undefined
    pool: {
        min: 0, //número de conexões, esses valores são os recomendados para sqlite3
        max: 1,
        afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        } //configurando o knex para forçar o check das constrainsts FK
    }
})