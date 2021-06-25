import React, { useState, useEffect, useRef } from 'react';

const TweetSearch = props => {
    const { onGetTweets } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const hasValue = enteredFilter.length && inputRef.current.value.length;
                let uri = hasValue ? `/list?q=${enteredFilter}` : `/list`;
                onGetTweets(enteredFilter, 'search', uri);
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [enteredFilter, inputRef]);

    return (
        <div className="tweet-search__container">

            <input
                type="search"
                placeholder="Search by keyword"
                value={enteredFilter}
                ref={inputRef}
                onChange={event => setEnteredFilter(event.target.value)} />

        </div>
    );
}

export default React.memo(TweetSearch);
