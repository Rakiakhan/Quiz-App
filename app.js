function startButton(e) {
    var stdName = document.getElementById("stdName");
    if(stdName.value == "") {
        stdName.classList.add('error');
        setTimeout(function() {
            stdName.classList.remove('error');
        }, 300);
        e.preventDefault();
    }
    else {
        var name = stdName.value;
        sessionStorage.setItem("name",name);
        stdName.value = "";
        window.location.href = "quiz.html";
    }
}

var quizQuestions = [ 
    {
        question: "What is the Last name of Sir 'ALI' ?",
        answer: "Mughal",
        options: ["khan", "Ahmed", "Mughal", "Shah"]
    },
    {
        question: "Who is the Founder of saylani welfare trust ?",
        answer: "Bashir Ahmed Farooqui",
        options: ["Wajid Ullah", "Bashir Ahmed Farooqui", "Raheel Gulraiz", "Muhammad Ali Mughal "]
    },
    {
        question: "What is the favourite color of Sir Ghous Ahmed ?",
        answer: "Pink",
        options: ["Black", "Red", "Blue", "Pink"]
    },
    {
        question: "Best Voice   ?",
        answer: "Basit Ahmed",
        options: ["Basit Ahmed", "Ghous Ahmed", "Muhammad Ali Mughal", "None Of The These "]
    },
    {
        question: "The Most Handome Teacher in Saylani IT Mass ?",
        answer: "Muhammad Ali Mughal",
        options: ["Ghous Ahmed", "Muhammad Ali Mughal", "Basit Ahmed", "Me"]
    }
]

var seconds;
var minutes;
var sec = 60;
var min = 02;

function totalTime() {
    sec--;
    if(sec < 0) {
        sec = 59;
        min--;
    }

    if(sec < 10) {
        seconds = "0" + sec.toString();
    }
    else {
        seconds = sec;
    }

    if(min < 10) {
        minutes = "0" + min.toString();
    }
    else {
        minutes = min;
    }

    var watch = document.getElementById("watch");
    watch.innerHTML = minutes + ":" + seconds;

    if(watch.innerHTML == "00" + ":" + "59") {
        watch.style.color = "red";
    }

    if(watch.innerHTML == "00" + ":" + "00") {
        window.location.href = "result.html";
    }
}


function displayQuesNum(x) {  
    var quesNum = document.getElementById("quesNum");
    quesNum.innerHTML = "";
    var numPara = document.createElement("p");
    var num = document.createTextNode("Question " + x + " / 5");
    numPara.appendChild(num);
    quesNum.appendChild(numPara);
}

function displayOptions(x) {
    for(var i = 0; i < quizQuestions[x].options.length; i++) {
        var ques = document.getElementById("questions");
        var span = document.createElement("span");
        var lineBreak = document.createElement("br");
        var optionNum = document.createTextNode(i + 1 + ". ");
        span.setAttribute("id","span")
        span.appendChild(optionNum);
        var p = document.createElement("p");
        p.setAttribute("class","options");
        p.setAttribute("onclick","selected(this)");
        var option = document.createTextNode(quizQuestions[x].options[i]);
        p.appendChild(option);
        ques.appendChild(span)
        ques.appendChild(p);
        ques.appendChild(lineBreak);
    }
}

var interval;
function startQuiz() {
    interval = setInterval(totalTime,1000);

    var nameSession = sessionStorage.getItem("name");
    var examineeName = document.getElementById("examineeName");
    var userName = document.createTextNode("Examinee: " + nameSession);
    examineeName.appendChild(userName);

    var head = document.getElementById("quizName");
    var para = document.createElement("p");
    var value = document.createTextNode("Quiz : ");
    para.appendChild(value);
    head.appendChild(para);

    displayQuesNum(1);

    var ques = document.getElementById("questions");
    var h3 = document.createElement("h3");
    h3.setAttribute("id","question");
    var text = document.createTextNode(quizQuestions[0].question);
    h3.appendChild(text);
    ques.appendChild(h3);

    displayOptions(0);

    var ques = document.getElementById("questions");
    var button = document.createElement("button");
    var nextQues = document.createTextNode("NEXT");
    button.setAttribute("id","next")
    button.setAttribute("onclick","nextQuestion()");
    button.appendChild(nextQues);
    ques.appendChild(button);
}

var quesNow = 0;
function nextQuestion() {
    var selector = document.getElementsByClassName("options");
    if(selector[0].hasAttribute("id") || selector[1].hasAttribute("id") || selector[2].hasAttribute("id") || selector[3].hasAttribute("id")) {
        quesNow++;
        var ques = document.getElementById("questions");
        ques.innerHTML = ""
        var h3 = document.createElement("h3");
        h3.setAttribute("id","question");
        var text = document.createTextNode(quizQuestions[quesNow].question);
        h3.appendChild(text);
        ques.appendChild(h3);
   
        displayQuesNum(quesNow + 1)

        displayOptions(quesNow);

        if(quesNow == 4) {
            var final = document.createElement("a");
            var finalText = document.createTextNode("SUBMIT");
            final.setAttribute("id","submit");
            final.setAttribute("onclick","goResult()");
            ques.lastChild.innerHTML = "";
            ques.appendChild(final);
            final.appendChild(finalText);
        }

        else {
            var button = document.createElement("button");
            button.setAttribute("onclick","nextQuestion()");
            var nextQues = document.createTextNode("NEXT");
            button.setAttribute("id","next");
            button.appendChild(nextQues);
            ques.appendChild(button);
        }
    }
}

function goResult() {
    var selector1 = document.getElementsByClassName("options");
    if(selector1[0].hasAttribute("id") || selector1[1].hasAttribute("id") || selector1[2].hasAttribute("id") || selector1[3].hasAttribute("id")) {
        window.location.href = "result.html";
        var time = watch.innerHTML;
        sessionStorage.setItem("time",time);
    }
}

function selected(y) {
    unselect();
    y.classList.add("active");
    y.setAttribute("id","unuse");
    validAnswer();
}

function unselect() {
    var active = document.getElementsByClassName("active");
    for(var i = 0; i < active.length; i++) {
        active[i].classList.remove("active");
    }
}

var score = 0;
function validAnswer() {
    var userAns = document.getElementsByClassName("active");
    if(userAns[0].innerHTML == quizQuestions[quesNow].answer) {
        score = score + 10;
    }
    sessionStorage.setItem("score",score);
}

var nameSession = sessionStorage.getItem("name");
var over = document.getElementById("over");
var player = document.createTextNode(nameSession);
over.appendChild(player);

function showResult() {
    var Score = sessionStorage.getItem("score");
    var studentScore = document.getElementById("score");
    var textScore = document.createTextNode("Points Scored: " + Score + " / 50");
    studentScore.appendChild(textScore);
    var perc = document.getElementById("percentage");
    var percText = document.createTextNode("Percentage: " + (Score / 50) * 100 + " %");
    perc.appendChild(percText);
    var timeTook = sessionStorage.getItem("time");
    var timeTaken = document.getElementById("timeTaken");
    timeText = document.createTextNode("Time Left: " + timeTook + " out of 3:00");
    timeTaken.appendChild(timeText);
}