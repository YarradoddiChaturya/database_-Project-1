const searchType = document.getElementById("searchType");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const searchButton = document.getElementById("searchButton");
const resultsBody = document.querySelector("#results tbody");

// Configure inputs for each search type
const searchOptions = {
    name: ["First name", "Last name"],
    userid: ["Username", null],
    salary: ["Minimum salary", "Maximum salary"],
    age: ["Minimum age", "Maximum age"],
    after: ["Username", null],
    never: [null, null],
    same: ["Username", null],
    today: [null, null]
};

// Show only the inputs needed for each search
function updateSearchInputs() {
    const [first, second] = searchOptions[searchType.value];

    value1.style.display = first ? "block" : "none";
    value2.style.display = second ? "block" : "none";

    value1.placeholder = first || "";
    value2.placeholder = second || "";

    value1.value = "";
    value2.value = "";
}

// Display a message in the results table
function showMessage(message) {
    resultsBody.replaceChildren();

    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 7;
    cell.textContent = message;

    row.appendChild(cell);
    resultsBody.appendChild(row);
}

// Send the search request to the backend
async function searchUsers() {
    const type = searchType.value;

    const firstValue = value1.value.trim();
    const secondValue = value2.value.trim();

    // Validate required inputs
    if (type === "name" && !firstValue && !secondValue) {
        showMessage("Enter a first name or last name.");
        return;
    }

    if (["userid", "after", "same"].includes(type) && !firstValue) {
        showMessage("Please enter a username.");
        return;
    }

    if (["salary", "age"].includes(type)) {
        if (firstValue === "" || secondValue === "") {
            showMessage("Enter both minimum and maximum values.");
            return;
        }

        const min = Number(firstValue);
        const max = Number(secondValue);

        if (
            !Number.isFinite(min) ||
            !Number.isFinite(max) ||
            min < 0 ||
            min > max ||
            (type === "age" &&
                (!Number.isInteger(min) ||
                 !Number.isInteger(max)))
        ) {
            showMessage("Please enter a valid range.");
            return;
        }
    }

    const params = new URLSearchParams({
        type: type,
        value1: firstValue,
        value2: secondValue
    });

    showMessage("Searching...");

    searchButton.disabled = true;

    try {
        // Corrected URL using JavaScript backticks
        const response = await fetch(
    		"http://localhost:5050/api/search?" + params.toString(),
    		{
        		method: "GET",
        		credentials: "include"
    		}
	);
        const users = await response.json();

        if (!response.ok) {
            throw new Error(users.message || "Search failed.");
        }

        resultsBody.replaceChildren();

        if (!Array.isArray(users)) {
            throw new Error("Invalid response from server.");
        }

        if (users.length === 0) {
            showMessage("No matching users found.");
            return;
        }

        // Display matching users in the results table
        users.forEach(user => {
            const row = document.createElement("tr");

            const values = [
                user.username,
                user.firstname,
                user.lastname,
                user.salary,
                user.age,
                user.registerday,
                user.signintime ?? "Never"
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            resultsBody.appendChild(row);
        });

    } catch (error) {
        console.error("Search error:", error);
        showMessage(error.message);
    } finally {
        searchButton.disabled = false;
    }
}

// Handle dropdown and button events
searchType.addEventListener("change", updateSearchInputs);
searchButton.addEventListener("click", searchUsers);

// Initialize the search interface
updateSearchInputs();