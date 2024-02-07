import React from 'react'

const Piece = (props) => {

    return (
        <div >
            <img className='piece' src={ require('./Assets/' + props.id + '.png' )} alt=''></img>
        </div>
    )
}

export default Piece
