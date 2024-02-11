export default class Moves {

    static getMoves = (square, squares) => {

        let legalMoves = [[], []]

        if (square.piece.charAt(1) === 'p') legalMoves = Moves.getPawnMoves(square, squares)
        if (square.piece.charAt(1) === 'b') legalMoves = Moves.getBishopMoves(square, squares)
        if (square.piece.charAt(1) === 'r') legalMoves = Moves.getRookMoves(square, squares)
        if (square.piece.charAt(1) === 'q') legalMoves = Moves.getQueenMoves(square, squares)
        if (square.piece.charAt(1) === 'k') legalMoves = Moves.getKingMoves(square, squares)
        if (square.piece.charAt(1) === 'n') legalMoves = Moves.getNightMoves(square, squares)

        // if (isCheck.length > 0 && squares[square.index].piece.charAt(1) !== 'k') {

        //     let moves = legalMoves
        //     let defenseMoves = [[], [], [], []]

        //     for (let i = 0; i < moves[0].length; i++) {

        //         for (let j = 0; j < isCheck[1].length; j++) {

        //             if (moves[0][i] === isCheck[1][j]) defenseMoves[0].push(moves[0][i])

        //         }

        //     }

        //     for (let i = 0; i < moves[1].length; i++) {

        //         for (let j = 0; j < isCheck[0].length; j++) {

        //             if (moves[1][i] === isCheck[0][j]) defenseMoves[1].push(moves[1][i])

        //         }

        //     }

        //     legalMoves = defenseMoves

        // }

        return legalMoves
    }

    static getLegalMoves = (square, possibleMoves, squares) => {

        let moves = [[], []]
        let originSquare = squares[square.index]
        let originPiece = squares[square.index].piece
        
        for (let i = 0; i < possibleMoves[0].length; i++) {
            
            originSquare.piece = ''
            possibleMoves[0][i].piece = originPiece
            let check = Moves.getAllPossibleMoves(squares, square.piece.charAt(0) === 'b' ? 'w' : 'b')
            if (!check[1].some(sq => sq.piece === square.piece.charAt(0) + 'k')) moves[0].push(possibleMoves[0][i])

            possibleMoves[0][i].piece = ''
            originSquare.piece = originPiece

        }

        for (let i = 0; i < possibleMoves[1].length; i++) {

            let simPiece = possibleMoves[1][i].piece
            originSquare.piece = ''
            possibleMoves[1][i].piece = originPiece

            let check = Moves.getAllPossibleMoves(squares, square.piece.charAt(0) === 'b' ? 'w' : 'b')

            if (!check[1].some(sq => sq.piece === square.piece.charAt(0) + 'k')) moves[1].push(possibleMoves[1][i])

            possibleMoves[1][i].piece = simPiece
            originSquare.piece = originPiece

        }

        return moves

    }

    static getAllPossibleMoves = (squares, currentPlayer) => {

        let pieces = []
        let moves = [[], []]

        for (let i = 0; i < squares.length; i++) {

            if (squares[i].piece && squares[i].piece.charAt(0) === currentPlayer) {

                pieces.push(squares[i])

            }

        }

        for (let i = 0; i < pieces.length; i++) {

            let m = Moves.getMoves(squares[pieces[i].index], squares)
            moves[0].push(...m[0])
            moves[1].push(...m[1])

        }

        return moves

    }

    static getPawnMoves = (square, squares) => {

        let moves = [[], []]
        let legalMoves = [[], []]

        let direction = square.piece.charAt(0) === 'b' ? -1 : 1
        let firstMove = square.id.charAt(1) === '2' || square.id.charAt(1) === '7'

        if (firstMove) {

            moves[0].push(square.id.charAt(0) + (parseInt(square.id.charAt(1)) + direction))
            moves[0].push(square.id.charAt(0) + (parseInt(square.id.charAt(1)) + (direction * 2)))

        } else {

            moves[0].push(square.id.charAt(0) + (parseInt(square.id.charAt(1)) + direction))

        }

        moves[1].push(String.fromCharCode(square.id.charCodeAt(0) - 1) + '' + (parseInt(square.id.charAt(1)) + direction))
        moves[1].push(String.fromCharCode(square.id.charCodeAt(0) + 1) + '' + (parseInt(square.id.charAt(1)) + direction))


        for (let i = 0; i < moves[0].length; i++) {

            let index = 64 - (parseInt(moves[0][i].charAt(1)) * 8) + (parseInt(moves[0][i].charCodeAt(0)) - 65)

            if (squares[index] && !squares[index].piece) {

                legalMoves[0].push(squares[index])

            } else break

        }

        for (let i = 0; i < moves[1].length; i++) {

            let index = 64 - (parseInt(moves[1][i].charAt(1)) * 8) + (parseInt(moves[1][i].charCodeAt(0)) - 65)

            if (squares[index] && squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])

            }

        }

        return legalMoves

    }

    static getBishopMoves = (square, squares) => {

        let legalMoves = [[], []]

        let squaresToTopRight = Math.min(72 - square.id.charCodeAt(0), 8 - parseInt(square.id.charAt(1))),
            squaresToTopLeft = Math.min(Math.abs(65 - square.id.charCodeAt(0)), 8 - parseInt(square.id.charAt(1))),
            squaresToBottomLeft = Math.min(Math.abs(65 - square.id.charCodeAt(0)), parseInt(square.id.charAt(1)) - 1),
            squaresToBottomRight = Math.min((72 - square.id.charCodeAt(0)), Math.abs(parseInt(square.id.charAt(1)) - 1))

        for (let i = 1; i <= squaresToTopRight; i++) {

            let index = 64 - ((parseInt(square.id.charAt(1)) + i) * 8) + ((square.id.charCodeAt(0) + i) - 65)
            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }


        }

        for (let i = 1; i <= squaresToBottomRight; i++) {

            // moves.push((String.fromCharCode(square.id.charCodeAt(0) + i)) + '' + (parseInt(square.id.charAt(1)) - i))
            let index = 64 - ((parseInt(square.id.charAt(1)) - i) * 8) + ((square.id.charCodeAt(0) + i) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }

        }

        for (let i = 1; i <= squaresToBottomLeft; i++) {

            // moves.push((String.fromCharCode(square.id.charCodeAt(0) - i)) + '' + (parseInt(square.id.charAt(1)) - i))
            let index = 64 - ((parseInt(square.id.charAt(1)) - i) * 8) + ((square.id.charCodeAt(0) - i) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }

        }

        for (let i = 1; i <= squaresToTopLeft; i++) {

            // moves.push((String.fromCharCode(square.id.charCodeAt(0) - i)) + '' + (parseInt(square.id.charAt(1)) + i))
            let index = 64 - ((parseInt(square.id.charAt(1)) + i) * 8) + ((square.id.charCodeAt(0) - i) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }

        }

        return legalMoves

    }

    static getRookMoves = (square, squares) => {

        let legalMoves = [[], []]

        let squaresToTop = 8 - parseInt(square.id.charAt(1)),
            squaresToBottom = Math.abs(1 - parseInt(square.id.charAt(1))),
            squaresToLeft = square.id.charCodeAt(0) - 65,
            squaresToRight = Math.abs(72 - square.id.charCodeAt(0))


        for (let i = 1; i <= squaresToTop; i++) {

            // up.push(square.id.charAt(0) + '' + (parseInt(square.id.charAt(1)) + i))

            let index = 64 - (parseInt(square.id.charAt(1)) + i) * 8 + (parseInt(square.id.charCodeAt(0)) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }

        }
        for (let i = 1; i <= squaresToBottom; i++) {

            // down.push(square.id.charAt(0) + '' + (parseInt(square.id.charAt(1)) - i))

            let index = 64 - (parseInt(square.id.charAt(1)) - i) * 8 + (parseInt(square.id.charCodeAt(0)) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }

        }
        for (let i = 1; i <= squaresToLeft; i++) {

            // left.push(String.fromCharCode(square.id.charCodeAt(0) - i) + '' + square.id.charAt(1))

            let index = 64 - (parseInt(square.id.charAt(1))) * 8 + (parseInt(square.id.charCodeAt(0) - i) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }


        }
        for (let i = 1; i <= squaresToRight; i++) {

            // right.push(String.fromCharCode(square.id.charCodeAt(0) + i) + '' + square.id.charAt(1))

            let index = 64 - (parseInt(square.id.charAt(1))) * 8 + (parseInt(square.id.charCodeAt(0) + i) - 65)

            if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) break
            if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                legalMoves[1].push(squares[index])
                break

            } else {

                legalMoves[0].push(squares[index])

            }

        }

        return legalMoves

    }

    static getQueenMoves = (square, squares, isCheck) => {

        let legalMoves = [[], []]

        let bisMov = Moves.getBishopMoves(square, squares)
        let rooMov = Moves.getRookMoves(square, squares)

        legalMoves[0].push(...bisMov[0], ...rooMov[0])
        legalMoves[1].push(...bisMov[1], ...rooMov[1])

        return legalMoves

    }

    static getKingMoves = (square, squares, isCheck) => {

        let legalMoves = [[], []]

        for (let i = -1; i < 2; i++) {

            for (let j = -1; j < 2; j++) {

                if (i === 0 && j === 0) continue
                let index = 64 - (parseInt(square.id.charAt(1)) + j) * 8 + (parseInt(square.id.charCodeAt(0) + i) - 65)

                if (squares[index] && squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) continue
                if (squares[index] && squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                    legalMoves[1].push(squares[index])

                } else if (squares[index]) {

                    legalMoves[0].push(squares[index])

                }

            }

        }

        return legalMoves

    }

    static getNightMoves = (square, squares) => {

        let moves = []

        moves.push((String.fromCharCode(square.id.charCodeAt(0) + 1)) + '' + (parseInt(square.id.charAt(1)) + 2))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) + 2)) + '' + (parseInt(square.id.charAt(1)) + 1))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) + 2)) + '' + (parseInt(square.id.charAt(1)) - 1))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) + 1)) + '' + (parseInt(square.id.charAt(1)) - 2))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) - 1)) + '' + (parseInt(square.id.charAt(1)) - 2))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) - 2)) + '' + (parseInt(square.id.charAt(1)) - 1))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) - 2)) + '' + (parseInt(square.id.charAt(1)) + 1))
        moves.push((String.fromCharCode(square.id.charCodeAt(0) - 1)) + '' + (parseInt(square.id.charAt(1)) + 2))

        let legalMoves = [[], []]
        for (let i = 0; i < moves.length; i++) {

            if ((parseInt(moves[i].charCodeAt(0)) <= 72) && (parseInt(moves[i].charCodeAt(0)) >= 65) && (parseInt(moves[i].substring(1)) <= 8) && (parseInt(moves[i].substring(1)) >= 1)) {

                let index = 64 - (parseInt(moves[i].charAt(1))) * 8 + (parseInt(moves[i].charCodeAt(0)) - 65)

                if (squares[index].piece && squares[index].piece.charAt(0) === square.piece.charAt(0)) continue
                if (squares[index].piece && squares[index].piece.charAt(0) !== square.piece.charAt(0)) {

                    legalMoves[1].push(squares[index])

                } else {

                    legalMoves[0].push(squares[index])

                }

            }


        }
        return legalMoves

    }
}