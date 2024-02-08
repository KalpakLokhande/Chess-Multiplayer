export default class Moves {

    static getMoves = (square) => {

        let moves = []

        if (square.piece.charAt(1) === 'p') moves = Moves.getPawnMoves(square)
        if (square.piece.charAt(1) === 'b') moves = Moves.getBishopMoves(square)
        if (square.piece.charAt(1) === 'r') moves = Moves.getRookMoves(square)
        if (square.piece.charAt(1) === 'q') moves = Moves.getQueenMoves(square)
        if (square.piece.charAt(1) === 'k') moves = Moves.getKingMoves(square)
        if (square.piece.charAt(1) === 'n') moves = Moves.getNightMoves(square)

        return moves

    }

    static getPawnMoves = (square) => {

        let moves = []

        let direction = square.piece.charAt(0) === 'b' ? -1 : 1
        let firstMove = square.id.charAt(1) === '2' || square.id.charAt(1) === '7'

        if (firstMove) {

            moves.push([square.id.charAt(0) + (parseInt(square.id.charAt(1)) + direction)])
            moves.push([square.id.charAt(0) + (parseInt(square.id.charAt(1)) + (direction * 2))])

        } else {

            moves.push([square.id.charAt(0) + (parseInt(square.id.charAt(1)) + direction)])

        }

        return moves

    }

    static getBishopMoves = (square) => {

        let moves = []

        let squaresToTopRight = Math.min(72 - square.id.charCodeAt(0), 8 - parseInt(square.id.charAt(1))),
            squaresToTopLeft = Math.min(Math.abs(65 - square.id.charCodeAt(0)), 8 - parseInt(square.id.charAt(1))),
            squaresToBottomLeft = Math.min(Math.abs(65 - square.id.charCodeAt(0)), parseInt(square.id.charAt(1)) - 1),
            squaresToBottomRight = Math.min((72 - square.id.charCodeAt(0)), Math.abs(parseInt(square.id.charAt(1)) - 1)),
            diagonalUpRight = [],
            diagonalDownRight = [],
            diagonalDownLeft = [],
            diagonalUpLeft = []

        for (let i = 1; i <= squaresToTopRight; i++) {

            diagonalUpRight.push((String.fromCharCode(square.id.charCodeAt(0) + i)) + '' + (parseInt(square.id.charAt(1)) + i))

        }

        for (let i = 1; i <= squaresToBottomRight; i++) {

            diagonalDownRight.push((String.fromCharCode(square.id.charCodeAt(0) + i)) + '' + (parseInt(square.id.charAt(1)) - i))

        }

        for (let i = 1; i <= squaresToBottomLeft; i++) {

            diagonalDownLeft.push((String.fromCharCode(square.id.charCodeAt(0) - i)) + '' + (parseInt(square.id.charAt(1)) - i))

        }

        for (let i = 1; i <= squaresToTopLeft; i++) {

            diagonalUpLeft.push((String.fromCharCode(square.id.charCodeAt(0) - i)) + '' + (parseInt(square.id.charAt(1)) + i))

        }

        moves.push(diagonalUpRight, diagonalDownRight, diagonalDownLeft, diagonalUpLeft)

        return moves

    }

    static getRookMoves = (square) => {

        let moves = []

        let squaresToTop = 8 - parseInt(square.id.charAt(1)),
            squaresToBottom = Math.abs(1 - parseInt(square.id.charAt(1))),
            squaresToLeft = square.id.charCodeAt(0) - 65,
            squaresToRight = Math.abs(72 - square.id.charCodeAt(0)),
            up = [],
            right = [],
            down = [],
            left = []

        for (let i = 1; i <= squaresToTop; i++) {

            up.push(square.id.charAt(0) + '' + (parseInt(square.id.charAt(1)) + i))

        }
        for (let i = 1; i <= squaresToBottom; i++) {

            down.push(square.id.charAt(0) + '' + (parseInt(square.id.charAt(1)) - i))

        }
        for (let i = 1; i <= squaresToLeft; i++) {

            left.push(String.fromCharCode(square.id.charCodeAt(0) - i) + '' + square.id.charAt(1))

        }
        for (let i = 1; i <= squaresToRight; i++) {

            right.push(String.fromCharCode(square.id.charCodeAt(0) + i) + '' + square.id.charAt(1))

        }

        moves.push(up, down, left, right)

        return moves

    }

    static getQueenMoves = (square) => {

        let moves = []

        moves.push(...Moves.getBishopMoves(square))
        moves.push(...Moves.getRookMoves(square))

        return moves

    }

    static getKingMoves = (square) => {

        let moves = []

        for (let i = -1; i < 2; i++) {

            for (let j = -1; j < 2; j++) {

                if (i === 0 && j === 0) continue
                moves.push([(String.fromCharCode(square.id.charCodeAt(0) + i)) + '' + (parseInt(square.id.charAt(1)) + j)])

            }

        }

        return moves

    }

    static getNightMoves = (square) => {

        let moves = []

        moves.push([(String.fromCharCode(square.id.charCodeAt(0) + 1)) + '' + (parseInt(square.id.charAt(1)) + 2)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) + 2)) + '' + (parseInt(square.id.charAt(1)) + 1)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) + 2)) + '' + (parseInt(square.id.charAt(1)) - 1)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) + 1)) + '' + (parseInt(square.id.charAt(1)) - 2)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) - 1)) + '' + (parseInt(square.id.charAt(1)) - 2)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) - 2)) + '' + (parseInt(square.id.charAt(1)) - 1)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) - 2)) + '' + (parseInt(square.id.charAt(1)) + 1)])
        moves.push([(String.fromCharCode(square.id.charCodeAt(0) - 1)) + '' + (parseInt(square.id.charAt(1)) + 2)])

        return moves

    }
}