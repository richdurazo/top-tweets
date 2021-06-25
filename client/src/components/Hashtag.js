import React from 'react';

const Hashtag = props => {
    const { tag, onFilterByTag, selected } = props;
    return (
        <div className="hashtag-button-container">
            <button
                style={{border: selected && '1px solid #377ab5'}}
                className="hashtag-button"
                key={tag}
                onClick={()=> onFilterByTag(tag)}>
                    <span>#{tag}</span>
            </button>
        </div>
    );
}

export default Hashtag;
