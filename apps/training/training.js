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

var answers;
var currentQuestion;
var totalQuestions;
var slides = [];
var num = 0;
var question3_index = 0;

const params = getUrlVars();
const bid = params.batchId;
async function initialize() {

    // The process below communicates with the mongoDB through a series of steps.
    // routes.json in Distro and Caracal reflect a route with the same name as the suffix below
    const suffix = 'Slide/find';
    const url = ' http://localhost:4010/data/' + suffix;

    // building the query request
    const query = {
        // Getting slides where the collections field contains the batchId
        'collections': bid,
    };

    // run the actual request, in this case a GET
    await fetch(url + '?' + objToParamStr(query), {
        method: 'GET',
        mode: 'cors',
    })
    .then((res) => {
        return res.json();
    })
    .then((d) => {
        //initialize the variable totalQuestions here based on how many slides were returned
        totalQuestions = d.length;
        d.forEach((slide) => {
            // slides.push(slide._id.$oid);
            // slides.push(slide.location);
            // console.log(slide.location);
            // console.log(slide.location);
            slides.push(show_image(slide.location));
        })
    })

    // for all instances of UI components
    // const $UI = {};
    // let slideQuery = {};
    // slideQuery.id = slides[0];
    // console.log(slideQuery.id);
    // $CAMIC = new CaMic("slide_0", slideQuery);
    // $CAMIC.loadImg(function(e) {
    //     // image loaded
    //     if (e.hasError) {
    //       $UI.message.addError(e.message);
    //     }
    //   });

    // setting = {
    //     id: "slide_0",
    //     prefixUrl: 'images/',
    //     constrainDuringPan: true,
    //     // -- navigator setting
    //     showNavigationControl: false,
    //     showNavigator: true,
    //     navigatorAutoFade: false,
    //     navigatorPosition: 'BOTTOM_RIGHT',
    //     zoomPerClick: 1,
    //     animationTime: 0.01,
    //     minZoomImageRatio: 1,
    //     maxZoomPixelRatio: 1,
    //     visibilityRatio: 0,
    //     springStiffness: 0.0001,
  
    //     /* extension */
    //     hasZoomControl: true,
    //     hasDrawLayer: true,
    //     hasLayerManager: true,
    //     hasScalebar: true,
    //     hasMeasurementTool: true,
    //     hasPatchManager: true,
    //     hasHeatmap: false,
    //   };
    // viewer = new OpenSeadragon.Viewer(this.setting);
    // viewer.open('../../img/IIP/raw/?DeepZoom='+ slides[0] + '.dzi');
    // $CAMIC.loadImg();
    // document.getElementById("slide_0").open('../../img/IIP/raw/?DeepZoom='+ slides[0] + '.dzi');
    // const express = require("express");
    // const app = express();
    // app.use(express.static('Distro'));
    var num = 1;
    for (let i = 1; i < totalQuestions; i++) {
        const cloneslide = slidechild.cloneNode(true);
        cloneslide.id = "slide_" + num;
        cloneslide.appendChild(slides[i]);
        
        // $CAMIC = new CaMic("slide_" + num, slides[i]);
        // $CAMIC.loadImg();
        // cloneslide.innerHTML = <img src={slides[i]}></img>;
        // cloneslide.children[0] = show_image(slides[i]);
        slidefather.appendChild(cloneslide);
        document.getElementById(cloneslide.id).style.display = "none"; //Initially hide these additional slides

        const clonequestions = questionchild.cloneNode(true);
        clonequestions.id = "slide_" + num + "_questions";
        // clonequestions.children.name += num;
        // console.log(clonequestions.children[0]);
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
        // console.log(clonequestions.children[0]);
        
        num += 1;
    }

    // answers = new Object();
    // $('.option').change(function(){
    //     var answer = ($(this).attr('value'))
    //     var question = ($(this).attr('name'))
    //     answers[question] = answer
    // })
    // var slide_questions = document.getElementsByName('questions'); //array of all div elements with name "questions"
    // totalQuestions = slide_questions.length;

    currentQuestion = 0;
    document.getElementById("slide_0").appendChild(slides[currentQuestion]);
    task_num.innerHTML = "Task " + (currentQuestion+1) + " of " + totalQuestions;
}

function show_image(source) {
    var img = document.createElement("img");
    img.src = source;
    // img.setAttribute('src', source);
    return img;
}

// $CAMIC.loadImg(function(e) {
//     if (e.hasError) {
//       $UI.message.addError(e.message);
//       // can't reach Slide and return to home page
//       // if (e.isServiceError) redirect($D.pages.table, e.message, 0);
//     } else {
//       $D.params.data = e;

//       $UI.slideInfos = new CaMessage({
//       /* opts that need to think of*/
//         id: 'cames',
//         defaultText: `Slide: ${$D.params.data.name}`,
//       });
//     }
// });

// function sum_values(){
//     var the_sum = 0;
//     for (questions in answers){
//         the_sum = the_sum + parseInt(answers[question])
//     }
//     return the_sum
//     }

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
}

function ShowNextSlideandQs(){
    // TODO: Everytime they click Next, the number of questions they got right should should be updated.
    // Maybe set the value of the correct answer option to 1, all others 0, then add up the values of the selected options 
    // in the Redirect() function.

    if (next.innerHTML == "Finish"){
        Redirect();
    }

    currentQuestion += 1;
    task_num.innerHTML = "Task " + (currentQuestion+1) + " of " + totalQuestions;
    if(currentQuestion == (totalQuestions-1)){
        next.innerHTML = "Finish";
    }
    else{
        document.getElementById("slide_" + (currentQuestion-1)).style.display = "none";
        document.getElementById("slide_" + (currentQuestion-1) + "_questions").style.display = "none";
        document.getElementById("slide_" + currentQuestion).style.display = "block";
        document.getElementById("slide_" + currentQuestion + "_questions").style.display = "block";
        back.disabled = (currentQuestion > 0) ? false : true;
    }

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
    // TODO: If passing score, raise an alert that they passed the training and redirect to experiment.html where you left off (the experiment id and next slide number should have been passed to training.html)
    // ex: location.href='../experiment/experiment.html?testId=idplaceholder&slideId=idplaceholder';

    // If failing score, redirect to select_training.html to start another training
    alert("Your Score: __%. Passing Score: __ %. Please conduct another training.")
    location.href='../training/select_training.html';
}

document.addEventListener("DOMContentLoaded", initialize);

