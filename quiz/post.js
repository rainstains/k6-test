import http from 'k6/http'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    stages: [
        { duration: '2s', target: 10 },
        { duration: '4s', target: 20 }, // stay at 100 users for 10 minutes
        { duration: '2s', target: 10 }, // ramp-down to 0 users    
      ],
}

export default function testSuite() {    
    describe('Create User', () => {
        var nameUser = randomString(7)
        var jobUser = randomString(8)

        const url = 'https://reqres.in/api/users'
        const body = JSON.stringify({
            name: nameUser,
            job: jobUser,
        })
        const headers = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = http.post(url, body, headers)
        const res = response.json()

        expect(response.status, "Response Code").to.eql(201)
        expect(response, "Valid Response").to.have.validJsonBody()
        expect(res['name'], "Name").to.eql(nameUser)
        expect(res['job'], "Job").to.eql(jobUser)
    })
}