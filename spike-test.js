import http from 'k6/http';
import { sleep } from 'k6';

/**
 * Spike Testing is a type of stress testing that spikes an extreme load over a short period of time
 * 
 * The purpose of this test is to verify 
 * 1. how willl your system will perform under a sudden surge of traffic
 * 2. if your system will recover once the traffic has subsided
 * 
 * Note: useful for popular events like a Super Bowl event
 * 
 * Systems react in 4 different ways
 * 1. Excellent: system performance is not degraded during the surge of traffic. Response time is similar during low traffic and high traffic.
 * 2. Good: Response time is slower, but the system does not produce any errors. All requests are handled.
 * 3. Poor: System produces errors during the surge of traffic, but recovers to normal after the traffic subsides.
 * 4. Bad: System crashes, and does not recover after the traffic has subsided.
 */

export const options = {
    stages: [
        // loads up to below normal load
        { duration: '10s', target: 5 }, 
        { duration: '10s', target: 5 },

        // the spike, and let it stay for 10s
        { duration: '10s', target: 30 }, 
        { duration: '10s', target: 30 },

        // scale down to normal, recovery stage
        { duration: '10s', target: 5 }, 
    ]
}

export default function () {
    const BASE_URL = 'https://test-api.k6.io'; // make sure this is not production

    const responses = http.batch([
        ['GET', `${BASE_URL}/public/crocodiles/1/`, null, { tags: { name: 'PublicCrocs' } }],
        ['GET', `${BASE_URL}/public/crocodiles/2/`, null, { tags: { name: 'PublicCrocs' } }],
        ['GET', `${BASE_URL}/public/crocodiles/3/`, null, { tags: { name: 'PublicCrocs' } }],
        ['GET', `${BASE_URL}/public/crocodiles/4/`, null, { tags: { name: 'PublicCrocs' } }],
    ]);

    sleep(1);
}