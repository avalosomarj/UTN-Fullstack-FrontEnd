const mode = 'PROD'

const URL_API = mode == 'PROD'
? import.meta.env.VITE_URL_API
: 'http://localhost:8080'

export {URL_API}