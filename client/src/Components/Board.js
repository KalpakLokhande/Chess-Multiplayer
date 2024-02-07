import React, { useEffect, useState } from 'react'
import Square from './Square'

const Board = () => {

  const getSquares = () => {
    
    let squares = []
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let dark = false
    let index = 0
    
    for (let i = 0; i < 8; i++) {

      for (let j = 0; j < 8; j++) {

        squares.push({ id: letters[j] + '' + (i + 1), index: index, isDark: dark })
        index++
        dark = !dark
        
      }
      dark = !dark
    }

    return squares
    
  }

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  const [squares, setSquares] = useState(getSquares())

  const readFEN = () => {

    let updatedSquares = [...squares]
    let index = 0

    for (let i = 0; i < FEN.length; i++) {

      let char = FEN.charAt(i)

      if (!isNaN(char)) {

        index += parseInt(char)

      } else if (char === '/') {

        continue

      } else if (char === char.toLowerCase()) {

        updatedSquares[index].piece = 'b' + char 
        index++


      } else if (char === char.toUpperCase()) {

        updatedSquares[index].piece = 'w' + char.toLowerCase()
        index++

      }

    }

    return updatedSquares

  }

  const renderSquares = () => {

    return squares.map(({id, index, isDark, piece}) => {

      return (
        <Square id={id} index={index} isDark={isDark} key={id} piece={piece}> </Square>
      )

    })

  }
  useEffect(() => {

    setSquares(readFEN())

  }, [])

  return (
    <div className='board' >
      {renderSquares()}
    </div>
  )
}

export default Board
