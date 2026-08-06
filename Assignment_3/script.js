const form = document.getElementById("feedbackForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const course = document.getElementById("course");
const feedback = document.getElementById("feedback");

const storedData = document.getElementById("storedData");
const sessionUser = document.getElementById("sessionUser");

displayStoredData();
displaySessionUser();

name.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
course.addEventListener("change", validateCourse);
feedback.addEventListener("input", validateFeedback);

function validateName() {

    if (name.value.trim() === "") {
        document.getElementById("nameError").innerText =
            "Student Name is required.";
        return false;
    }

    document.getElementById("nameError").innerText = "";
    return true;
}

function validateEmail() {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        document.getElementById("emailError").innerText =
            "Email is required.";
        return false;
    }

    if (!pattern.test(email.value)) {
        document.getElementById("emailError").innerText =
            "Enter a valid email.";
        return false;
    }

    document.getElementById("emailError").innerText = "";
    return true;
}

function validateCourse() {

    if (course.value === "") {
        document.getElementById("courseError").innerText =
            "Please select a course.";
        return false;
    }

    document.getElementById("courseError").innerText = "";
    return true;
}

function validateFeedback() {

    if (feedback.value.trim() === "") {
        document.getElementById("feedbackError").innerText =
            "Feedback cannot be empty.";
        return false;
    }

    document.getElementById("feedbackError").innerText = "";
    return true;
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    let valid =
        validateName() &&
        validateEmail() &&
        validateCourse() &&
        validateFeedback();

    if(valid){

        let student = {
            name: name.value,
            email: email.value,
            course: course.value,
            feedback: feedback.value
        };

        localStorage.setItem(
            "studentFeedback",
            JSON.stringify(student)
        );

        sessionStorage.setItem(
            "sessionUser",
            name.value
        );

        displayStoredData();
        displaySessionUser();

        alert("Feedback Submitted Successfully!");

        form.reset();

        document.querySelectorAll(".error").forEach(function(item){
            item.innerText = "";
        });

    }

});
function displayStoredData(){

    let data = JSON.parse(localStorage.getItem("studentFeedback"));

    if(data){

        storedData.innerHTML = `
            <h2>Stored Feedback</h2>

            <p><strong>Name:</strong> ${data.name}</p>

            <p><strong>Email:</strong> ${data.email}</p>

            <p><strong>Course:</strong> ${data.course}</p>

            <p><strong>Feedback:</strong> ${data.feedback}</p>
        `;

    }
    else{

        storedData.innerHTML = "<p>No feedback stored.</p>";

    }

}
function displaySessionUser(){

    let user = sessionStorage.getItem("sessionUser");

    if(user){

        sessionUser.innerHTML =
        "Current Session User: " + user;

    }
    else{

        sessionUser.innerHTML = "";

    }

}
document.getElementById("deleteBtn").addEventListener("click", function(){

    localStorage.removeItem("studentFeedback");
    sessionStorage.removeItem("sessionUser");

    displayStoredData();
    displaySessionUser();

    alert("Stored Data Deleted Successfully!");

});
