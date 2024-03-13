import React from 'react'

const Piece = (props) => {

    // console.log(props.id.id)

    return (
        <div >
            <img className='piece' src={ require('./Assets/' + props.id.id + '.png' )} alt=''></img>
        </div>
    )
}

export default Piece
