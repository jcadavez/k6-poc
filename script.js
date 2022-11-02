import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Ramps the VUs in Stages
 */
export const options = {
  stages: [
    // ramps from 0 to 20 VUs in 30s
    { duration: '30s', target: 20 },
    // ramps from 20 to 10 VUs in 1m30s
    { duration: '1m30s', target: 10 },
    // ramps from 10 to 0 VUs in 20s
    { duration: '20s', target: 0 },
  ],
};

export default function() {
  const res = http.get('https://test.k6.io');
  check(res, { 'status was 200' : (r) => r.status == 200 })
  sleep(1);
}