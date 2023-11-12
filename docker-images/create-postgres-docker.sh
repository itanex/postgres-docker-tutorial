docker pull postgres

docker run \
-- name pgsql-dev \
-e POSTGRES_PASSWORD=test1234 \
-d \
-p 5432:5432 \
postgres