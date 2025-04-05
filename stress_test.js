import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 50 },
    { duration: '3m', target: 50 },
    { duration: '2m', target: 0 }
  ],
};

export default function () {
  let res = http.get('http://host.docker.internal:8080');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}