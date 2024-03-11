const mode = 'PROD'

const URL_API = mode == 'PROD'
? 'https://utn-fullstack-backend-dev-mrpk.1.us-1.fl0.io'
: 'http://localhost:8080'

export {URL_API}