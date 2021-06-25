import moxios from 'moxios';
import axios from 'axios';

describe('Tweets component', () => {

    beforeEach(() => {
        moxios.install(axios);
    });

    afterEach(() => {
        moxios.uninstall(axios);
    });

    test('renders tweets if request succeeds',  () => {
        moxios.wait(() => {
            moxios.stubRequest('/list', {
                status: 200,
                response: {
                    data: {
                        statuses: [
                            {created_at: "Wed Jun 23 16:41:37 +0000 2021", id: 4, text: 'hello'},
                            {created_at: "Mon Jun 21 12:54:57 +0000 2021", id: 3, text: 'olivia rodrigo is the best'}
                        ],
                        search_metadata: {
                            count: 2
                        }
                    }
                }
            })
        });

        axios.get('/list').then(response => {
            expect(response.status).toBe(200);
        });
    });

});