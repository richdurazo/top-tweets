import React from 'react';
import Card from './UI/Card';
import Hashtag from './Hashtag';

const HashtagList = props => {
    const { hashtags, onFilterByTag, filteredTag } = props;
    return (
        <Card>
            <section className="hashtag-filter-container">
                <div className="section-title">
                    Filter by hashtag
                </div>
                <div className="hashtag-list-container">
                    {hashtags.map(tag => <Hashtag selected={tag === filteredTag} tag={tag} key={tag} onFilterByTag={onFilterByTag} />)}
                </div>
            </section>
        </Card>
    );
}

export default HashtagList;
