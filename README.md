


# INSTALL
1. Go to Server "ssh something@something.. "
2. Install postgres
3. Create database "crm-radios"
4. Upload tables and seed them with tables in doc directory
5. Create Folder for project "mkdir crm && cd crm"
6. Download repository "git clone https://github.com/juanssal/crm-api.git"
7. Go to crm-api directory and run the app "cd crm-api && node server.js"
8. Test and if all is Ok then stop the process and run it with pm

# DETAILED EXPLANATION

## DATA
We will be using a Postgres Database for this project.
## POSTGRES INSTALLATION

## DATABASE SETUP
```
sudo -i -u postgres
psql
CREATE USER admin WITH LOGIN ENCRYPTED PASSWORD 'marconi3!';
CREATE DATABASE crm_radios OWNER admin;
```

## CREATING TABLES FOR PROJECT
Data seed files and info are in doc file
* createTables: For all the necessary tables
* seedTables: To feed tables with sample data or actual data

Example for feeding tables from initialization files in this project:
```
sudo -i -u postgres
sudo -i -u postgres
psql -h localhost -U admin -d crm_radios -f "/Users/mac/databases/init.sql"
```


## ACCESSING DATABASE FROM CMD LINE
```
sudo -i -u postgres
psql -d crm_radios
```

## MANAGING DATA FROM APP
### PG CLIENT
Installing the module:
```
npm i pg
```

Importing it:
```
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "crm_radios",
  password: "1234",
  port: 5432,
});
```


### QUERYING


