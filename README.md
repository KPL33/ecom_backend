# <span style="color: yellow;">***E-Commerce Back End***</span>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</br>

## Overview
This simple command-line application allows users to look-up, create, edit and delete records for products and descriptive tags for those products within an inventory database.
</br>

## Application Set-Up
1) To get started, download this repo and in your terminal, from the root folder run... </br>
  • "npm i" (to install the "Node Package Module" itself) and then run these additional "npm i" commands...</br>
  • `mysql2`</br>
  • `sequelize`</br>
  • `express`</br>
  • `dotenv`</br>

2) Once the dependencies have been installed, use control-C or otherwise terminate operations and close this terminal.

3) You will see a ".env" file among your root files. Open it and fill in your log-on credentials between the '...' marks. Use 'root' for DB_USER, and your own mysql password for DB_PASSWORD.

4) Log-on using your mysql credentials, by entering `mysql -u root -p`. When prompted, enter your mysql password.

5) In the  same terminal, enter `SOURCE db/schema.sql;` 

6) With your schema sourced, open a new terminal from your root directory and run `npm run seed`, to populate the tables with example data, which can be utilized for testing the app.

7) With your database seeded, run `npm run start` in the same terminal that you used in step 6. You should see the message <span style="color: yellow;">***"App listening on port 3001!"***</span> in your terminal.

## Application Instructions
To interact with the database, open an API client (Insomnia or similar) and use this main route for all queries and commands: http://localhost:3001/api</br>
  • To retrieve data (send a `"GET"` query on) <span style="color: yellow;">**ALL**</span> Categories, Products or Tags, add either "/categories", "/products" or "/tags" as the endpoint of the above 'localhost' address, depending on the information you would like to see.</br>
  • Each listing in your data has been assigned a numerical ID. To retrieve info on only a <span style="color: yellow;">**SINGLE**</span> Category, Product or Tag, use the appropriate end point detailed in the previous instruction, followed by "/", followed by the numerical ID assigned to each item.</br>
  • Data will be returned to you as formatted JSON. To <span style="color: yellow;">**EDIT an existing entry**</span> (send a `"PUT"` query), use "/", followed by the numerical ID of the item you would like to edit. Be sure to include your edits in JSON format.</br>
  • No numerical endpoint is necessary to <span style="color: yellow;">**create a new entry**</span> (`"POST"`), but be sure to include your edits in JSON format.</br>
  • To <span style="color: yellow;">**REMOVE** (`"DELETE"`) **existing data**</span>, enter "/", followed by the id that was assigned to the item within the table from which you are deleting.</br>
  <span style="color: red;">***Please note: Deleted data cannot be retrieved.***</span>

</br>

## Static Screen-Captures of the Application
![mysql running in termial](./assets/example1.png)
##
![npm run seed entered in termial](./assets/example2.png)
##
![View routes through Insomnia](./assets/example3.png)
</br>

## Application Demo Video
https://drive.google.com/file/d/1l5TUZc51bzmmrVT6lPgIiYGUayHnvL7G/view

</br>

## Contributors To This Application
Kevin Lewis

</br>

# <span style="color: lightgreen;">***Thank you for using this App!***</span>

</br>

## Questions? Contact the Developer on GitHub... 
KPL33
## ...or via Email
kevinsname2003@yahoo.com