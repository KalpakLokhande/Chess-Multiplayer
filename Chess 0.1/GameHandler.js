class Player {

    constructor(name) {

        if (name === 'white') {

            this.pieces = document.querySelectorAll('.whitePiece')

        } else {

            this.pieces = document.querySelectorAll('.blackPiece')

        }

        this.isInCheck = false;
        this.checkRay = []
        this.attacker;

    }

    static createPlayers() {

        let white, black;

        white = new Player('white')
        black = new Player('black')

        return [white, black]

    }

    static DefendAgainstCheck(legalMoves,checkRay){

        let possibleMoves = []
        let possibleCapture = []

        // console.log(this.checkRay)

        // let pieceWithLegalMoves = this.getPiecesWithLegalMoves()

        for(let i = 0; i < legalMoves.length; i++){

            for(let j = 0; j < this.checkRay.length; j++){

                if(legalMoves[i][0].possibleSquare === this.checkRay[j]){

                    possibleMoves.push(legalMoves[i])

                }

                if(legalMoves[i][1].possibleCapture.firstChild === this.attacker){

                    possibleCapture.push(legalMoves[i])

                }

            }

        }

        if(possibleMoves.length === 0 && possibleCapture.length === 0){

            console.log('CheckMate')

        }

        let r = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

        
        this.isInCheck = false;
        this.attacker = null
        this.checkRay = []

        Pieces.appendPiece(r.possibleSquare, r.piece)
       
    }

    move() {

        let pieceWithLegalMoves = this.getPiecesWithLegalMoves()


        if(this.isInCheck){

            Player.DefendAgainstCheck(pieceWithLegalMoves)

            return

        }


        let r = pieceWithLegalMoves[0][Math.floor(Math.random() * pieceWithLegalMoves[0].length)]

        Pieces.appendPiece(r.possibleSquare, r.piece)

    }

    getPiecesWithLegalMoves() {

        let possibleMoves = []
        let possibleCaptures = []

        for (let i = 0; i < this.pieces.length; i++) {

            let possible = Pieces.showMoves(this.pieces[i])

            if (possible[0].length > 0) {

                for (let j = 0; j < possible[0].length; j++) {

                    possibleMoves.push({

                        piece: this.pieces[i],
                        currentSquare: this.pieces[i].parentElement,
                        possibleSquare: possible[0][j]

                    })

                }

            }

            if (possible[1].length > 0) {

                for (let k = 0; k < possible[1].length; k++) {

                    possibleCaptures.push({

                        piece: this.pieces[i],
                        currentSquare: this.pieces[i].parentElement,
                        possibleCapture: possible[1][k]

                    })

                }

            }

        }

        return [possibleMoves, possibleCaptures]

    }

}

class Game {

    constructor() {

        this.moveCount = 1

        const board = new Board()

        readFEN()

        let Players = Player.createPlayers()

        this.player1 = Players[0]
        this.player2 = Players[1]

    }

    Start() {

        let play = setInterval(() => {

            if (this.moveCount % 2 == 0) {

                this.player1.move()


            } else {

                this.player2.move()

            }

            if (this.moveCount > 100) {

                clearInterval(play)

            }


        }, 800)

    }

}