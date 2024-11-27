// Form validation 
// Note:
// Client-side validation (HTML, JS) is not secure, as it can be easily bypassed or modified. 
// Its primary purpose is to enhance user experience by providing immediate feedback.
// Server-side validation is essential for security, as it ensures data integrity. 
// Using both methods together provides multi-layer protection and is the best practice.

document.getElementById("form").onsubmit= ()=> {
    clearErrors();

    let isValid = true;

    // first name
    let fnameInput = document.getElementById("fnameInput").value;
    if (fnameInput == "") {
        document.getElementById("fname-err").style.display = "inline";
        isValid = false;
    }

    // last name
    let lnameInput = document.getElementById("lnameInput").value;
    if (lnameInput == "") {
        document.getElementById("lname-err").style.display = "inline";
        isValid = false;
    }

    // linkedIn (must start with https://linkedin.com/in/)
    let linkedinInput = document.getElementById("linkedinInput").value;
    const regexLinkedin = /^https:\/\/linkedin\.com\/in\/.+$/; // enforce starting format + any character after
    if (linkedinInput != "" && !regexLinkedin.test(linkedinInput)) {
        document.getElementById("linkedin-err").style.display = "inline";
        isValid = false;
    }

    // how did we meet
    let howmeetInput = document.getElementById("howmeetInput").value;
    if (howmeetInput === "none") { // value "none" is assigned as default in first option "Please check" in html
        document.getElementById("howmeet-err").style.display = "inline";
        isValid = false;
    }

    isValid = validateEmail(isValid); // pass isValid inside function to provide scope and return updated value
                                      // just like other isValid switches up top

    return isValid;
}

// function introduced to reduce redundancy (because checkbox would have to reuse emailInput)
function validateEmail(isValid) {
    // email address (not required, but must have @ and . if entered)
    let emailInput = document.getElementById("emailInput").value;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // enforce format using regex
    if (emailInput != "" && !regexEmail.test(emailInput)) {
        document.getElementById("email-err").innerHTML = "Please enter a correct format"; // change text to match context
        document.getElementById("email-err").style.display = "inline";
        isValid = false;
    }

    // add me to mailing list checkbox (if clicked, email must be entered)
    let addmlistInput = document.getElementById("addmlistInput");
    if (addmlistInput.checked && emailInput == "") {
        document.getElementById("email-err").innerHTML = "Email is required"; // change text to match context
        document.getElementById("email-err").style.display = "inline";
        isValid = false;
    }

    return isValid;
}


// format field html, css (if clicked reveal format section)
let format = document.getElementById("format");
let addmlistInput = document.getElementById("addmlistInput");
function toggleFormat() {
    if (addmlistInput.checked) {
        format.style.display = "inline"; // show if checked
    } else {
        format.style.display = "none"; // hide if not checked
    }
}
addmlistInput.addEventListener("change", toggleFormat); // learned from W3S + internet https://www.w3schools.com/js/js_htmldom_eventlistener.asp
toggleFormat(); // not inside form.onsubmit because it should show/hide without clicking submit


// other section from how did we meet (if clicked reveal other section)
let other = document.getElementById("other");
let howmeetInput = document.getElementById("howmeetInput");
function toggleOther() {
    let selected = howmeetInput.value;
    if (selected === "other") {
        other.style.display = "inline";
    } else {
        other.style.display = "none";
    }
}
howmeetInput.addEventListener("change", toggleOther);
toggleOther();


function clearErrors() {
    // gather .err class elements and put in errors collection, then set display none to clear errors
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
