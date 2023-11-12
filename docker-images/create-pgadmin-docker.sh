docker pull dpage/pgadmin4

docker run \
--name pgadmin4-dev \
-e PGADMIN_DEFAULT_EMAIL='test@test.com' \
-e PGADMIN_DEFAULT_PASSWORD='test1234' \
-d \
-p 8080:80 \
dpage/pgadmin4