class Board{

    constructor(){

        let board = document.createElement('div')

        let letters = ['a','b','c','d','e','f','g','h']

        board.style.width = Square.Size * 8 + 'px'
        board.style.height = Square.Size * 8 + 'px'

        let dark = false;
        let index = 0;
        let k = 8;

    
        for(let i = 0; i < 64; i++){

            let square = new Square()

            if(dark){

                square.setSquare('dark')
                square.square.id = letters[index] + k
                dark = !dark
                index++

            }else{

                square.setSquare('light')
                square.square.id = letters[index] + k
                dark = !dark
                index++

            }

            if(index === 8){

                index = 0;
                k--
                dark = !dark

            }

            board.appendChild(square.getSquare())
        }

        document.body.appendChild(board)

    }

}