const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const questionNumber = document.getElementById('question_number');

const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const e_text = document.getElementById('e_text');

const submit = document.getElementById('submit');

var correct_li = ''

let count_from = +localStorage['count_from']
let count_to = +localStorage['count_to']
let count = +localStorage['count']
let quizData = ''

switch (localStorage['current_subject'])
{
    case "math1":
         quizData = math1
         break
    case "math2":
        quizData = math2
        break
    case "math3":
        quizData = math3
        break

}


questions = []

for (let i = count_from - 1; i < count_to; i++) {
    questions.push(i)
}
questions.sort(() => .5 - Math.random());
questions = questions.slice(0, count);
console.log(questions)

let currentQuiz = 0;
let score = 0;

// if ()
loadQuiz();

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[questions[currentQuiz]];

    questionElement.innerHTML = currentQuizData.question;
    questionNumber.innerHTML = `${currentQuiz + 1}/${questions.length}`

    for(let i=0;i<10;i++){
        insertAfter(document.getElementById('li'+getRandomInt(1,6)), document.getElementById('li' + getRandomInt(1,6)))
    }
    
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
    e_text.innerHTML = currentQuizData.e;

    
}

function deselectAnswers() {
    answerElements.forEach(answerEl => answerEl.checked = false)
    quiz.classList.remove('correct')
    quiz.classList.remove('incorrect')
}

function getSelected() {
    let answer;

    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function getCorrect() {
    let correct = document.querySelector('#a')

    return correct;
}

checkCorrect = true

function btn_click(){
    
    if (checkCorrect) {
        const answer = getSelected();

        if (answer) {
            if (answer === quizData[questions[currentQuiz]].correct) {
                quiz.classList.add('correct')
                score++;
            } else {
                correct = getCorrect()
                correct_li = correct.closest('li');
                correct_li.style.color = 'LimeGreen'
                correct_li.style.fontWeight = "Bold"
                correct_li.style.border = 'solid LimeGreen'
                quiz.classList.add('incorrect')
            }
            checkCorrect = false
        }
        
    } else {

        currentQuiz++;
        if (currentQuiz < questions.length) {
            loadQuiz();
            checkCorrect = true
            correct_li.style.color = ''
            correct_li.style.fontWeight = "normal"
            correct_li.style.border = 'solid 0px '
        }
        else {
            quiz.innerHTML = `<h2>You answered coreectly at ${score}/${questions.length} questions. It is ${score/questions.length*100}%</h2>
            <button onclick="location.reload()">Reload</button>
            `;
        }
    }
}

submit.addEventListener('click', btn_click);



document.addEventListener("keypress", (event) => {
    current_answer_elements = document.querySelectorAll('.answer');

   ;
    if (event.code === 'Enter' ||  event.code === "NumpadAdd" || event.code === "NumpadEnter") {
        btn_click();
    }
    if (event.code == 'Digit1' ||  event.code === "Numpad1") {
       current_answer_elements[0].checked = true;
    }
    if (event.code == 'Digit2' || event.code === "Numpad2") {
       current_answer_elements[1].checked = true;
    }
    if (event.code == 'Digit3' || event.code === "Numpad3") {
       current_answer_elements[2].checked = true;
    }
    if (event.code == 'Digit4' ||  event.code === "Numpad4") {
       current_answer_elements[3].checked = true;
    }
    if (event.code == 'Digit5' ||  event.code === "Numpad5") {
       current_answer_elements[4].checked = true;
    }
});


document.querySelector(".leave-page").addEventListener("click", () => {
    window.location.href = "index.html"
})

