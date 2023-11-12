# postgres-docker-tutorial

The goal of this tutorial is to demonstrate hosting two docker images each with a single application contained within them. These will be the Postgres database and the PGAdmin4 management software.

In the end we will have two docker containers, one with Postgres , the other with PGAdmin.

## Requirements

- Docker CLI
- Docker Desktop (optional; but recommended)

## Setup Postgres

We will need to first pull the images locally, and while there are many Postgres images, we will be using the default image `postgres`. If you have this you can skip to the configuration setup.

```
docker pull postgres
```

### Create and Configure `postgres` container

1. `--name` defines the name of the container, while this is technically optional, it is recommended to give your containers useful names
2. `-e` defines the environmental variables, in the case of Postgres we need to give the default account a password
3. `-d` since we are executing this in a terminal, we should run all out commands in disconnect mode to prevent the terminal being bound to the container run state.
4. `-p` defines the internal and external ports that will be set up so that we can tunnel into the docker container and connect to the database
5. `-v` this will set up a volume mapped to the specified local, external to the container (optional, but very relevant for future scenarios)
6. the last parameter is the image name to create the container from, in this case the `postgres` image

```
docker run \
-- name pgsql-dev \
-e POSTGRES_PASSWORD=test1234 \
-d \
-v ${PWD}/postgres-tutorial:/var/lib/postgresql/data \
-p 5432:5432 \
postgres \
```

### Validating the container

As with any software you should validate and test, here we will manually connect to the container and then to the database to validate that we set everything up as expected.

```
docker exec -it pqsql-dev bash
```

You will then be connected to the docker container and presented with a bash interface.

```
docker exec -it pgsql-dev bash
root@7c65ed15f1de:/#
```

Once you are connected to the bash interface, connect to the Postgres database to validate that it accepts and authenticates the user.

```
psql -h localhost -U postgres
```

```
root@7c65ed15f1de:/# psql -h localhost -U postgres
psql (16.0 (Debian 16.0-1.pgdg120+1))
Type "help" for help.

postgres=#
```

If you are seeing this prompt, then everything is set up correctly and running.

### Getting the IP Address for connections

We will need to have the IP Address to connect to the container. This can be found in the container's details through the `inspect` command under the network section.

```
docker inspect pgsql-dev
```

> Note: You can also inspect through [Docker Desktop](https://docs.docker.com/desktop/use-desktop/container/#inspect-a-container)

Look for the `Networks` section in the output of this command.

```
"Networks": {
   "bridge": {
      ...
      "Gateway": "172.17.0.1",
      "IPAddress": "172.17.0.2",
      ...
   }
}
```

## Setup `pgadmin4`

We will need to first pull the images locally, and while there are many PGAdmin4 images, we will be using the default image `dpage/pgadmin4`. If you have this you can skip to the configuration setp.

```
docker pull dpage/pgadmin4
```

### Create and Configure `pgadmin` container

1. `--name` defines the name of the container, while this is technically optional, it is recommended to give your containers useful names
2. `-e` defines the environmental variables, PGAdmin4 requires a few variables. In this tutorial, we will use the admin username/email and password as they are used to authenticate into the administration interface
3. `-d` since we are executing this in a terminal, we should run all out commands in disconnect mode to prevent the terminal being bound to the container run state.
4. `-p` defines the internal and external ports that will be set up so that we can tunnel into the docker container and connect to the database
5. the last parameter is the image name to create the container from, in this case the `dpage/pgadmin4` image

```docker run \
--name pgadmin4-dev \
-e PGADMIN_DEFAULT_EMAIL='test@test.com' \
-e PGADMIN_DEFAULT_PASSWORD='test1234' \
-d \
-p 8080:80 \
dpage/pgadmin4
```

### Validating the container

As with any software you should validate and test. With the container running, we can now connect to PGAdmin4 through its web interface.

1. Open your preferred browser
2. Enter the `Email` and `Password` from above to Authenticate.

If you are authenticated, then everything is properly set up and ready to go!

## Connecting to the db container from PGAdmin4

1. Open your preferred browser
2. Enter the `Email` and `Password` from above to Authenticate.
3. Add a new server, by clicking the "Add New Server" quick link presented in the window.
   - Optionally, you can right click on the "Servers" root in the left panel and select "register" > "server"
4. On the "General" tab give the server a name
5. Under the "Connection" tab complete the following
   > NOTE: Host address can be found by inspecting the postgres container
   - Host Name/Address: `172.17.0.2`
     > NOTE: These settings are what you would have used in the commands above
   - Port: `5432`
   - Maintenance db: `postgres`
   - Username: `postgres`
   - Password: `test1234`

If PGAdmin4 accepts the save attempt, you will then be connected to the database instance and you are ready for more fun in the world of Postgres SQL!

## Conclusion

We have seen how to pull docker images, and created two containers each for `postgres` and `pgadmin4`. We have been able to connect to the containers individually and in the end we also connected to the Postgres database in its container from the PGAdmin4 Management tool inside its container.

## References/Credit

1. [Getting started with PostgreSQL on Docker](https://www.sqlshack.com/getting-started-with-postgresql-on-docker/)
2. [Docker](https://www.docker.com/)
3. [Docker run reference](https://docs.docker.com/engine/reference/run/)

## Troubleshooting

### Docker container is stopped when created

Usually this means that the container had a fault, check the logs of the container.

```
docker logs pgsql-dev
```

> Note: You can also check logs through [Docker Desktop](https://docs.docker.com/desktop/use-desktop/container/#inspect-a-container)

### Cannot connect to PGAdmin4

If you are having issues authenticating to PGAdmin4

1. The email value may be invalid, examples like `user@domain.local` will not work. [PGAdmin FAQ](https://www.pgadmin.org/faq/)
