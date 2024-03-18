import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EvalBar = (props) => {

  const [score,setScore] = useState(0)

  useEffect(() => {

    const fetchEval = async() => {

      try{

        const evaluation = await axios.get(`https://stockfish.online/api/s/v2.php?fen=${props.FEN}&depth=15&mode=eval`)
        if(evaluation.data.evaluation <= 3) setScore(evaluation.data.evaluation)
        else if(evaluation.data.evaluation > 3) setScore(evaluation.data.evaluation * 3)
        else if(evaluation.data.evaluation > 5) setScore(evaluation.data.evaluation * 5)


      }catch(err){

        console.log(err)

      }

    }

    fetchEval()

  },[props.FEN])
  return (
    <div style={{position:'relative',width:'25px', height:'640px', background:'#101010', rotate : props.onBottom === 'w' ? '180deg' : '0deg'}}>
      <div style={{position:'absolute',width:'25px', height: (parseFloat(50) + parseFloat(score) ) + '%', background:'ghostWhite'}} ></div>
    </div>
  )
}

export default EvalBar
