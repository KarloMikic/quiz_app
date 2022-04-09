import React from "react"
import Question from "./components/Question.js"
import {nanoid} from "nanoid"

export default function App(){
     
    const [startQuiz, setStartQuiz] = React.useState(false)
    function start(){
        setStartQuiz(true)
    }
    const [questions, setQuestions] = React.useState([])

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
      };

React.useEffect(function (){
        fetch("https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple")
        //fetch("https://opentdb.com/api.php?amount=1&category=20&difficulty=easy&type=multiple")
        .then(res=>res.json())
        .then(data=>setQuestions((data.results).map(({question, correct_answer, incorrect_answers}) =>
         ({
            question,
            correct_answer,
            incorrect_answers,
            id:nanoid(),
            allAnswers:  handleShuffle(incorrect_answers.concat(correct_answer)),
        }))))
       },[startQuiz])
       console.log(questions)

       function selectAns(event,id){
        console.log(id)
        let answer = event.target.innerHTML
             setQuestions(prevQuestion=>
                prevQuestion.map(question =>{
                    if(question.id === id){
                        return question.correct_answer === answer
                        ? {...question, answer:answer, isCorrect: true }
                        : {...question, answer:answer, isCorrect: false}
                     }else{
                        return {...question}
            }
           }))
       }  
       const questionElements = questions.map(question => (
        <Question 
            key={question.id}
            question={question.question}
            correct_answer={question.correct_answer}
            value={question.allAnswers}
            isAnswered={question.isAnswered} 
            selectAns={(event) => selectAns(event, question.id)}
            isCorrect = {question.isCorrect}
            answer = {question.answer}

        />
    ))
function handleScore(){
    let score = 0
    questions.forEach(element=>{if(element.isCorrect){
        score++
    }});
        return score
         
}
function handleNewQ(){
    setStartQuiz(false)
}


    return(
        <main>
        {!startQuiz
        ?
            <div className="start">
            <h1>Quizzical</h1>
            <p>Random questions quiz</p>
            <button className="start-button" onClick={start}>Start quiz</button>
            </div>
        : 
        <div className="questions">
            {questionElements}
            <div className="result">
                <span className="result-score">You correctly answered {handleScore()} out of 5 questions</span>
                <button className="result-newQ" onClick={handleNewQ}>Play again</button>
            </div>
        </div>}
        </main>
    )
}