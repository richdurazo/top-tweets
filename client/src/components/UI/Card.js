import React from 'react';

const Card = props => {
    return (
        <div className="card-container">
            {props.children}  
        </div>
    );
}

export default Card;
