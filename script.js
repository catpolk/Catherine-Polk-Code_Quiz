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

document.getElementById('start-btn').onclick = init;

function init() {
	document.getElementById('starter-page').style.display = "none";
	document.getElementById('quiz-page').style.display = "block";
	interval = setInterval(timerFunc, 1000);
    renderQuestion(questions[0]); //shows the question on the screen
}

function timerFunc(){
	timerEl.innerText = time;
	if(time < 0){
		clearInterval(interval)
		endQuiz(); // to display result page.
	}
	time--;
}

//quiz-page



function renderQuestion(question) {
    var answers = question.answers;
    var answersStr = '';
    
    for(var i = 0; i < answers.length; i++){
        answersStr += "<li><button onclick=\"processSelectedAnswer(this)\" >" + answers[i] + "</button></li>";
    }

    document.getElementById('questionTitle').textContent = question.questionTitle;
    document.getElementById('answerList').innerHTML = answersStr;
}


function processSelectedAnswer(clickedAnswer){
    console.log(clickedAnswer.textContent);

    if(clickedAnswer.textContent==questions[currentQuestion].correctAnswer){
        score++;
    }


    if (questions.length-1 == currentQuestion){
        endQuiz();
    } else {
        //show currentQuestion when user click an answer
        currentQuestion++; //next question
        renderQuestion(questions[currentQuestion]);
    }
}

function endQuiz(){
    document.getElementById('quiz-page').style.display = "none";
    document.getElementById('result-page').style.display = "block";

    console.log(score);

}
















