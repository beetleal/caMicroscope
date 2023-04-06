const submit = document.getElementById('submit');
submit.addEventListener('click', checkValidEmail);

function checkValidEmail(){
    const ID_input = document.getElementById('email');
    if (ID_input.value == ""){
        alert(" Input email.")
        return;
    }
    // TODO: Check if email inputted corresponds to the participant's email.
    // If invalid, alert(" Invalid email.") and return;
    // If valid, 
    location.href='./select_test.html';
    // and pass in email. Need to keep track of this information throughout the experiment.
}