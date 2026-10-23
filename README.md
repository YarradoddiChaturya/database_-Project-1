\# User Management System

Database Project 1


\## Technologies

\- MySQL

\- Node.js

\- Express.js

\- HTML, CSS, JavaScript

\- XAMPP


\## Features

\- User registration

\- Secure user sign-in

\- Search users by name and username

\- Search users by salary and age

\- Search users by registration date

\- Search users who never signed in



\## Team

Two-member collaborative database project.

How to Compile, Run and Deploy:
- Open the XAMPP Control Panel.
- Start the following services:
    Apache
    MySQL
- Open phpMyAdmin in the browser: http://localhost/phpmyadmin
    In phpMyAdmin:
    - Click New
    - Create a database web_app
    - Import the SQL file: Database/schema.sql
- Go to the Backend folder and create a file named .env:
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=webb_app
    PORT=5050
    SESSION_SECRET=your_super_secret_key_1234567890
- Open a terminal and run: 
    - cd Backend
    - npm install
- From the Backend folder, run:
    - node app.js
- place project folder in: C:\xampp\htdocs\

Step1: Open: http://localhost/database-project/Frontend/register.html
        - fill in the required details and register.
Step2: Open: http://localhost/database-project/Frontend/login.html
        - Enter your username and password to sign in
Step3: Open: http://localhost/database-project/Frontend/search.html
        - Select a search option and enter required values
