import React from 'react';
import Tweet from './Tweet';

const TweetList = props => {
    const { onFilterByTag } = props;
    return (        
        <section className="tweet-list">
                {
                    props.tweets.map((tweet, i) => <Tweet idx={i} key={tweet.id} tweet={tweet} onFilterByTag={onFilterByTag}/>)
                }
        </section>
    );
}

export default TweetList;
