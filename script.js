const timerEl = document.getElementById('timerEl');
let time = 60;
let interval;
var currentQuestion = 0;
var score = 0;


//Object questions
var questions = [
	{
		questionTitle: "1.Inside which HTML element do we put the JavaScript?", 
		answers: [
            "a) &lt;javascript&gt;", 
            "b) &lt;js&gt;",
            "c) &lt;script&gt;", 
            "d) &lt;scripting&gt;"
        ],
		correctAnswer: "c) &lt;script&gt;" 
	},
    {
        questionTitle: "2. What is the correct JavaScript syntax to write \"Hello World\" ?",
		answers: [
            "a) response.write(\"Hello World\")", 
            "b) \"Hello World\" ", 
            "c) document.write(\"Hello World\")", 
            "d) (\"Hello World\")"
        ],
		correctAnswer: "c) document.write(\"Hello World\")"

    },
    {
        questionTitle: "3. Where is the correct place to insert a JavaScript?",
		answers: [
            "a) Both the &lt;head&gt; section and the <body> section are correct", 
            "b) The  &lt;body&gt; section", 
            "c) The  &lt;head&gt; section", 
        ],
		correctAnswer: "a) Both the &lt;head&gt; section and the <body> section are correct"

    },
   {
    questionTitle: "4. How does a \"for\" loop start?",
		answers: [
            "a) for (i = 0; i <= 5)", 
            "b) for (i = 0; i <= 5; i++)", 
            "c) for i = 1 to 5", 
            "d) for (i <= 5; i++)"
        ],
		correctAnswer: "b) for (i = 0; i <= 5; i++)"
   }    
]
//the document method returns an element of start-btn property 
document.getElementById('start-btn').onclick = init;

//function that hide the starter page and shows teh quiz-page
function init() {
	document.getElementById('starter-page').style.display = "none";
	document.getElementById('quiz-page').style.display = "block";
    
    timerFunc(); //shows the timer on the screen 
    renderQuestion(questions[0]); //shows the question on the screen

    interval = setInterval(timerFunc, 1000);//method setInterval calls a function timerFunc at 1000 milliseconds interval 
}

function timerFunc(){
	timerEl.innerText = time;
	if(time < 0){ // if statement that checks the time if it is less than 0 it stops the clock by clearInterval
		clearInterval(interval)
		endQuiz(); // displays result page.
	}
	time--;
}

//quiz-page

function renderQuestion(question) { //function that renders questions and shows answers 
    var answers = question.answers;
    var answersStr = '';
    
    for(var i = 0; i < answers.length; i++){
        //answers show as buttons 
        answersStr += "<li><button class=\"btn-cls\" onclick=\"processSelectedAnswer(this)\" >" + answers[i] + "</button></li>";
    }

    document.getElementById('questionTitle').textContent = question.questionTitle; //displayd the questions
    document.getElementById('answerList').innerHTML = answersStr;//created HTML contend 
}


function processSelectedAnswer(clickedAnswer){
    console.log(clickedAnswer.textContent);

    if(clickedAnswer.textContent==questions[currentQuestion].correctAnswer){
        score++;
    } else {
        time -= 10;
    }

    if (questions.length-1 == currentQuestion){
        endQuiz();
    } else {
        //show currentQuestion when user click an answer
        currentQuestion++; //next question
        renderQuestion(questions[currentQuestion]);
    }
}
//function that hides quiz-page and displays the result-page, and shows the score 
function endQuiz(){
    document.getElementById('quiz-page').style.display = "none";
    document.getElementById('result-page').style.display = "block";
    
    var scoreShow = document.getElementById('score-display');
    scoreShow.textContent = "Your final score is: " + score;
}
//submit button
document.getElementById('result-submit').onclick = submitScore;

function submitScore(){
    var initials = document.getElementById('nameField').value
     //checks if a user entered initials, if not - displays alert message
    if (initials.length==0) {
        alert('Please enter your initials');
    } else { 
        var lastScore = [ //an object for initials and score to store 
            {
                initials: initials,
                score: score,
            }
        ]
        var existingScores = JSON.parse(window.localStorage.getItem('quizResult')) || [];
        //store initials and score in local storage 
        window.localStorage.setItem('quizResult', JSON.stringify(lastScore.concat(existingScores)));
        document.getElementById('result-page').style.display = "none";
        document.getElementById('nameField').value = '';
        resultsPage();
    }
}

//takes values from the storage and displays on the screen 
function resultsPage(){
    var existingScores = JSON.parse(window.localStorage.getItem('quizResult')) || [];
    
    var results = '';

    for (var i = 0; i < existingScores.length; i++){
        results += "<li>" + existingScores[i].initials + " - " + existingScores[i].score + "</li>";
    } 
    document.getElementById('resultsList').innerHTML = results;
    document.getElementById('quiz-result-page').style.display = "block";
}