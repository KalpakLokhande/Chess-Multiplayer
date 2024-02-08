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
}
