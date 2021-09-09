import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'


export const Login = () => {

    const [form, setForm] = useState({})

async function login() {
    axios.post("http://localhost:3001/auth/login", form
    // ,{
    //     headers: { 'content-type': 'application/x-www-form-urlencoded'}
    // }
    )
            .then((res) => {
                console.log(res)
                localStorage.clear()
                localStorage.setItem('token', res.data.token)
                // return window.location.href = 'http://localhost:3000/ping'
            }).catch((e) => {
                console.log(JSON.stringify(e))
                console.log(e.response.data.errors)
            })
}

    return (
        <>
        <div>{localStorage.getItem('token')}</div>
        <label htmlFor="username">username</label><br />
            <input
                type="text"
                id="username"
                name="username"
                onChange={(event) => { setForm({ ...form, username: event.target.value.trim() }) }} /><br />

            <label htmlFor="password">password</label><br />
            <input
                type="text"
                id="password"
                name="password"
                onChange={(event) => { setForm({ ...form, password: event.target.value.trim() }) }} /><br />
                <button onClick={() => login()}>Login</button><br />
        </>
    )
}

export default Login