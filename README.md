# ORG-STRUCT

## Create database
psql -h localhost -d postgres -U postgres  
create role org_struct noinherit login password '1';  
create database org_struct owner org_struct encoding 'utf8';

## Create .env
POSTGRES_HOSTNAME=localhost  
POSTGRES_DATABASE=org_struct  
POSTGRES_PORT=5432  
POSTGRES_USERNAME=org_struct  
POSTGRES_PASSWORD=1

## Run migration
yarn build:server  
yarn migration:run  

## Run
yarn dev  
