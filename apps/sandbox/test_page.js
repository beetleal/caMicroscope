
// This is a very exprimental page. It was used to test and figure out how to send information to the DB.

// Initialize function for the mage
testSubmit()

function testSubmit() {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', addToSandbox);
}

function errorHandler(response) {
    console.log('Error')
    if (!response.ok) {
        return {
        error: !response.ok,
        text: response.statusText,
        url: response.url,
        };
    }
    return response.json();
}

// Logs to console
console.log('Loaded2')
console.log('Loaded3')

// Function will take values from the text areas and add them to the backend as document. 
async function addToSandbox() {
    const id = document.getElementById('id').value;
    const info1 = document.getElementById('info1').value;
    const info2 = document.getElementById('info2').value;
    const info3 = document.getElementById('info3').value;



    const suffix = 'testSandbox/post';
    const url = ' http://localhost:4010/data/' + suffix;
    return fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
        'id' : id,
        'info1': info1,
        'info2': info2,
        'info3' : info3
    }),
    }).then(errorHandler);
};
