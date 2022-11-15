import { check } from 'k6'
import http from 'k6/http'

export default function(){
    let res = http.get('https://test.k6.io')
    console.log(res.status+"(expected)")
    check(res, {
        'code res harus 200': (r) => r.status === 200 
    })
}