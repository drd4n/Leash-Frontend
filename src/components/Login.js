import React, { useState, useEffect } from 'react'

export const Login = () => {

    return (
        <>
        <form>
            <label for="username">Username</label><br />
            <input type="text" id="login-username" name="login-username" /><br />
            <label for="password">Password</label><br />
            <input type="password" id="login-password" name="login-username" /><br />
            <input type="submit" value="Submit" />
        </form>
        <a>Register</a>
        </>
    )
}

export default Login