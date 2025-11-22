import { useState } from 'react'

const Statistics = (props) => {
  if(props.all === 0){
   return(
   <div>No feedback given</div>
   )
  }

  return (
    <>
      {/* <div>good {props.good}</div> */}
      <table>
        <tbody>
      <StatisticLine text={'good'} value={props.good} />
      <StatisticLine text={'neutral'} value={props.neutral} />
      <StatisticLine text={'bad'} value={props.bad} />
      <StatisticLine text={'all'} value={props.all} />
      <StatisticLine text={'average'} value={props.average} />
      <StatisticLine text={'positive'} value={props.positive} />
      </tbody>
      </table>
      {/* <div>neutral {props.neutral}</div> */}
      {/* <div>bad {props.bad}</div>
      <div>all {props.all}</div>
      <div>average {props.average}</div>
      <div>positive {props.positive} %</div> */}
    </>


  )
}

const Button = ({textType, handleTypeClick}) => {

  return(
   <>
      <button onClick={handleTypeClick}>{textType}</button>
   </>

  )
  
}

const StatisticLine = ({text, value}) => {
 return(
 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>


 )

}


const App = () => {
  // save clicks of each button to its own state
    const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
   const[allReviews, setAllReviews] = useState(0)
  const[average, setAverage] = useState(0)
  const[positive, setPositive] = useState(0)


     const handleGoodClick = () =>{
         const updatedGood = good + 1;
         setGood(updatedGood);
         setAllReviews(updatedGood + neutral + bad);
         setAverage((updatedGood + neutral + bad) / 3);
         setPositive(updatedGood / allReviews);


   }

   const handleNeutralClick = () => {
      const updatedNeutral = neutral + 1;
         setNeutral(updatedNeutral);
         setAllReviews(good + updatedNeutral + bad);
         setAverage((good + updatedNeutral + bad) / 3);

   }

   const handleBadClick = () => {
          const updatedBad = bad + 1;
         setBad(updatedBad);
         setAllReviews(good + neutral + updatedBad);
         setAverage((good + neutral + updatedBad) / 3);
   }
 

  return (
   
    <div>
      <h1>give feedback</h1>
       <Button textType={'good'} handleTypeClick={handleGoodClick} />
       <Button textType={'bad'} handleTypeClick={handleBadClick}/>
       <Button textType={'neutral'} handleTypeClick={handleNeutralClick}/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={allReviews} average={average} positive={positive} />
    </div>
     

  )
}



export default App
