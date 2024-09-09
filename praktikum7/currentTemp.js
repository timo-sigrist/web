const {request} = require('https')

const URL = "wttr.in"
const location = process.argv[2];

if (location != null) {
    getCurrentTemp(location);
} else {
    console.error('location missing');
}


async function getCurrentTemp(location){
    let path = `/${location}?format=j1`;

    let requestStream = request({
        hostname: URL,
        path: path,
        method: "GET",
        headers: {
            Accept: 'text/json'
        }
    }, res => {
        const chunks = []

        res.on('data', function (chunk) {
            chunks.push(chunk)
        })

        res.on('end', function () {
            const body = Buffer.concat(chunks)
            json = JSON.parse(body.toString())
            temp = json['current_condition'][0]['temp_C']
            console.log(temp + '°')
        })
    })
    requestStream.end()
}