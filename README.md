# Masquerade
Allows users to see information on wizards, any incidents involving them and the locations of the incidents.

# Installation
1. Run `npm install`
2. Setup an external postgrlsql database (e.g. elephantsql).
3. Create a .env file with the following:
```
PORT = {port_number}
DB_URL = {database_url}
```
replacing the {port_number} with the port you want to use and {database_url} with the url of your external database.
4. Run `npm run dev` to start the server

GET routes: "/", "/wizard", "/wizard/:id", "/location", "/location/:id", "/incident", "/incident/:id"
POST routes: "/wizard", "/location", "/incident-log"
