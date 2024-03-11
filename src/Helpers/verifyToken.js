import { useNavigate } from 'react-router-dom'
import { URL_API } from '../../config'

export const verifyToken = () => {
    const navigate = useNavigate()

    fetch(URL_API + '/api/users/auth', {
        method: 'POST',
        headers: { 'Authorization': window.localStorage.getItem('auth-token-app') }
    })
    .then(res => {
        return res.json()
    })
    .then(response => {
        if (response.status == 401){
            navigate('/login')
        }
    })
}