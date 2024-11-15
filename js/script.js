// script.js


document.addEventListener('DOMContentLoaded', function() {
    const leftSide = document.getElementById("hero-left");
    const rightSide = document.getElementById("hero-right");
    const threshold = 50; // percentage threshold for transition

    const handleMove = (e) => {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        leftSide.style.width = `${newWidth}%`;
        rightSide.style.width = `${100 - newWidth}%`;

        // Adjust opacity of the dark overlay based on position
        const leftTitle = leftSide.querySelector('.hero-title');
        if (newWidth > threshold) {
            leftTitle.style.opacity = '1';
            leftSide.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else {
            leftTitle.style.opacity = '0.9';
            leftSide.style.backgroundColor = 'transparent';
        }
    };

    // Set initial state
    leftSide.style.width = '0%';
    rightSide.style.width = '100%';

    // Handle mouse movement
    document.onmousemove = (e) => handleMove(e);

    // Handle touch movement for mobile users
    document.ontouchmove = (e) => handleMove(e.touches[0]);
});

// Disable right-click on the entire document
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// Disable right-click specifically within iframes
window.addEventListener('load', function() {
    const iframe = document.querySelector('.scada-iframe'); // Correctly targeting iframe
    
    // Check if iframe exists before applying the event listener
    if (iframe) {
        iframe.onload = function() {
            iframe.contentWindow.document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            }, false);
        };
    }
});

// Define a dictionary of users and their SCADA pages
const users = {
    "PlantScada": {
        password: "pumproom122",
        redirectUrl: "scada1.html"
    },
    "BWTAGC": {
        password: "Ax8Fl4!9",
        redirectUrl: "scada2.html"
    },
    "FLOW": {
        password: "FLOWTEST12@",
        redirectUrl: "scada3.html"
    }
};

// Functionality for the login form
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the username exists and the password matches
    if (users[username] && users[username].password === password) {
        alert("Successful Login"); // Display success message

        // Redirect to the relevant SCADA page after 1 second delay
        setTimeout(() => {
            window.location.href = users[username].redirectUrl;
        }, 1000);
    } else {
        // Display an error message if credentials are incorrect
        alert("Incorrect username or password. Please try again.");
    }
});

// Event listener for form submission
document.getElementById('inquiryForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the form data to EmailJS
    emailjs.send("service_nth9fox", "template_jo16xv8", {
        name: name,
        email: email,
        message: message
    })
    .then(function(response) {
        // Success message
        alert("Message sent successfully!");
        document.getElementById('inquiryForm').reset(); // Clear the form
    })
    .catch(function(error) {
        // Error message
        console.error("Failed to send the message:", error);
        alert("Failed to send the message. Please try again later.");
    });
});

$(document).ready(function() {
    $('#ripple').ripples({
        resolution: 512,
        dropRadius: 20, // Radius of the ripple
        perturbance: 0.04, // The intensity of the ripple
    });
});
