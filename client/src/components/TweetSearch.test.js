import React from 'react';
import { shallow, mount } from 'enzyme';
import TweetSearch from './TweetSearch';

describe('TweetSearch component', () => {

    let onGetTweetsMock = jest.fn();

    beforeEach(() => {
        onGetTweetsMock.mockClear();
    });

    const container = shallow(<TweetSearch />);

    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have a search field', () => {
        expect(container.find('input[type="search"]').length).toEqual(1);
    });

    it('Should change value when onChange was called', () => {
        const wrapper = mount(<TweetSearch onGetTweets={onGetTweetsMock}/>);

        wrapper.find('input[type="search"]').simulate('change', {
          target: {
            value: 'I am searching for things',
          },
        });

        expect(wrapper.find('input[type="search"]').prop('value')).toEqual(
          'I am searching for things',
        );
        
    });

});