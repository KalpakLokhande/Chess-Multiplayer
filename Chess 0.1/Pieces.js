class Pieces {

    constructor(type) {

        this.src = 'Assets/' + type + '.png'

        this.type = type

        this.firstMove = true;

        // if(this.type === 'wp' || this.type === 'bp'){

        //     this.firstMove = true

        // }

        // this.createPiece = document.createElement('img')
        // this.createPiece.src = this.src
        // this.createPiece.classList.add('piece')
        // this.createPiece.id = this.type;

        // console.log(this.createPiece)

        // this.piece = document.getElementById(this.type)
        // console.log(this.piece)
        // this.piece.onclick = this.#showMoves

    }

    setPiece(color) {

        this.color = color

        if (this.type === 'bp') {

            this.firstMove = true;

        }

    }

    getPiece() {

        this.createPiece = document.createElement('img')
        this.createPiece.src = this.src
        this.createPiece.style.width = 80 + 'px'
        this.createPiece.style.height = 80 + 'px'

        this.createPiece.id = this.type;

        if (this.type.substring(0, 1) === 'w') {

            this.createPiece.classList.add('whitePiece')

        } else if (this.type.substring(0, 1) === 'b') {

            this.createPiece.classList.add('blackPiece')

        }

        if (this.createPiece.id === 'bp' || this.createPiece.id === 'wp') {

            this.createPiece.firstMove = true

        }

        return this.createPiece
    }

    static showMoves(piece) {

        let possibleMoves = []
        // let possibleCaptures = []


        if (piece.id === 'bn' || piece.id === 'wn') {

            possibleMoves = Pieces.NightMoves(piece, false)
        }

        if (piece.id === 'bb' || piece.id === 'wb') {

            possibleMoves = Pieces.BishopMoves(piece, false)

        }
        if (piece.id === 'br' || piece.id === 'wr') {

            possibleMoves = Pieces.RookMoves(piece, false)

        }
        if (piece.id === 'bq' || piece.id === 'wq') {

            possibleMoves = Pieces.QueenMoves(piece, false)

        }
        if (piece.id === 'bk' || piece.id === 'wk') {

            possibleMoves = Pieces.KingMoves(piece, false)

        }
        if (piece.id === 'wp') {

            possibleMoves = Pieces.WhitePawnMoves(piece, false)

        }
        if (piece.id === 'bp') {

            possibleMoves = Pieces.BlackPawnMoves(piece, false)

        }

        return possibleMoves;

    }

    static EvaluateNewPosition(piece){

        let possibleMoves = []
        // let possibleCaptures = []


        if (piece.id === 'bn' || piece.id === 'wn') {

            possibleMoves = Pieces.NightMoves(piece, true)
        }

        if (piece.id === 'bb' || piece.id === 'wb') {

            possibleMoves = Pieces.BishopMoves(piece, true)

        }
        if (piece.id === 'br' || piece.id === 'wr') {

            possibleMoves = Pieces.RookMoves(piece, true)

        }
        if (piece.id === 'bq' || piece.id === 'wq') {

            possibleMoves = Pieces.QueenMoves(piece, true)

        }
        if (piece.id === 'bk' || piece.id === 'wk') {

            possibleMoves = Pieces.KingMoves(piece)
        }
        if (piece.id === 'wp') {

            possibleMoves = Pieces.WhitePawnMoves(piece, true)

        }
        if (piece.id === 'bp') {

            possibleMoves = Pieces.BlackPawnMoves(piece, true)

        }

        return possibleMoves;
    }

    static NightMoves(piece, check) {

        let currentSquare = piece.parentElement.id;

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let moves = [

            //TOP
            { x: -1, y: 2 }, { x: 1, y: 2 },
            //RIGHT
            { x: 2, y: 1 }, { x: 2, y: -1 },
            //BOTTOM
            { x: 1, y: -2 }, { x: -1, y: -2 },
            //LEFT
            { x: -2, y: -1 }, { x: -2, y: 1 }

        ]

        let possibleMoves = []
        let possibleCaptures = []


        for (let m of moves) {

            let row = String.fromCharCode(x + m.x)
            let column = parseInt(y + m.y)


            if (document.getElementById(row + '' + column)) {

                let p = document.getElementById(row + '' + column)

                if (p.hasChildNodes()) {

                    if (p.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

                        continue

                    } else {

                        if (Pieces.isCheck(p)) {

                            console.log('check!')

                        }

                        possibleCaptures.push(p)

                    }

                } else {

                    possibleMoves.push(p)

                }


            }

        }

        // for (let i = 0; i < possibleMoves.length; i++) {

        //     possibleMoves[i].style.background = 'rgba(0,0,255,0.8)'

        // }

        // for (let i = 0; i < possibleCaptures.length; i++) {

        //     possibleCaptures[i].style.background = 'rgba(255,0,0,0.8)'

        // }

        return [possibleMoves, possibleCaptures]
    }

    static BishopMoves(piece, check) {

        let currentSquare = piece.parentElement.id

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let UpRight = []
        let DownRight = []
        let DownLeft = []
        let UpLeft = []

        UpRight = [

            //TOP-RIGHT
            { x: 1, y: 1 }, { x: 2, y: 2 },
            { x: 3, y: 3 }, { x: 3, y: 3 },
            { x: 4, y: 4 }, { x: 4, y: 4 },
            { x: 5, y: 5 }, { x: 5, y: 5 },
            { x: 6, y: 6 }, { x: 6, y: 6 },
            { x: 7, y: 7 }, { x: 7, y: 7 },

        ]

        DownRight = [

            //BOTTOM-LEFT
            { x: -1, y: -1 }, { x: -2, y: -2 },
            { x: -3, y: -3 }, { x: -3, y: -3 },
            { x: -4, y: -4 }, { x: -4, y: -4 },
            { x: -5, y: -5 }, { x: -5, y: -5 },
            { x: -6, y: -6 }, { x: -6, y: -6 },
            { x: -7, y: -7 }, { x: -7, y: -7 },

        ]

        DownLeft = [

            //BOTTOM-RIGHT
            { x: 1, y: -1 }, { x: 2, y: -2 },
            { x: 3, y: -3 }, { x: 3, y: -3 },
            { x: 4, y: -4 }, { x: 4, y: -4 },
            { x: 5, y: -5 }, { x: 5, y: -5 },
            { x: 6, y: -6 }, { x: 6, y: -6 },
            { x: 7, y: -7 }, { x: 7, y: -7 },

        ]

        UpLeft = [

            //TOP-LEFT
            { x: -1, y: 1 }, { x: -2, y: 2 },
            { x: -3, y: 3 }, { x: -3, y: 3 },
            { x: -4, y: 4 }, { x: -4, y: 4 },
            { x: -5, y: 5 }, { x: -5, y: 5 },
            { x: -6, y: 6 }, { x: -6, y: 6 },
            { x: -7, y: 7 }, { x: -7, y: 7 },

        ]

        // let moves = [

        //     //TOP-RIGHT
        //     { x: 1, y: 1 }, { x: 2, y: 2 },
        //     { x: 3, y: 3 }, { x: 3, y: 3 },
        //     { x: 4, y: 4 }, { x: 4, y: 4 },
        //     { x: 5, y: 5 }, { x: 5, y: 5 },
        //     { x: 6, y: 6 }, { x: 6, y: 6 },
        //     { x: 7, y: 7 }, { x: 7, y: 7 },

        //     //BOTTOM-LEFT
        //     { x: -1, y: -1 }, { x: -2, y: -2 },
        //     { x: -3, y: -3 }, { x: -3, y: -3 },
        //     { x: -4, y: -4 }, { x: -4, y: -4 },
        //     { x: -5, y: -5 }, { x: -5, y: -5 },
        //     { x: -6, y: -6 }, { x: -6, y: -6 },
        //     { x: -7, y: -7 }, { x: -7, y: -7 },

        //     //BOTTOM-RIGHT
        //     { x: 1, y: -1 }, { x: 2, y: -2 },
        //     { x: 3, y: -3 }, { x: 3, y: -3 },
        //     { x: 4, y: -4 }, { x: 4, y: -4 },
        //     { x: 5, y: -5 }, { x: 5, y: -5 },
        //     { x: 6, y: -6 }, { x: 6, y: -6 },
        //     { x: 7, y: -7 }, { x: 7, y: -7 },

        //     //TOP-LEFT
        //     { x: -1, y: 1 }, { x: -2, y: 2 },
        //     { x: -3, y: 3 }, { x: -3, y: 3 },
        //     { x: -4, y: 4 }, { x: -4, y: 4 },
        //     { x: -5, y: 5 }, { x: -5, y: 5 },
        //     { x: -6, y: 6 }, { x: -6, y: 6 },
        //     { x: -7, y: 7 }, { x: -7, y: 7 },



        // ]

        let possibleMoves = []
        let possibleCaptures = []

        // for (let i = 0; i < UpRight.length; i++) {

        //     let row = String.fromCharCode(x + UpRight[i].x)
        //     let column = parseInt(y + UpRight[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < DownRight.length; i++) {

        //     let row = String.fromCharCode(x + DownRight[i].x)
        //     let column = parseInt(y + DownRight[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < DownLeft.length; i++) {

        //     let row = String.fromCharCode(x + DownLeft[i].x)
        //     let column = parseInt(y + DownLeft[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < UpLeft.length; i++) {

        //     let row = String.fromCharCode(x + UpLeft[i].x)
        //     let column = parseInt(y + UpLeft[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        let UpRightMoves = Pieces.getMovesPerDirection({ x, y }, UpRight, piece, false)
        let DownRightMoves = Pieces.getMovesPerDirection({ x, y }, DownRight, piece, false)
        let DownLeftMoves = Pieces.getMovesPerDirection({ x, y }, DownLeft, piece, false)
        let UpLeftMoves = Pieces.getMovesPerDirection({ x, y }, UpLeft, piece, false)

        let pM = possibleMoves.concat(UpRightMoves[0], UpLeftMoves[0], DownRightMoves[0], DownLeftMoves[0])
        let pC = possibleCaptures.concat(UpRightMoves[1], UpLeftMoves[1], DownRightMoves[1], DownLeftMoves[1])


        // for (let m of moves) {

        //     let row = String.fromCharCode(x + m.x)
        //     let column = parseInt(y + m.y)


        //     if (document.getElementById(row + '' + column) != null) {

        //         let p = document.getElementById(row + '' + column)

        //         if (p.hasChildNodes()) {

        //             if (p.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 continue

        //             } else {

        //                 possibleCaptures.push(p)

        //             }

        //         } else {

        //             possibleMoves.push(p)

        //         }

        //     }

        // }

        // for (let i = 0; i < possibleMoves.length; i++) {

        //     possibleMoves[i].style.background = 'rgba(0,0,255,0.8)'

        // }

        // for (let i = 0; i < possibleCaptures.length; i++) {

        //     'rgba(255,0,0,0.8)'
        //     possibleCaptures[i].style.background = 'rgba(255,0,0,0.8)'

        // }

        return [pM, pC]


    }

    static RookMoves(piece, check) {

        let currentSquare = piece.parentElement.id;

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let Up = []
        let Right = []
        let Down = []
        let Left = []

        Up = [

            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },

        ]

        Right = [

            //RIGHT
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 0 },
            { x: 6, y: 0 },
            { x: 7, y: 0 },

        ]

        Down = [

            //BOTTOM

            { x: 0, y: -1 },
            { x: 0, y: -2 },
            { x: 0, y: -3 },
            { x: 0, y: -4 },
            { x: 0, y: -5 },
            { x: 0, y: -6 },
            { x: 0, y: -7 },

        ]

        Left = [

            //LEFT
            { x: -1, y: 0 },
            { x: -2, y: 0 },
            { x: -3, y: 0 },
            { x: -4, y: 0 },
            { x: -5, y: 0 },
            { x: -6, y: 0 },
            { x: -7, y: 0 },

        ]

        // let moves = [

        //     //TOP
        //     { x: 0, y: 1 },
        //     { x: 0, y: 2 },
        //     { x: 0, y: 3 },
        //     { x: 0, y: 4 },
        //     { x: 0, y: 5 },
        //     { x: 0, y: 6 },
        //     { x: 0, y: 7 },

        //     //RIGHT
        //     { x: 1, y: 0 },
        //     { x: 2, y: 0 },
        //     { x: 3, y: 0 },
        //     { x: 4, y: 0 },
        //     { x: 5, y: 0 },
        //     { x: 6, y: 0 },
        //     { x: 7, y: 0 },

        //     //BOTTOM

        //     { x: 0, y: -1 },
        //     { x: 0, y: -2 },
        //     { x: 0, y: -3 },
        //     { x: 0, y: -4 },
        //     { x: 0, y: -5 },
        //     { x: 0, y: -6 },
        //     { x: 0, y: -7 },

        //     //LEFT
        //     { x: -1, y: 0 },
        //     { x: -2, y: 0 },
        //     { x: -3, y: 0 },
        //     { x: -4, y: 0 },
        //     { x: -5, y: 0 },
        //     { x: -6, y: 0 },
        //     { x: -7, y: 0 },


        // ]

        let possibleMoves = []
        let possibleCaptures = []

        // for (let i = 0; i < Up.length; i++) {

        //     let row = String.fromCharCode(x + Up[i].x)
        //     let column = parseInt(y + Up[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < Right.length; i++) {

        //     let row = String.fromCharCode(x + Right[i].x)
        //     let column = parseInt(y + Right[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break;

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < Down.length; i++) {

        //     let row = String.fromCharCode(x + Down[i].x)
        //     let column = parseInt(y + Down[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < Left.length; i++) {

        //     let row = String.fromCharCode(x + Left[i].x)
        //     let column = parseInt(y + Left[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break;

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        let UpMoves = Pieces.getMovesPerDirection({ x, y }, Up, piece, false)
        let RightMoves = Pieces.getMovesPerDirection({ x, y }, Right, piece, false)
        let DownMoves = Pieces.getMovesPerDirection({ x, y }, Down, piece, false)
        let LeftMoves = Pieces.getMovesPerDirection({ x, y }, Left, piece, false)

        let pM = possibleMoves.concat(UpMoves[0], RightMoves[0], DownMoves[0], LeftMoves[0])
        let pC = possibleCaptures.concat(UpMoves[1], RightMoves[1], DownMoves[1], LeftMoves[1])






        // for (let m of moves) {

        //     let row = String.fromCharCode(x + m.x)
        //     let column = parseInt(y + m.y)



        //     if (document.getElementById(row + '' + column)) {

        //         let p = document.getElementById(row + '' + column)

        //         if (p.hasChildNodes()) {

        //             if (p.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 continue

        //             } else {

        //                 possibleCaptures.push(p)

        //             }

        //         } else {

        //             possibleMoves.push(p)

        //         }
        //     }
        // }

        // for (let i = 0; i < possibleMoves.length; i++) {

        //     possibleMoves[i].style.background = 'rgba(0,0,255,0.8)'

        // }

        // for (let i = 0; i < possibleCaptures.length; i++) {

        //     possibleCaptures[i].style.background = 'rgba(255,0,0,0.8)'

        // }

        return [pM, pC]


    }

    static QueenMoves(piece, check) {

        let currentSquare = piece.parentElement.id

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let Up = []
        let UpRight = []
        let Right = []
        let DownRight = []
        let Down = []
        let DownLeft = []
        let Left = []
        let UpLeft = []


        // let possibleMoves = [];
        // let possibleCaptures = [];

        Up = [

            //TOP
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
            { x: 0, y: 4 },
            { x: 0, y: 5 },
            { x: 0, y: 6 },
            { x: 0, y: 7 },

        ]

        UpRight = [

            //TOP-RIGHT
            { x: 1, y: 1 }, { x: 2, y: 2 },
            { x: 3, y: 3 }, { x: 3, y: 3 },
            { x: 4, y: 4 }, { x: 4, y: 4 },
            { x: 5, y: 5 }, { x: 5, y: 5 },
            { x: 6, y: 6 }, { x: 6, y: 6 },
            { x: 7, y: 7 }, { x: 7, y: 7 }

        ]

        Right = [

            //RIGHT
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 0 },
            { x: 6, y: 0 },
            { x: 7, y: 0 },

        ]

        DownRight = [

            //BOTTOM-RIGHT
            { x: 1, y: -1 }, { x: 2, y: -2 },
            { x: 3, y: -3 }, { x: 3, y: -3 },
            { x: 4, y: -4 }, { x: 4, y: -4 },
            { x: 5, y: -5 }, { x: 5, y: -5 },
            { x: 6, y: -6 }, { x: 6, y: -6 },
            { x: 7, y: -7 }, { x: 7, y: -7 },

        ]

        Down = [

            //BOTTOM

            { x: 0, y: -1 },
            { x: 0, y: -2 },
            { x: 0, y: -3 },
            { x: 0, y: -4 },
            { x: 0, y: -5 },
            { x: 0, y: -6 },
            { x: 0, y: -7 },

        ]

        DownLeft = [

            //BOTTOM-LEFT
            { x: -1, y: -1 }, { x: -2, y: -2 },
            { x: -3, y: -3 }, { x: -3, y: -3 },
            { x: -4, y: -4 }, { x: -4, y: -4 },
            { x: -5, y: -5 }, { x: -5, y: -5 },
            { x: -6, y: -6 }, { x: -6, y: -6 },
            { x: -7, y: -7 }, { x: -7, y: -7 },

        ]

        Left = [

            //LEFT
            { x: -1, y: 0 },
            { x: -2, y: 0 },
            { x: -3, y: 0 },
            { x: -4, y: 0 },
            { x: -5, y: 0 },
            { x: -6, y: 0 },
            { x: -7, y: 0 },

        ]

        UpLeft = [

            //TOP-LEFT
            { x: -1, y: 1 }, { x: -2, y: 2 },
            { x: -3, y: 3 }, { x: -3, y: 3 },
            { x: -4, y: 4 }, { x: -4, y: 4 },
            { x: -5, y: 5 }, { x: -5, y: 5 },
            { x: -6, y: 6 }, { x: -6, y: 6 },
            { x: -7, y: 7 }, { x: -7, y: 7 },

        ]



        // for (let i = 0; i < Up.length; i++) {

        //     let row = String.fromCharCode(x + Up[i].x)
        //     let column = parseInt(y + Up[i].y)


        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break
        //                 // console.log(possible.firstChild.id.substring(0,1))

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < UpRight.length; i++) {

        //     let row = String.fromCharCode(x + UpRight[i].x)
        //     let column = parseInt(y + UpRight[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < Right.length; i++) {

        //     let row = String.fromCharCode(x + Right[i].x)
        //     let column = parseInt(y + Right[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < DownRight.length; i++) {

        //     let row = String.fromCharCode(x + DownRight[i].x)
        //     let column = parseInt(y + DownRight[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break;

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < Down.length; i++) {

        //     let row = String.fromCharCode(x + Down[i].x)
        //     let column = parseInt(y + Down[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break;

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < DownLeft.length; i++) {

        //     let row = String.fromCharCode(x + DownLeft[i].x)
        //     let column = parseInt(y + DownLeft[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break;

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < Left.length; i++) {

        //     let row = String.fromCharCode(x + Left[i].x)
        //     let column = parseInt(y + Left[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < UpLeft.length; i++) {

        //     let row = String.fromCharCode(x + UpLeft[i].x)
        //     let column = parseInt(y + UpLeft[i].y)

        //     if (!document.getElementById(row + '' + column)) {

        //         break

        //     } else {

        //         let possible = document.getElementById(row + '' + column)

        //         if (possible.hasChildNodes()) {

        //             if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

        //                 break

        //             } else {

        //                 if (Pieces.isCheck(possible)) {

        //                     console.log('check!')

        //                 }

        //                 possibleCaptures.push(possible)
        //                 break;

        //             }

        //         } else {

        //             possibleMoves.push(possible)

        //         }

        //     }


        // }

        // for (let i = 0; i < possibleMoves.length; i++) {

        //     // possibleMoves[i].style.background = 'rgba(0,0,255,0.8)'

        //     // possibleMoves[i].classList.add('possible')

        //     let div = document.createElement('div')
        //     div.style.width = Square.Size / 2.5 + 'px'
        //     div.style.height = Square.Size / 2.5 + 'px'
        //     div.style.background = 'black'
        //     div.style.opacity = '0.3'

        //     div.style.borderRadius = '50%'

        //     possibleMoves[i].appendChild(div)

        //     possibleMoves[i].addEventListener('click', () => {

        //         piece.parentElement.removeChild(piece)
        //         Pieces.appendPiece(possibleMoves[i], piece)

        //     })



        // }

        // for (let i = 0; i < possibleCaptures.length; i++) {

        //     possibleCaptures[i].style.background = 'rgba(255,0,0,0.8)'

        //     // let div = document.createElement('div')
        //     // div.style.width = Square.Size/1.5 + 'px'
        //     // div.style.height = Square.Size/1.5 + 'px'
        //     // div.style.background = 'black'
        //     // div.style.opacity = '0'
        //     // div.style.border = '5px solid rgba(0,0,0,0.3)'

        //     // console.log(Square.Size)
        //     // div.style.borderRadius = '50%'

        //     // possibleCaptures[i].appendChild(div)

        //     // possibleCaptures[i].innerHTML = `

        //     // <svg height = '80' width = '80'>

        //     // <circle cx = '40' cy='40' r = '30' stroke = 'rgba(0,0,0,0.3)' stroke-width = '8' fill='rgba(0,0,0,0)' />

        //     // </svg>`

        // }

        let possibleMoves = []
        let possibleCaptures = []

        let UpMoves = Pieces.getMovesPerDirection({ x, y }, Up, piece, check)
        let UpRightMoves = Pieces.getMovesPerDirection({ x, y }, UpRight, piece, check)
        let RightMoves = Pieces.getMovesPerDirection({ x, y }, Right, piece, check)
        let DownRightMoves = Pieces.getMovesPerDirection({ x, y }, DownRight, piece, check)
        let DownMoves = Pieces.getMovesPerDirection({ x, y }, Down, piece, check)
        let DownLeftMoves = Pieces.getMovesPerDirection({ x, y }, DownLeft, piece, check)
        let LeftMoves = Pieces.getMovesPerDirection({ x, y }, Left, piece, check)
        let UpLeftMoves = Pieces.getMovesPerDirection({ x, y }, UpLeft, piece, check)

        let pM = possibleMoves.concat(UpMoves[0], UpRightMoves[0], RightMoves[0], DownRightMoves[0], DownMoves[0], DownLeftMoves[0], LeftMoves[0], UpLeftMoves[0])
        let pC = possibleCaptures.concat(UpMoves[1], UpRightMoves[1], RightMoves[1], DownRightMoves[1], DownMoves[1], DownLeftMoves[1], LeftMoves[1], UpLeftMoves[1])

        return [pM, pC]

    }

    static KingMoves(piece) {

        let currentSquare = piece.parentElement.id;

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let moves = [
            { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
            { x: -1, y: 0 }, { x: 1, y: 0 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },

        ]

        let possibleMoves = []
        let possibleCaptures = [];

        for (let m of moves) {

            let row = String.fromCharCode(x + m.x)
            let column = parseInt(y + m.y)

            if (document.getElementById(row + '' + column)) {

                let p = document.getElementById(row + '' + column)

                if (p.hasChildNodes()) {

                    if (p.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

                        continue

                    } else {

                        possibleCaptures.push(p)

                    }

                } else {

                    possibleMoves.push(p)

                }
            }

        }

        // for (let i = 0; i < possibleMoves.length; i++) {

        //     possibleMoves[i].style.background = 'rgba(0,0,255,0.8)'

        // }
        // for (let i = 0; i < possibleCaptures.length; i++) {

        //     possibleCaptures[i].style.background = 'rgba(255,0,0,0.8)'

        // }

        return [possibleMoves, possibleCaptures]


    }

    static WhitePawnMoves(piece, check) {

        let currentSquare = piece.parentElement.id

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let Moves = []
        let Captures = []

        if (piece.firstMove) {

            Moves = [

                { x: 0, y: 1 },
                { x: 0, y: 2 }

            ]

        } else {

            Moves = [

                { x: 0, y: 1 }

            ]

            Captures = [

                { x: 1, y: 1 }, { x: -1, y: 1 }

            ]

        }


        let possibleMoves = []
        let possibleCaptures = []


        for (let i = 0; i < Moves.length; i++) {

            let row = String.fromCharCode(x + Moves[i].x)
            let column = parseInt(y + Moves[i].y)

            if (!document.getElementById(row + '' + column)) {

                break

            } else {

                let possible = document.getElementById(row + '' + column)

                if (possible.hasChildNodes()) {

                    break

                }

                possibleMoves.push(possible)

            }

        }

        for (let i = 0; i < Captures.length; i++) {

            let row = String.fromCharCode(x + Captures[i].x)
            let column = parseInt(y + Captures[i].y)

            if (!document.getElementById(row + '' + column)) {

                continue

            } else {

                let possible = document.getElementById(row + '' + column)

                if (possible.hasChildNodes()) {

                    if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

                        continue

                    } else {

                        if (Pieces.isCheck(possible)) {

                            console.log('check!')

                        }

                        possibleCaptures.push(possible)

                    }

                }

            }

        }


        // for (let i = 0; i < possibleMoves.length; i++) {


        //     possibleMoves[i].style.background = 'blue'

        //     possibleMoves[i].addEventListener('click', () => {

        //         Pieces.appendPiece(possibleMoves[i], piece)

        //     })

        // }

        // for(let i = 0; i < possibleCaptures.length; i++){

        //     possibleCaptures[i].style.background = 'red'

        // }

        if (piece.firstMove) {

            piece.firstMove = false;

        }

        return [possibleMoves, possibleCaptures]


    }

    static BlackPawnMoves(piece, check) {

        let currentSquare = piece.parentElement.id

        let x = currentSquare.substring(0, 1).charCodeAt()
        let y = parseInt(currentSquare.substring(1, 2))

        let Moves = []
        let Captures = []

        if (piece.firstMove) {

            Moves = [

                { x: 0, y: -1 },
                { x: 0, y: -2 }

            ]

        } else {

            Moves = [

                { x: 0, y: -1 }

            ]

            Captures = [

                { x: 1, y: -1 }, { x: -1, y: -1 }

            ]

        }


        let possibleMoves = []
        let possibleCaptures = []


        for (let i = 0; i < Moves.length; i++) {

            let row = String.fromCharCode(x + Moves[i].x)
            let column = parseInt(y + Moves[i].y)

            if (!document.getElementById(row + '' + column)) {

                break

            } else {

                let possible = document.getElementById(row + '' + column)

                if (possible.hasChildNodes()) {

                    break

                }

                possibleMoves.push(possible)

            }

        }

        for (let i = 0; i < Captures.length; i++) {

            let row = String.fromCharCode(x + Captures[i].x)
            let column = parseInt(y + Captures[i].y)

            if (!document.getElementById(row + '' + column)) {

                continue

            } else {

                let possible = document.getElementById(row + '' + column)

                if (possible.hasChildNodes()) {

                    if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

                        continue

                    } else {

                        if (Pieces.isCheck(possible)) {

                            console.log('check!')

                        }

                        possibleCaptures.push(possible)

                    }

                }

            }

        }


        // for (let i = 0; i < possibleMoves.length; i++) {


        //     possibleMoves[i].style.background = 'blue'

        //     possibleMoves[i].addEventListener('click', () => {

        //         Pieces.appendPiece(possibleMoves[i], piece)

        //     })

        // }

        // for(let i = 0; i < possibleCaptures.length; i++){

        //     possibleCaptures[i].style.background = 'red'

        // }

        if (piece.firstMove) {

            piece.firstMove = false;

        }

        return [possibleMoves, possibleCaptures]


    }

    static appendPiece(square, piece) {

        square.appendChild(piece)

        Pieces.EvaluateNewPosition(piece)

        game.moveCount++

    }

    static isCheck(attackedSquare) {

        if (attackedSquare.firstChild.id.substring(1, 2) === 'k') {

            return true;

        }

    }

    static getMovesPerDirection({ x, y }, movesArray, piece, check) {

        let possibleMoves = []
        let possibleCaptures = []

        for (let i = 0; i < movesArray.length; i++) {

            let row = String.fromCharCode(x + movesArray[i].x)
            let column = parseInt(y + movesArray[i].y)

            if (!document.getElementById(row + '' + column)) {

                break

            } else {

                let possible = document.getElementById(row + '' + column)


                if (possible.hasChildNodes()) {

                    if (possible.firstChild.id.substring(0, 1) === piece.id.substring(0, 1)) {

                        break

                    } else {

                        if (check && Pieces.isCheck(possible)) {

                            console.log('Check!')
                            // checkRay = movesArray

                            if(piece.id.substring(0,1) === 'w'){

                                game.player2.isInCheck = true;
                                console.log(possibleMoves)
                                game.player2.checkRay = possibleMoves
                                console.log(game.player2.checkRay)

                            }else if(piece.id.substring(0,1) === 'b'){

                                game.player1.isInCheck = true;
                                console.log(possibleMoves)
                                game.player1.checkRay = possibleMoves
                                console.log(game.player1.checkRay)



                            }

                        }

                        possibleCaptures.push(possible)
                        break;

                    }

                } else {

                    possibleMoves.push(possible)

                }

            }

        }

        // console.log(possibleMoves)

        return [possibleMoves, possibleCaptures]

    }
}