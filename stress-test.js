import http from 'k6/http';
import { sleep } from 'k6' ;

/**
 * Stress Testing is a type of load testing used to determine the limits of the system. 
 * 
 * The purpose of this test is to verify 
 * 1. the stability and reliability of the system under extreme conditions.
 * 2. What the maximum capacity of your system is in terms of users or throughput.
 * 3. The breaking point of your system and its failure mode.
 * 4. If your system will recover without manual intervention after the stress test is over
 * 
 * Note: it doesn't overwhelm the system immediately, it's gradual
 */

export const options = {
    stages: [
        // NOTE: duration usually longer like a few min
        // gradually, loads users below normal load
        { duration: '10s', target: 5},
        // lets system adjust
        { duration: '10s', target: 5},
        // gradually, loads users to normal load
        { duration: '10s', target: 10}, 
        { duration: '10s', target: 10}, 

        // gradually, loads users around breaking point
        { duration: '10s', target: 15}, 
        { duration: '10s', target: 15}, 

        // gradually, loads users above breaking point
        { duration: '10s', target: 20}, 
        { duration: '10s', target: 20}, 


        // scale down, recovery stage
        { duration: '20s', target: 0}, 
    ]
}

export default function() {
    const BASE_URL = 'https://test-api.k6.io'; // make sure this is not production
    const responses = http.batch([
        ['GET', `${BASE_URL}/public/crocodiles/1/`, null, { tags: { name: 'PublicCrocs' } }],
        ['GET', `${BASE_URL}/public/crocodiles/2/`, null, { tags: { name: 'PublicCrocs' } }],
        ['GET', `${BASE_URL}/public/crocodiles/3/`, null, { tags: { name: 'PublicCrocs' } }],
        ['GET', `${BASE_URL}/public/crocodiles/4/`, null, { tags: { name: 'PublicCrocs' } }],
    ]);
    
    sleep(1);
}