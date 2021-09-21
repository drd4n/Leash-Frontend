import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import TokenValidate from '../config/TokenValidate'


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
                return window.location.href = 'http://localhost:3000/'
            }).catch((e) => {
                console.log(JSON.stringify(e))
                console.log(e.response.data.errors)
            })
    }

    function logout() {
        // if (!TokenValidate()) {
        //     return alert("session out of date")
        // }
         axios.post("http://localhost:3001/auth/logout", {
                token: localStorage.getItem('token')
            })
            .then((res) => {
                if(res.status === 200){
                    localStorage.clear()
                }
            })
    }

    function showToken() {
        console.log(localStorage.getItem('token'))
    }

    function goToRegister() {
        window.location.href = "http://localhost:3000/register"
    }
    return (
        <>
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
            <button onClick={() => logout()}>logout</button><br />
            <button onClick={() => showToken()}>showToken</button><br />
            <button onClick={() => goToRegister()}>Register</button><br />
        </>
    )
}

export default Login