var slidechild = document.getElementById('slide_0');
var slidefather = document.getElementById('slide_block');
var questionchild = document.getElementById('slide_0_questions');
var questionfather = document.getElementById('questions_block');
var back = document.getElementById('back');
var task_num = document.getElementById('task_num');
var ele = document.getElementsByTagName('input');
var selectTrue = document.getElementById("true");
var question3 = document.getElementsByName("question3");
var slider = document.getElementById("slider");
var number = document.getElementById("number");
var next = document.getElementById('next');

var batches;
var answers;
var currentQuestion;
var totalQuestions = 0;
var slides = [];
var num = 0;
var question3_index = 0;

const params = getUrlVars();
const tid = params.testId;

async function initialize() {

    // The process below communicates with the mongoDB through a series of steps.
    // routes.json in Distro and Caracal reflect a route with the same name as the suffix below

    /* First, getting all the batches for the experiment*/
    const suffix1 = 'Experiment/find';
    const url1 = ' http://localhost:4010/data/' + suffix1;

    // building the query request
    const query1 = {
        // Getting the entry in the experiment collection where the id is testId
        '_id': tid,
    };

    // run the actual request, in this case a GET
    await fetch(url1 + '?' + objToParamStr(query1), {
        method: 'GET',
        mode: 'cors',
    })
    .then((res) => {
        return res.json();
    })
    .then((d) => {
        //initialize the variable batches with the array of batch id's
        batches = d[0].batch;
    })

    for (let index = 0; index < batches.length; index++)
    {
         /*Then for each batch, find the slides associated with it*/
         const suffix2 = 'Slide/find';
         const url2 = ' http://localhost:4010/data/' + suffix2;
 
         // building the query request
         const query2 = {
             // Getting slides where the collections field contains the batchId
             'collections': batches[index],
         };
 
         // run the actual request, in this case a GET
         await fetch(url2 + '?' + objToParamStr(query2), {
             method: 'GET',
             mode: 'cors',
         })
         .then((res) => {
             return res.json();
         })
         .then((d) => {
             //initialize the variable totalQuestions here based on how many slides were returned
             totalQuestions += d.length;
             d.forEach((slide) => {
                 // slides.push(slide._id.$oid);
                 // slides.push(slide.location);
                 slides.push(show_image(slide.location));
             })
         })
    }
    // Randomizing the order of the slides, using the Fisher-Yates Algorithm
    for (let i = slides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = slides[i];
        slides[i] = slides[j];
        slides[j] = temp;
    }
    
    var num = 1;
    for (let i = 1; i < totalQuestions; i++) {
        const cloneslide = slidechild.cloneNode(true);
        cloneslide.id = "slide_" + num;
        cloneslide.appendChild(slides[i]);
        
        slidefather.appendChild(cloneslide);
        document.getElementById(cloneslide.id).style.display = "none"; //Initially hide these additional slides

        const clonequestions = questionchild.cloneNode(true);
        clonequestions.id = "slide_" + num + "_questions";
        questionfather.appendChild(clonequestions);
        document.getElementById(clonequestions.id).style.display = "none"; //Initially hide these additional slide questions
        
        // now update input name
        container = document.getElementById(clonequestions.id);
        // Find its child input elements
        inputs = container.getElementsByTagName('input');
        console.log(inputs[0].name);
        for (let i = 0; i < inputs.length; i ++) {
            // deal with inputs[i] element.
            inputs[i].name += "_" + num;
            console.log(inputs[i].name);
        }
        
        num += 1;
    }

    currentQuestion = 0;
    document.getElementById("slide_0").appendChild(slides[currentQuestion]);
    task_num.innerHTML = "Task " + (currentQuestion+1) + " of " + totalQuestions;
}

function show_image(source) {
    var img = document.createElement("img");
    img.src = source;
    return img;
}

function EnableDisableQ3(){
    ele[num+6].disabled = ele[num+4].checked ? false : true;
    ele[num+6].style.opacity = ele[num+4].checked ? 1 : 0.7;
    ele[num+6].value = 50;
    ele[num+7].value = 50;
    ele[num+7].disabled = ele[num+4].checked ? false : true;
    question3[question3_index].style.color = ele[num+4].checked ? "black" : "rgb(146, 146, 146)";
    if (ele[num+6].disabled == false){
        ele[num+6].innerHTML = ".slider::-webkit-slider-thumb { background: 'red'; }";
        ele[num+7].disabled = false;
    }
} 

function label_checked(){
    return ele[num].checked || ele[num+1].checked || ele[num+2].checked || ele[num+3].checked;
}

function truefalse_checked(){
    return ele[num+4].checked || ele[num+5].checked;
}

function EnableDisableNext(){
    label_c = label_checked();
    truefalse_c = truefalse_checked();
    
    next.disabled = (label_c && truefalse_c) ? false : true;

    if (next.disabled == false && next.innerHTML == "Finish"){
        next.style.border = "2px solid rgb(112, 173, 74)"; 
    }
}

function ShowNextSlideandQs(){
    // TODO: Everytime they click Next, the number of questions they got right should should be updated.
    // Maybe set the value of the correct answer option to 1, all others 0, then add up the values of the selected options 
    // in the Redirect() function.

    if (next.innerHTML == "Finish"){
        Redirect();
        return;
    }

    currentQuestion += 1;
    task_num.innerHTML = "Task " + (currentQuestion+1) + " of " + totalQuestions;
    if(currentQuestion == (totalQuestions-1)){
        next.innerHTML = "Finish";
    }
    document.getElementById("slide_" + (currentQuestion-1)).style.display = "none";
    document.getElementById("slide_" + (currentQuestion-1) + "_questions").style.display = "none";
    document.getElementById("slide_" + currentQuestion).style.display = "block";
    document.getElementById("slide_" + currentQuestion + "_questions").style.display = "block";
    back.disabled = (currentQuestion > 0) ? false : true;

    num += 8;
    question3_index += 1;

    EnableDisableNext();
    if (!ele[num+4].checked){
        ele[num+6].value = 50;
        ele[num+7].value = 50;
    }  
}

function ShowPrevSlideandQs(){
    if (next.innerHTML == "Finish"){
        next.innerHTML = "Next";
    }
    document.getElementById("slide_" + currentQuestion).style.display = "none";
    document.getElementById("slide_" + currentQuestion + "_questions").style.display = "none";
    currentQuestion -= 1;
    task_num.innerHTML = "Task " + (currentQuestion+1) + " of " + totalQuestions;
    document.getElementById("slide_" + currentQuestion).style.display = "block";
    document.getElementById("slide_" + currentQuestion + "_questions").style.display = "block";
    back.disabled = (currentQuestion > 0) ? false : true;

    num -= 8;
    if (num == 0){
        back.disabled = true;
    }
    EnableDisableNext();
    question3_index -= 1;
}

function Redirect(){
    // TODO: Save the answers (and score?) before redirecting to crowd.html
    location.href='./conclusion.html';
}

document.addEventListener("DOMContentLoaded", initialize);


