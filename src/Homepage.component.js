import React, { useEffect } from 'react'
import config from './config'
import axios from 'axios'

const HomePage = () => {

    useEffect(() => {

        axios.post(`${config.endpoint}/user/check`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .catch(err => console.log(err))

    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1>Authorized</h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage