import Moves from './Moves'

export default class Game {

    static getSquares = () => {

        let squares = []
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let dark = false
        let index = 0

        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 8; j++) {

                squares.push({ id: letters[j] + '' + (8 - i), index: index, isDark: dark, highlight: false, isPossibleMove: false, isPossibleCapture: false })
                index++
                dark = !dark

            }
            dark = !dark
        }

        return squares

    }

    static readFEN = (squares, FEN, setCurrentPlayer, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber) => {

        let updatedSquares = [...squares]
        let index = 0
        let part = 0

        for (let i = 0; i < FEN.length; i++) {

            let char = FEN.charAt(i)

            if (char === ' ') part++
            
            if (part === 0) {

                if (!isNaN(char)) {

                    index += parseInt(char)

                } else if (char === '/') {

                    continue

                } else if (char === char.toLowerCase()) {

                    updatedSquares[index].piece = { id: 'b' + char, firstMove: true }
                    index++


                } else if (char === char.toUpperCase()) {

                    updatedSquares[index].piece = { id: 'w' + char.toLowerCase(), firstMove: true }
                    index++

                }

            } 

            else if(part === 1) { if(setCurrentPlayer) setCurrentPlayer(char)}

        }

        return updatedSquares

    }

    static writeFEN(squares, currentPlayer, castling, enPassant, halfMoveClock, fullMoveNumber) {

        let FEN = ''
        let emptySquares = 0
        let columnTracker = 0

        for (let i = 0; i < squares.length; i++) {

            if (columnTracker === 8) {

                if (emptySquares > 0) FEN += emptySquares
                emptySquares = 0
                FEN += '/'
                columnTracker = 0

            }
            if (!squares[i].piece) {

                emptySquares++
                columnTracker++

            }
            if (squares[i].piece && squares[i].piece.id.charAt(0) === 'b') {

                if (emptySquares > 0) FEN += emptySquares
                FEN += squares[i].piece.id.charAt(1)
                emptySquares = 0
                columnTracker++

            }
            if (squares[i].piece && squares[i].piece.id.charAt(0) === 'w') {

                if (emptySquares > 0) FEN += emptySquares
                FEN += squares[i].piece.id.charAt(1).toUpperCase()
                emptySquares = 0
                columnTracker++

            }

        }

        FEN += ` ${currentPlayer}`

        let cas = (castling[0] ? 'K' : '') + (castling[1] ? 'Q' : '') + (castling[2] ? 'k' : '') + (castling[3] ? 'q' : '')
        if (!castling[0] && !castling[1] && !castling[2] && !castling[3]) cas = '-'
        FEN += ' ' + cas

        if (enPassant) FEN += ' ' + enPassant.square.id.toLowerCase()
        else FEN += ' -'

        FEN += ' ' + halfMoveClock
        FEN += ' ' + fullMoveNumber

        return FEN
    }

    static checkForMate = (squares, currentPlayer, enPassant, castling) => {

        //You have to change this later. use getlegalmoves method here.

        let currentPlayerPieces = []

        squares.forEach(square => {
            if (square.piece && square.piece.id.charAt(0) === currentPlayer) currentPlayerPieces.push(square)
        })

        let AllPossibleMoves = []

        currentPlayerPieces.forEach(piece => {

            let possibleMoves = Moves.getMoves(piece, squares, enPassant, castling)
            let originSquare = squares[piece.index]
            let originPiece = squares[piece.index].piece

            for (let i = 0; i < possibleMoves[0].length; i++) {

                originSquare.piece = ''
                possibleMoves[0][i].piece = originPiece
                let check = Moves.getAllPossibleMoves(squares, currentPlayer === 'w' ? 'b' : 'w', enPassant, castling)

                if (!check[1].some(sq => sq.piece.id === currentPlayer + 'k')) AllPossibleMoves.push(possibleMoves[0][i])

                possibleMoves[0][i].piece = ''
                originSquare.piece = originPiece
            }

            for (let i = 0; i < possibleMoves[1].length; i++) {

                let temp = possibleMoves[1][i].piece
                originSquare.piece = ''
                possibleMoves[1][i].piece = originPiece
                let check = Moves.getAllPossibleMoves(squares, currentPlayer === 'w' ? 'b' : 'w', enPassant, castling)

                if (!check[1].some(sq => sq.piece === currentPlayer + 'k')) AllPossibleMoves.push(possibleMoves[1][i])

                possibleMoves[1][i].piece = temp
                originSquare.piece = originPiece

            }

        })

        if (AllPossibleMoves.length !== 0) return false
        return true

    }

    static checkCastlingRights = (squares) => {

        let blackRooks = []
        let whiteRooks = []
        let hasWhiteKingMoved = false
        let hasBlackKingMoved = false
        let updatedCastling = [false, false, false, false]

        squares.forEach(square => {

            if (square.piece && square.piece.id.charAt(0) === 'b' && square.piece.id.charAt(1) === 'r') blackRooks.push(square)
            if (square.piece && square.piece.id.charAt(0) === 'w' && square.piece.id.charAt(1) === 'r') whiteRooks.push(square)
            if (square.piece && square.piece.id.charAt(0) === 'w' && square.piece.id.charAt(1) === 'k') hasWhiteKingMoved = square.piece.firstMove
            if (square.piece && square.piece.id.charAt(0) === 'b' && square.piece.id.charAt(1) === 'k') hasBlackKingMoved = square.piece.firstMove
        
        })

        if (hasWhiteKingMoved) {

            whiteRooks.forEach(piece => {

                if (piece.id === 'H1' && piece.piece.firstMove) updatedCastling[0] = true
                if (piece.id === 'A1' && piece.piece.firstMove) updatedCastling[1] = true

            })

        } else {
            updatedCastling[0] = false
            updatedCastling[0] = false
        }

        if (hasBlackKingMoved) {

            blackRooks.forEach(piece => {

                if (piece.id === 'H8' && piece.piece.firstMove) updatedCastling[2] = true
                if (piece.id === 'A8' && piece.piece.firstMove) updatedCastling[3] = true

            })

        } else {
            updatedCastling[2] = false
            updatedCastling[3] = false
        }

        // setCastling(updatedCastling)
        return updatedCastling

    }
}
