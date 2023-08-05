class Square{

    static Size = 80

    constructor(){

        this.square = document.createElement('div')

        this.square.classList.add('square')
        this.square.style.width = Square.Size + 'px'
        this.square.style.height = Square.Size + 'px'
        this.square.hasPiece = false;

    }

    setSquare(color){

        this.color = color

        this.square.classList.add(this.color)
    }

    getSquare(){

        return this.square

    }


}