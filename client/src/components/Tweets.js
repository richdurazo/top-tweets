import React, { useState, useCallback, useReducer } from 'react';
import TweetSearch from './TweetSearch';
import TweetList from './TweetList';
import TweetLoadMore from './TweetLoadMore';
import HashtagList from './HashtagList';
import axios from '../utils/axios-instance';
import Card from './UI/Card';

const httpReducer = (currentHttpState, action) => {
    switch(action.type) {
        case 'SEND':
            return { loading: true, error: null };
        case 'RESPONSE':
            return { ...currentHttpState, loading: false };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
            default:
                throw new Error('Should not be reached!');
    }
}

const Tweets = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});
    const [userTweets, setUserTweets] = useState([]);
    const [enteredFilter, setEnteredFilter] = useState(null);
    const [nextResults, setNextResults] = useState(null);
    const [hashtags, setHashtags] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filteredTag, setFilteredTag] = useState('');

    const checkHashtags = (tweets, currentTags) => {
        tweets.forEach(tweet => {
            if (
                tweet.hashtags 
                && tweet.hashtags.length 
                && tweet.hashtags.length > 0
                ) {
                for (const tag of tweet.hashtags) {
                    if (currentTags.indexOf(tag) === -1) {
                        currentTags.push(tag);
                    }
                }
            }
        });
        setHashtags(currentTags);
    }

    const filterByTagHandler = (tag) => {
        if (tag && tag !== filteredTag) {
            setFilteredTag(tag);
            let tweetsToFilter = [];
            userTweets.forEach(tweet => {
                if (tweet.hashtags.indexOf(tag) !== -1) {
                    tweetsToFilter.push(tweet)
                }
            });
            setFilteredList(tweetsToFilter)
        } else if (tag && tag === filteredTag) {
            setFilteredTag('');
            setFilteredList([]);
        }
    }

    const onGetTweets = useCallback((enteredFilter, type, uri) => {
        dispatchHttp({ type: 'SEND', });
        axios.get(uri)
        .then(response => {
            let loadedTweets = [];
            let nextResults = '';
            if (response && response.data && response.data.statuses.length) {
                let searchCopy = {...response.data.search_metadata};
                nextResults = searchCopy['next_results'];
                let resCopy = [...response.data.statuses];
                loadedTweets = resCopy.map(tweet => {
                    let tags = [];
                    let tweetUrl = null;
                    if (tweet.entities.hashtags && tweet.entities.hashtags.length && tweet.entities.hashtags.length > 0) {
                        for (let i = 0; i < tweet.entities.hashtags.length; i++) {
                            tags.push(tweet.entities.hashtags[i].text);
                        }
                    }
                    if (tweet.entities.urls && tweet.entities.urls.length > 0) {
                        tweetUrl = tweet.entities.urls[0].url
                    }
                    return {
                        id: tweet.id,
                        profileImage: tweet.user.profile_image_url,
                        screenName: tweet.user.screen_name,
                        tweetUrl: tweetUrl,
                        tweetText: tweet.text,
                        hashtags: tags
                    }
                })
            }
            const currentTags = type === 'search' ? [] : [...hashtags];
            const updatedTweets = type === 'search' ? loadedTweets : [...userTweets].concat(loadedTweets);
            setUserTweets(updatedTweets);
            checkHashtags(loadedTweets, currentTags);
            setEnteredFilter(enteredFilter);
            setNextResults(nextResults);
            dispatchHttp({ type: 'RESPONSE' })
        })
        .catch(error => {
            console.log('ERROR: ', error)
            dispatchHttp({ type: 'ERROR', errorMessage: error.message || 'Something went wrong'})

        });
    });
    
    const list = enteredFilter && filteredList.length && filteredList.length > 0 ? filteredList : userTweets;

    return (
        <div className="tweets-container">

            <div className="search-row">

                <div className="search-list-container">

                    <div className="section-title feed-title">Tweet Feed</div>
                    
                    <div style={{marginTop: '20px'}}>
                        <TweetSearch onGetTweets={onGetTweets} />
                    </div>

                    <div className="mobile-hashtag-list">
                        <HashtagList
                            filteredTag={filteredTag}
                            hashtags={hashtags}
                            onFilterByTag={filterByTagHandler} />
                    </div>
                    

                    <Card>

                        <TweetList
                            onFilterByTag={filterByTagHandler}
                            tweets={list}
                            enteredFilter={enteredFilter}
                            loading={httpState.loading} />
                        {
                            !filteredTag && (
                                <TweetLoadMore
                                    enteredFilter={enteredFilter}
                                    nextResults={nextResults}
                                    onLoadMore={onGetTweets}
                                    loading={httpState.loading} />
                            )
                        }

                    </Card>

                </div>

                <div className="web-hashtag-list">
                    <HashtagList
                        filteredTag={filteredTag}
                        hashtags={hashtags}
                        onFilterByTag={filterByTagHandler} />
                </div>

            </div>

        </div>
    );
}

export default Tweets;
