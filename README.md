## How to Install and Run the Project

### Step 1: Set up XAMPP

1. Open the XAMPP Control Panel.
2. Start **Apache** and **MySQL**.
3. Open phpMyAdmin: http://localhost/phpmyadmin

### Step 2: Set up the database

1. In phpMyAdmin, click **New**.
2. Create a database named `web_app`.
3. Select the `web_app` database.
4. Click **Import**.
5. Select `Database/schema.sql` from the project folder.
6. Click **Import** or **Go** to execute the SQL statements.

### Step 3: Configure the backend

Open the `Backend` folder and create a file named `.env`.

Add the following settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=web_app
PORT=5050
SESSION_SECRET=REPLACE_WITH_A_UNIQUE_RANDOM_SECRET
```

Replace the session secret with a securely generated random value. Adjust the database username, password, and port if your local MySQL configuration differs.

### Step 4: Install backend dependencies

Open Command Prompt and navigate to the Backend folder:

```bat
cd C:\xampp\htdocs\database_-Project-1\Backend
npm install
```

### Step 5: Start the backend

From the Backend folder, run:

```bat
node app.js
```

The Express server should start at:

http://localhost:5050

To test the backend connection, visit:

http://localhost:5050/api/health

**Note:** Opening `http://localhost:5050` directly may display `Cannot GET /`. This is expected because the Express backend provides API endpoints rather than a homepage.

### Step 6: Open the webpages

Make sure the project folder is located at:

```text
C:\xampp\htdocs\database_-Project-1
```

**Registration:**

http://localhost/database_-Project-1/Frontend/register.html

Enter the required details and register a new account.

**Login:**

http://localhost/database_-Project-1/Frontend/login.html

Enter the registered username and password to sign in.

**Search:**

http://localhost/database_-Project-1/Frontend/search.html

After logging in, select a search option, enter the required values, and click Search.

**Important:** The search API requires an authenticated login session. Searching without logging in returns an Unauthorized response.

### Step 7: Review the SQL queries

The `sql.txt` file contains the database schema and example SQL queries for the eight search operations.

The actual search functionality is implemented in `Backend/searchRoutes.js`.
