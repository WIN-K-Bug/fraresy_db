document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            document.getElementById("login-section").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            console.log("Login successful! Redirecting...");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Invalid login credentials");
    }
});

document.getElementById("show-login").addEventListener("click", function() {
    document.getElementById("login-section").style.display = "block";
});