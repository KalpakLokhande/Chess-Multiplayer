function readFEN() {

    let initial = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

    let index = 0;
    let k = 8;

    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    for (let i = 0; i < initial.length; i++) {

        let char = initial.charAt(i)

        if (char === '/') {

            index = 0
            k--

        }
        else if (!isNaN(parseInt(char))) {

            index += parseInt(char)

        }
        else if (char === char.toLowerCase()) {

            let square = document.getElementById(letters[index]  + '' + k)

            let piece = new Pieces('b' + char)


            piece.setPiece('dark', piece.type)

            square.appendChild(piece.getPiece())
            // Pieces.appendPiece(square,piece.getPiece())

            index++


        }
        else if (char === char.toUpperCase()) {

            let square = document.getElementById(letters[index] + '' + k)
            let piece = new Pieces('w' + char.toLowerCase())
            piece.setPiece('light')


            square.appendChild(piece.getPiece())
            // Pieces.appendPiece(square,piece.getPiece())


            index++


        }

    }

}