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
        let castling = [false, false, false, false]
        let enpassant = ''
        let halfmove = ''
        let fullmovenumber = ''

        for (let i = 0; i < FEN.length; i++) {

            let char = FEN.charAt(i)

            if (char === ' ') {
                part++;
                continue
            }

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

            else if (part === 1) { setCurrentPlayer(char) }
            else if (part === 2 && char === 'K') castling[0] = true
            else if (part === 2 && char === 'Q') castling[1] = true
            else if (part === 2 && char === 'k') castling[2] = true
            else if (part === 2 && char === 'q') castling[3] = true
            else if (part === 2 && char === '-') castling = [false, false, false, false]
            else if (part === 3) enpassant += char
            else if (part === 4) halfmove += parseInt(char)
            else if (part === 5) fullmovenumber += parseInt(char)

        }

        if (enpassant === '-') setEnPassant(null)
        else {
    console.log(enpassant[1])
            let originalSquare
            let square
            let piece
            if (enpassant[1] === '4') {
                originalSquare = squares.find(square => square.id === enpassant[0] + parseInt(enpassant[1] + 2))
                let square = squares.find(square => square.id === enpassant[0] + enpassant[1])
                let piece = square.piece
            } else if (enpassant[1] === '5') {
                originalSquare = squares.find(square => square.id === enpassant[0] + parseInt(enpassant[1] - 2))
                square = squares.find(square => square.id === enpassant[0] + enpassant[1])
                piece = square.piece
            }
            setEnPassant({ originalSquare: originalSquare, square: square, piece: piece })
        }
        setCastling(castling)
        setHalfMoveClock(halfmove)
        setFullMoveNumber(fullmovenumber)

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

        console.log(enPassant)
        if (enPassant && enPassant.square) FEN += ' ' + enPassant.square.id.toLowerCase()
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

    static movePiece = (activeSquare, newSquare, squares, castling, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber, setActiveSquare, setCurrentPlayer, currentPlayer, setSquares) => {

        let temp = activeSquare.piece
        squares[newSquare.index].piece = temp
        squares[activeSquare.index].piece = ''

        if (activeSquare.piece.id.charAt(1) === 'p' && (activeSquare.id.charAt(1) === '2' || activeSquare.id.charAt(1) === '7') && (newSquare.id.charAt(1) === '4' || newSquare.id.charAt(1) === '5')) {

            if (activeSquare.id.charAt(1) === '2') setEnPassant({ square: squares[activeSquare.index - 8], originalSquare: squares[newSquare.index], piece: activeSquare.piece })
            if (activeSquare.id.charAt(1) === '7') setEnPassant({ square: squares[activeSquare.index + 8], originalSquare: squares[newSquare.index], piece: activeSquare.piece })

        } else {

            setEnPassant(null)
            setHalfMoveClock(prevhalfMoveClock => prevhalfMoveClock + 1)

        }
        if (activeSquare.piece.id.charAt(1) === 'p') {

            setHalfMoveClock(0)

        }

        if (activeSquare.piece.id.charAt(1) === 'k') {

            if (activeSquare.piece.id.charAt(0) === 'w') {

                if (newSquare.id === squares[activeSquare.index + 2].id && castling[0]) {

                    let rook = squares[activeSquare.index + 3].piece
                    let king = activeSquare.piece
                    squares[activeSquare.index + 3].piece = ''
                    squares[activeSquare.index].piece = ''
                    squares[newSquare.index].piece = king
                    squares[activeSquare.index + 1].piece = rook


                }

                if (newSquare.id === squares[activeSquare.index - 2].id && castling[1]) {

                    let rook = squares[activeSquare.index - 4].piece
                    let king = activeSquare.piece
                    squares[activeSquare.index - 4].piece = ''
                    squares[activeSquare.index].piece = ''
                    squares[newSquare.index].piece = king
                    squares[activeSquare.index - 1].piece = rook
                }

            }

            if (activeSquare.piece.id.charAt(0) === 'b') {

                if (newSquare.id === squares[activeSquare.index + 2].id && castling[2]) {

                    let rook = squares[activeSquare.index + 3].piece
                    let king = activeSquare.piece
                    squares[activeSquare.index + 3].piece = ''
                    squares[activeSquare.index].piece = ''
                    squares[newSquare.index].piece = king
                    squares[activeSquare.index + 1].piece = rook


                }

                if (newSquare.id === squares[activeSquare.index - 2].id && castling[3]) {

                    let rook = squares[activeSquare.index - 4].piece
                    let king = activeSquare.piece
                    squares[activeSquare.index - 4].piece = ''
                    squares[activeSquare.index].piece = ''
                    squares[newSquare.index].piece = king
                    squares[activeSquare.index - 1].piece = rook
                }

            }

        }

        if (activeSquare.piece.firstMove === true) activeSquare.piece.firstMove = false

        // setActiveSquare('')
        Game.resetState(squares, setSquares)
        setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w')
        setCastling(Game.checkCastlingRights(squares, castling))

        if (activeSquare.piece.id.charAt(0) === 'b') setFullMoveNumber(prevfullMoveNumber => prevfullMoveNumber + 1)


    }


    static capturePiece = (activeSquare, newSquare, squares, enPassant, setActiveSquare, setHalfMoveClock, setFullMoveNumber, setSquares, currentPlayer, setCurrentPlayer) => {

        let temp = activeSquare.piece
        if (enPassant && newSquare.id === enPassant.square.id) {

            enPassant.square.piece = temp
            enPassant.originalSquare.piece = ''
            squares[activeSquare.index].piece = ''

        } else {

            squares[newSquare.index].piece = temp
            squares[activeSquare.index].piece = ''

        }

        // setActiveSquare('')
        Game.resetState(squares, setSquares)
        setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w')
        // props.setCastling(Game.checkCastlingRights(props.squares, props.castling))
        setHalfMoveClock(0)
        if (activeSquare.piece.id.charAt(0) === 'b') setFullMoveNumber(prevfullMoveNumber => prevfullMoveNumber + 1)

    }

    static resetState = (squares, setSquares) => {

        let updatedSquares = [...squares]

        updatedSquares.forEach(square => {

            square.isPossibleCapture = false
            square.isPossibleMove = false
            square.highlight = false

        })

        setSquares(updatedSquares)

    }
}


