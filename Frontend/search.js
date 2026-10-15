const searchType = document.getElementById("searchType");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const searchButton = document.getElementById("searchButton");
const resultsBody = document.querySelector("#results tbody");

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

function updateSearchInputs() {
    const [first, second] = searchOptions[searchType.value];

    value1.style.display = first ? "block" : "none";
    value2.style.display = second ? "block" : "none";

    value1.placeholder = first || "";
    value2.placeholder = second || "";

    value1.value = "";
    value2.value = "";
}

function searchUsers() {
    const type = searchType.value;

    const searchData = {
        type: type,
        value1: value1.value.trim(),
        value2: value2.value.trim()
    };

    console.log("Search request:", searchData);

    resultsBody.replaceChildren();

    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 7;
    cell.textContent =
        "Search request prepared. Database integration is next.";

    row.appendChild(cell);
    resultsBody.appendChild(row);
}

searchType.addEventListener("change", updateSearchInputs);
searchButton.addEventListener("click", searchUsers);

updateSearchInputs();