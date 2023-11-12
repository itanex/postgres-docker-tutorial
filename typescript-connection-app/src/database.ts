import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "./db.config";

/**
 * Database interface class, connects to the db and reports the result
 */
class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
    }

    /**
     * internal method encapsulates configuring 
     * and connecting to the configured database
     */
    private async connectToDatabase() {
        this.sequelize = new Sequelize({
            database: config.DB,
            username: config.USER,
            password: config.PASSWORD,
            host: config.HOST,
            dialect: dialect,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            },
            models: []
        });

        await this.sequelize
            .authenticate()
            .then(() => {
                console.log("PGTSLog::Connection has been established successfully.");
            })
            .catch((err) => {
                console.error("PGTSLog::Unable to connect to Database:", err);
            })
    }
}

export default Database;