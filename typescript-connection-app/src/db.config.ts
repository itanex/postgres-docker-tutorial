
/**
 * Connection information for Postgres,
 * sequelize syntax
 */
export const config = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "test1234",
    DB: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

/** 
 * which sequelize dialect to use 
 */
export const dialect = "postgres";
