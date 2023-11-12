# Typescript Connection App

This application is designed to use the `sequelize` library and connect to the database as setup in the tutorial. It validates that the basic needs of Postgres and the Sequelize library are established to allow a successful connection.

> Note: This does not read any data out of the database, nor does it look for any other items from the database. It just connects, runs sequelize validation (library specific) and exits.

## Configuration

The [db.config.ts](./src/db.config.ts) sets up the values needed to connect to the postgres database in the container.

```
HOST: "localhost",
USER: "postgres",
PASSWORD: "test1234",
DB: "postgres",
```

The `Host` value is relative to the application and docker itself so that docker will be able to route the request into the appropriate container. While not ideal, it is the basic setup. There are more complex scenarios, which are not part of this tutorial.

The `User`/`Password` values are the user being authenticated. If you have been following along, this is the default user, if you have set up a different user, the value will be different.

The `db` value represents the database that is being connected to. `postgres` is the default database that is available, change this if you created your own database.

## Running the application

1. Run `npm init` to install the dependency libraries.
2. Run `npm start` to execute the application.

The result of successfully running the application is the following output:

```
$ npm start

> ts-pg-tutorial@1.0.0 start
> ts-node src\index.ts

Executing (default): SELECT 1+1 AS result
PGTSLog::Connection has been established successfully.
```
