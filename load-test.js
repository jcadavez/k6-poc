import http from 'k6/http';
import { check, sleep } from 'k6' ;

/**
 * Load Testing is a type of Performance Testing used to determine a system's behavior under both normal and peak conditions.
 * Load Testing is used to ensure that the application performs satisfactorily when many users access it at the same time.
 * 
 * Below example shows how to test with 
 * normal users of 10
 * peak users of 20
 */

export const options = {
    stages: [
        // simulate ramp-up of traffic from 0 to 10 users over 10s (normal hours)
        // also lets system warm up to handle traffic
        { duration: '10s', target: 10 },
        // simulate stay at 10 users for 20s
        { duration: '20s', target: 10 },
        // simulate ramp-up of traffic from 10 to 20 users over 10s (peak hours)
        { duration: '10s', target: 20 },
        // simulate stay at 20 users for 20s
        { duration: '20s', target: 20 },
        // simulate ramp-down to 0 users in 10s
        { duration: '10s', target: 0}
    ],
    thresholds: {
        // 99 % of requests must complete below 15s
        'http_req_duration': ['p(99)<15000']
    }
}

const BASE_URL = 'https://test-api.k6.io';
const USERNAME = 'TestUser';
const PASSWORD = 'SuperCroc2020'

export default () => {
    // authenticates the user and logs in
    const loginRes = http.post( `${BASE_URL}/auth/token/login/`, {
        username: USERNAME,
        password: PASSWORD
    })

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('access') !== ''
    })
    
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('access')}`
        }
    }

    // retrieves the objects
    const myObjects = http.get(`${BASE_URL}/my/crocodiles`, authHeaders).json();
    check(myObjects, { 'retrieved crocodiles' : (obj) => obj.length > 0 })

    sleep(1)
}