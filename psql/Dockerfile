FROM postgres:latest
COPY ./migration.sql /docker-entrypoint-initdb.d/migration.sql
COPY ./seeds.sql /docker-entrypoint-initdb.d/seeds.sql

