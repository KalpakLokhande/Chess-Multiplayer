import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EvalBar = (props) => {

  const [score,setScore] = useState(0)

  useEffect(() => {

    const fetchEval = async() => {

      try{

        const evaluation = await axios.get(`https://stockfish.online/api/stockfish.php?fen=${props.FEN}&depth=13&mode=eval`)
        const numbers = evaluation.data.data.match(/-?\d+\.\d+/);
        console.log(parseFloat(50) + parseFloat(numbers[0]))
        setScore(numbers[0])

      }catch(err){

        console.log(err)

      }

    }

    fetchEval()

  },[props.FEN])
  return (
    <div style={{position:'relative',width:'25px', height:'640px', background:'#101010'}}>
      <div style={{position:'absolute',width:'25px', height: (parseFloat(50) + parseFloat(score) ) + '%', background:'ghostWhite'}} ></div>
    </div>
  )
}

export default EvalBar
