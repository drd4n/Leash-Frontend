import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import TokenValidate from '../config/TokenValidate'
import styled, { keyframes, createGlobalStyle } from "styled-components";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #18191A;
    ;
  }

  body, html, #root {
    height: 100%;
    width: 100%;
    ;
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  color: #FFFFFF;
  margin-bottom: -0.8rem;
`;

const FontTitle = styled.label`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 75px;

    text-align: center;
    letter-spacing: 0.05em;

    color: #FFFFFF;
    `;

const Input = styled.input`
    max-width: 100%;
    padding: 11px 13px;
    background: #f9f9fa;
    color: #000000;
    margin-bottom: 0.2rem;
    border-radius: 4px;
    outline: 0;
    border: 1px solid rgba(245, 245, 245, 0.7);
    font-size: 14px;
    transition: all 0.3s ease-out;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
    :focus,
    :hover {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
    }
    `;

const Button = styled.button`
  max-width: 38%;
  padding: 11px 13px;
  color: ${(props) => props.textColor};
  font-weight: 600;
  text-transform: uppercase;
  background: ${(props) => props.backgroundColor};
  border: none;
  border-radius: 44px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #A1D3CD;
    color: #FFFFFF;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Border = styled.h2`
  border-style: solid;
  border-width: 1px;
  border-color: #5D8888;
`;

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
            <GlobalStyle />
            <Wrapper>
                <Form>
                <FontTitle>Login</FontTitle>
                <Label htmlFor="username">Username</Label><br />
                <Input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(event) => { setForm({ ...form, username: event.target.value.trim() }) }} /><br />
                <Label htmlFor="password">Password</Label><br />
                <Input
                    type="text"
                    id="password"
                    name="password"
                    onChange={(event) => { setForm({ ...form, password: event.target.value.trim() }) }} /><br />
                <Button textColor="#FFFFFF" backgroundColor="#5D8888" onClick={() => login()}>Login</Button><br />
                            {/*<Button onClick={() => logout()}>logout</Button><br /> */}
                            {/*<Button onClick={() => showToken()}>showToken</Button><br /> */} 
                <Border></Border>
                <FontTitle>Wanna join us?</FontTitle>
                <Button textColor="#5D8888" backgroundColor="#FFFFFF" onClick={() => goToRegister()}>SIGN UP</Button><br />
            </Form>
            </Wrapper>
            
        </>
    )
}

export default Login