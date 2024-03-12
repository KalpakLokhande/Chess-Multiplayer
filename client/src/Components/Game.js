import Moves from './Moves'

export default class Game {

    static getSquares = () => {

        let squares = []
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let dark = false
        let index = 0

        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 8; j++) {

                squares.push({ id: letters[j] + '' + (8 - i), index: index, isDark: dark, highlight: false, isPossibleMove: false, isPossibleCapture: false, piece: '' })
                index++
                dark = !dark

            }
            dark = !dark
        }

        return squares

    }

    static readFEN = (squares, FEN) => {

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

    static checkForMate = (squares, currentPlayer, enPassant) => {

        let currentPlayerPieces = []

        squares.forEach(square => {
            if (square.piece && square.piece[0] === currentPlayer) currentPlayerPieces.push(square)
        })

        let AllPossibleMoves = []

        currentPlayerPieces.forEach(piece => {

            let possibleMoves = Moves.getMoves(piece, squares, enPassant)
            let originSquare = squares[piece.index]
            let originPiece = squares[piece.index].piece

            for (let i = 0; i < possibleMoves[0].length; i++) {

                originSquare.piece = ''
                possibleMoves[0][i].piece = originPiece
                let check = Moves.getAllPossibleMoves(squares, currentPlayer === 'w' ? 'b' : 'w', enPassant)

                if (!check[1].some(sq => sq.piece === currentPlayer + 'k')) AllPossibleMoves.push(possibleMoves[0][i])

                possibleMoves[0][i].piece = ''
                originSquare.piece = originPiece
            }

            for (let i = 0; i < possibleMoves[1].length; i++) {

                let temp = possibleMoves[1][i].piece
                originSquare.piece = ''
                possibleMoves[1][i].piece = originPiece
                let check = Moves.getAllPossibleMoves(squares, currentPlayer === 'w' ? 'b' : 'w', enPassant)

                if (!check[1].some(sq => sq.piece === currentPlayer + 'k')) AllPossibleMoves.push(possibleMoves[1][i])

                possibleMoves[1][i].piece = temp
                originSquare.piece = originPiece

            }

        })

        if (AllPossibleMoves.length !== 0) return false
        return true

    }

    static checkEnPassant = (squares, square, setEnPassant) => {

        if (squares[square.index - 1] && squares[square.index - 1].piece) {

            if (squares[square.index - 1].piece.charAt(1).toLowerCase() === 'p' && squares[square.index - 1].piece.charAt(0) !== squares[square.index].piece.charAt(0)) {

                console.log(squares[square.index - 8])
                if (squares[square.index].piece.charAt(0) === 'w') setEnPassant(squares[square.index + 8])
                else setEnPassant(squares[square.index - 8])

            }

        }
        if (squares[square.index + 1] && squares[square.index + 1].piece) {

            if (squares[square.index + 1].piece.charAt(1).toLowerCase() === 'p' && squares[square.index + 1].piece.charAt(0) !== squares[square.index].piece.charAt(0)) {

                console.log(squares[square.index + 8])
                if (squares[square.index].piece.charAt(0) === 'w') setEnPassant(squares[square.index + 8])
                else setEnPassant(squares[square.index - 8])

            }

        }

    }
}
