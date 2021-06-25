import React, { useEffect, useState } from 'react';
import Loader from './UI/Loader';

const TweetLoadMore = props => {
    const { enteredFilter,nextResults, onLoadMore, loading } = props;
    const [showNext, setShowNext] = useState(null);

    useEffect(() => {
        setShowNext(nextResults && enteredFilter);
    }, [nextResults, enteredFilter]);

    const LoadMoreHandler = () => {
        onLoadMore(enteredFilter, 'loadMore', `/list${nextResults}`)
    }

    return (
        <div className="load-more-container">
            { loading && <Loader /> }
            { showNext && !loading && <div className="load-more-button" onClick={LoadMoreHandler}>Load More</div> }
        </div>
    );
}

export default TweetLoadMore;
