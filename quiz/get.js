import http from 'k6/http'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    stages: [
        { duration: '2s', target: 10 },
        { duration: '4s', target: 20 }, // stay at 100 users for 10 minutes
        { duration: '1s', target: 10 }, // ramp-down to 0 users    
      ],
}

export default function testSuite() {
    describe('Get User by Random ID', () => {
        const idUser = randomIntBetween(1,12)
        let response = http.get('https://reqres.in/api/users/'+idUser)
        const res = response.json()

        expect(response.status, "Response Code").to.equal(200)
        expect(response, "Valid Response").to.have.validJsonBody()
        expect(res['data']['id'], "Id User").to.equal(idUser)
        // expect(res['data']['email'], "E-mail").to.not.be.empty
        // expect(res['data']['first_name'], "First Name").to.not.be.empty
        // expect(res['data']['last_name'], "Last Name").to.not.be.empty
    })

}

