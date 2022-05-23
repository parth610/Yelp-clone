# Sharate-it

This is the repository for Sharate it app which is solely based on the idea of Yelp.

# Technologies Used
## Technologies Used
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React" width="50"/><img src="https://miro.medium.com/max/312/1*SRL22ADht1NU4LXUeU4YVg.png" alt="Redux" width="50"/><img src="https://pngset.com/images/node-js-nodejs-number-symbol-text-recycling-symbol-transparent-png-1383018.png" alt="NodeJS" width="50"/><img src="https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png" alt="PostgreSQL" width="50"/><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/1200px-Python.svg.png" alt="Python" width="50"/><img src="https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png" alt="Javascript" width="50"/><img src="https://lms.techxyte.com/assets/technologies-logos/274/3.png" alt="SQLAlchemy" width="50"/><img src="https://sooftware.io/static/13c286ed78e56cb5a139e269d8eaea5f/fe339/flask.png" alt="Flask" width="50"/><img src="https://cdn-icons-png.flaticon.com/512/732/732212.png" alt="HTML" width="50"/><img src="https://cdn4.iconfinder.com/data/icons/iconsimple-programming/512/css-512.png" alt="CSS" width="50"/>

## Getting started
- Clone this repository (only this branch)

   ```bash
   git clone https://github.com/parth610/Yelp-clone.git
   ```

- Create a database and a user in psql, follow the following steps in your terminal(you can name your own user and database name):
```
1. psql
2. CREATE UESR sharate_user WITH PASSWORD '<password>'
3. CREATE DATABASE sharate_db WITH OWNER 'sharate_user'
```
- In the root directory install all our python dependencies by running the following command:
```
 pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
 ```
- After isntalling the dependencies, you will be prompted to enter the virtual enviornment with:
```
pipenv shell
```
- Create a migration files that will allow creation of tables for the database created above
```
flask db migrate
flask db upgrade
```
- Check postbird to view whether or not database has been updated properly (optional)
- Seed database with:
```
flask seed all
```
- Start the backend server with:
```
flask run
```
- Next `cd` into the react-app and run the following commands to install the npm dependencies:
```
npm install
```
- Start the app, it will automatically take you to `http://localhost:3000, with the following command:
```
npm start
```

