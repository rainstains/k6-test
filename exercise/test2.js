import { check } from 'k6'
import http from 'k6/http'
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';

export const options = {
    vus: 10,
    duration: '3s'
}

export default function() {
    let response = http.get('https://test.k6.io')
    console.log('hasil dari console log: '+response.status)
    check(response, {
        'harus 200': (r) => r.status === 200
    })
    expect(response.status, "assertion pake expect").to.equal(200)
}