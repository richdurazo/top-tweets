import React from 'react';
import Hashtag from './Hashtag';

const Tweet = props => {
    const { tweet, onFilterByTag, idx} = props;

    return (
        <div style={{padding: '10px', display: 'flex', flexDirection: 'row', gap: '10px', backgroundColor: idx % 2 !== 0 && '#f8f9f9' }}>
            <div style={{marginLeft: '5px'}}>
                <div className="tweet-image-container">
                    <img src={tweet.profileImage} alt="" />
                </div>
            </div>
            <div>
                <div style={{ fontWeight: '500', color: '#000f2a', fontSize: '12px', marginBottom: '1em'}}>@{tweet.screenName}</div>
                <div style={{whiteSpace: 'pre-line', fontSize: '12px'}}>{tweet.tweetText}</div>
                { tweet.tweetUrl && tweet.tweetUrl !== null && <a href={tweet.tweetUrl} target="_blank">{tweet.tweetUrl}</a> }
                
                <div className="hashtag-list-container">{tweet.hashtags.map(tag => <Hashtag tag={tag} key={tag} onFilterByTag={onFilterByTag} />)}</div>
            </div>
        </div>
    );
}

export default Tweet;
