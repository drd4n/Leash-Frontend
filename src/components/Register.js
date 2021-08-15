import React, { useState, useEffect } from 'react'
import validator from 'validator'

export const Register = () => {
    
    const [form, setForm] = useState({})
    const [crPassword, setCrPassword] = useState('')
    const [error, setError] = useState('')

    function checkPassword() {
        if (!form.password){
            return ""
        }
        if (form.password !== crPassword) {
            return "password not match"
        }else{
            return ""
        }
    }

    function validate() {
        if(!form.firstname){
            return setError("Firstname must be filled")
        }
        if(!form.lastname){
            return setError("Lastname must be filled")
        }
        if(!form.email){
            return setError("E-mail must be filled")
        }
        if(!validator.isEmail(form.email)){
            return setError("E-mail is not valid")
        }
        if(!form.dob){
            return setError("Date of birth must be filled")
        }
        if(!form.username){
            return setError("Username must be filled")
        }
        if(!form.password){
            return setError("Password must be filled")
        }
        return setError("")
    }

    function register() {
        
    }

    return (
        <>
            <label for="firstname">First name</label><br />
            <input 
                type="text" 
                id="firstname"
                name="firstname"
                onChange={(event) => {setForm({...form, firstname: event.target.value})}} /><br />

            <label for="lastname">Last name</label><br />
            <input 
                type="text" 
                id="lastname" 
                name="lastname"
                onChange={(event) => {setForm({...form, lastname: event.target.value})}} /><br />

            <label for="email">E-mail</label><br />
            <input 
                type="email" 
                id="email" 
                name="email"
                onChange={(event) => {setForm({...form, email: event.target.value})}} /><br />

            <label for="dob">Birth date</label><br />
            <input 
                type="date" 
                id="dob" 
                name="dob"
                onChange={(event) => {setForm({...form, dob: event.target.value})}} /><br />

            <label for="username">Username</label><br />
            <input 
                type="text" 
                id="username" 
                name="username"
                onChange={(event) => {setForm({...form, username: event.target.value})}} /><br />

            <label for="password">Password</label><br />
            <input 
                type="password" 
                id="password" 
                name="username" 
                onChange={(event) => {setForm({...form, password: event.target.value})}} /><br />

            <label for="crPassword">Confirm Password</label><br />
            <input 
                type="password" 
                id="crPassword" 
                name="crPassword"
                onChange={(event) => {setCrPassword(event.target.value)}} /><br />

            <div>
                {
                    // password !== crPassword ? "password not match" : ""
                    checkPassword()
                }
                <br />
                {
                    error
                }
            </div>
            <button onClick={() => validate()}>Register</button>
        </>
    )
}

export default Register
