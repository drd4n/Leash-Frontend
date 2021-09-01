import React, { useState, useEffect } from 'react'
import validator from 'validator'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export const Register = () => {

    const [form, setForm] = useState({})
    const [dob, setDob] = useState(new Date())
    const [error, setError] = useState('')

    function checkPassword() {
        if (!form.password) {
            return ""
        }
        if (form.password !== form.crPassword) {
            return "password not match"
        } else {
            return ""
        }
    }

    async function validate() {
        
        console.log(form.dob)
        // if (!form.firstname) {
        //     return setError("Firstname must be filled")
        // }
        // if (!form.lastname) {
        //     return setError("Lastname must be filled")
        // }
        // if (!form.email) {
        //     return setError("E-mail must be filled")
        // }
        // if (!validator.isEmail(form.email)) {
        //     return setError("E-mail is not valid")
        // }
        // if (!form.dob) {
        //     return setError("Date of birth must be filled")
        // }
        // if (!validator.isDate(form.dob, { format:'DD/MM/YYYY' ,delimiters: '/', strictMode: true })) {
        //     return setError("Date of birth is not in format")
        // }
        // if (!form.username) {
        //     return setError("Username must be filled")
        // }
        // if (!form.password) {
        //     return setError("Password must be filled")
        // }

        axios.post('http://localhost:3001/auth/register', form)
            .then((res) => {
                console.log(res.data)
                return res
            }).catch((e) => {
                console.log(e.response.data)
                console.log(e.response.data.errors)
            })

    }

    return (
        <>
            <label for="firstname">First name</label><br />
            <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(event) => { setForm({ ...form, firstname: event.target.value.trim() }) }} /><br />

            <label for="lastname">Last name</label><br />
            <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(event) => { setForm({ ...form, lastname: event.target.value.trim() }) }} /><br />

            <label for="email">E-mail</label><br />
            <input
                type="email"
                id="email"
                name="email"
                onChange={(event) => { setForm({ ...form, email: event.target.value.trim() }) }} /><br />

            <label for="dob">Birth date</label><br />
            <DatePicker
                id="dob"
                name="dob"
                selected={form.dob}
                onChange={(date) => { setForm({...form, dob: date})}}
                dateFormat='dd/MM/yyyy'
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" /><br />

            <label for="username">Username</label><br />
            <input
                type="text"
                id="username"
                name="username"
                onChange={(event) => { setForm({ ...form, username: event.target.value.trim() }) }} /><br />

            <label for="password">Password</label><br />
            <input
                type="password"
                id="password"
                name="username"
                onChange={(event) => { setForm({ ...form, password: event.target.value.trim() }) }} /><br />

            <label for="crPassword">Confirm Password</label><br />
            <span>
                <input
                    type="password"
                    id="crPassword"
                    name="crPassword"
                    onChange={(event) => { setForm({ ...form, crPassword: event.target.value.trim() }) }} />

                <label>
                    {
                        // password !== crPassword ? "password not match" : ""
                        checkPassword()
                    }
                </label>
            </span>
            <div>
                {
                    error
                }
            </div>
            <button onClick={() => validate()}>Register</button>
        </>
    )
}

export default Register
