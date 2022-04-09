import React from "react"
//{props.value.map((answer)=> 
//    <button onClick={props.selectAns}  className="choice" key={answer}>{answer}</button>
//)}

export default function Question(props){
    
    
   function checkStyle(i){
    if(props.answer !== props.value[i] && props.isCorrect === false && props.correct_answer === props.value[i]){
        return "choice-correct"
    }
           if(props.answer === props.value[i]){
               if(props.isCorrect === true){
                   return "choice-correct"
               }else {
                   return "choice-incorrect"
               }
           }else{
               return "choice"
           }      
   }

            return(
                <div key={props.id} className ="question">
                    <h1>{props.question}</h1>
                    <section className ="answers">
                     <button disabled={props.answer ? true: false}
                    onClick={props.selectAns}
                    className= {checkStyle(0)}>
                    {props.value[0]}</button>
                     <button disabled={props.answer ? true: false}
                      onClick={props.selectAns} className= {checkStyle(1)}>{props.value[1]}</button>
                     <button disabled={props.answer ? true: false}
                      onClick={props.selectAns} className= {checkStyle(2)}>{props.value[2]}</button>
                     <button disabled={props.answer ? true: false}
                      onClick={props.selectAns} className= {checkStyle(3)}>{props.value[3]}</button>
                    </section>
                    <hr/>

                    
                </div>
            )
}