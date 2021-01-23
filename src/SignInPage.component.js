import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import config from './config'
import axios from 'axios'

const SignInPage = () => {

    useEffect(() => {
        localStorage.clear()
    }, [])

    const [emailForm, setEmailForm] = useState('');
    const [passwordForm, setPasswordForm] = useState('');

    const [errorAuth, setErrorAuth] = useState(null)

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${config.endpoint}/user/login`, {
            "userEmail": emailForm,
            "userPassword": passwordForm
        })
            .then(res => {
                localStorage.setItem("accessToken", res.data.tokens.accessToken)
                localStorage.setItem("refreshToken", res.data.tokens.refreshToken)
                localStorage.setItem("userEmail", res.data.userEmail)
                localStorage.setItem("_id", res.data._id)
                history.push('/home')
            })
            .catch(() => setErrorAuth('Bad credentials'))

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">

                    <form className="SignInForm" onSubmit={ handleSubmit }>

                        <div className="w-100 text-center">
                            <h2>Sign in</h2>
                        </div>

                        <div className="w-100">
                            <input type="email" onChange={event => setEmailForm(event.target.value)}
                                   placeholder="Email address"/>
                        </div>

                        <div className="w-100">
                            <input type="password" onChange={event => setPasswordForm(event.target.value)}
                                   placeholder="Password"/>
                        </div>

                        <div className="w-100">
                            <button type="submit">Sign in</button>
                        </div>

                        { errorAuth && <div className="w-100 text-center mt-4">
                            <p>{errorAuth}</p>
                        </div> }

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage