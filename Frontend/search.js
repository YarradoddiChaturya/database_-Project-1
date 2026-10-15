async function searchUsers() {
    const type = searchType.value;

    const params = new URLSearchParams({
        type: type,
        value1: value1.value.trim(),
        value2: value2.value.trim()
    });

    resultsBody.replaceChildren();

    try {
        const response = await fetch(
            "http://localhost:5050/api/search?${params}",
            { credentials: "include" }
        );

        const users = await response.json();

        if (!response.ok) {
            throw new Error(users.message || "Search failed.");
        }

        if (users.length === 0) {
            showMessage("No matching users found.");
            return;
        }

        users.forEach(user => {
            const row = document.createElement("tr");

            [
                user.username,
                user.firstname,
                user.lastname,
                user.salary,
                user.age,
                user.registerday,
                user.signintime ?? "Never"
            ].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            resultsBody.appendChild(row);
        });

    } catch (error) {
        showMessage(error.message);
    }
}

function showMessage(message) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 7;
    cell.textContent = message;

    row.appendChild(cell);
    resultsBody.appendChild(row);
}