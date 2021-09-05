import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Login = () => {

    const [form, setForm] = useState({})

async function login() {
    axios.post("http://localhost:3001/auth/login", form)
            .then((res) => {
                console.log(res.data)
            }).catch((e) => {
                console.log(JSON.stringify(e))
                console.log(e.response.data.errors)
            })
}

    return (
        <>
        <label for="username">username</label><br />
            <input
                type="text"
                id="username"
                name="username"
                onChange={(event) => { setForm({ ...form, username: event.target.value.trim() }) }} /><br />

            <label for="password">password</label><br />
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