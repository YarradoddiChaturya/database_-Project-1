
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);

        const user = {
            username: formData.get("username"),
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            salary: Number(formData.get("salary")),
            age: Number(formData.get("age")),
            password: formData.get("password")
        };

        const message = document.getElementById("message");

        try {
            const response = await fetch(
                "http://localhost:5050/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(user)
                }
            );

            const result = await response.json();
            message.textContent = result.message;

            if (response.ok) {
                registerForm.reset();
            }

        } catch (error) {
            message.textContent = "Cannot connect to backend.";
        }
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const message = document.getElementById("message");

        const credentials = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        message.textContent = "Signing in...";

        try {
            const response = await fetch(
                "http://localhost:5050/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(credentials)
                }
            );

            const result = await response.json();
            message.textContent = result.message;

            if (response.ok) {
                message.style.color = "green";
                loginForm.reset();
            } else {
                message.style.color = "red";
            }
        } catch (error) {
            message.style.color = "red";
            message.textContent = "Unable to connect to server.";
        }
    });
}

