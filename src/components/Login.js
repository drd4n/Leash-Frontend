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
    font-family: 'Roboto', sans-serif;
    height: 100%;
    width: 100%;
    ;
  }
`;

const Container = styled.section`
    display: flex;
    justify-content: space-around;
    align-item: center;
    align-content: center;
    flex-wrap: wrap;
    flex-shrink: 0;
  
`;

const WrapperContainer1 = styled.section`
    display: flex;
    flex-direction: column;
    align-item: center;
    align-content: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 2;
    align-self: center;
  
`;

const WrapperContainer2 = styled.section`
    display: flex;
    flex-direction: column;
    align-item: center;
    align-content: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
    align-self: center;
`;

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-shrink: 0;
    align-self: center;
`;

const Form = styled.form`
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

const FontTitle1 = styled.label`
    font-style: medium;
    font-weight: 500;
    font-size: 42px;
    line-height: 75px;
    text-align: center;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`;

const FontTitle2 = styled.label`
    font-style: medium;
    font-weight: 500;
    font-size: 38px;
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
    margin-bottom: 0rem;
    border-radius: 10px;
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


const BoxButton = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 0rem;
    padding: 0;
  `;

const Button = styled.button`
    max-width: 100%;
    min-width: 45%;
    padding: 11px 35px;
    color: ${(props) => props.textColor};
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: ${(props) => props.backgroundColor};
    border: none;
    border-radius: 44px;
    outline: 0;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-Bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    :hover {
        background: #A1D3CD;
        color: #FFFFFF;
        animation: ${jump} 0.2s ease-out forwards;
    }
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

            <Container>
            <WrapperContainer1>

            <Wrapper>
                <Form>
                <FontTitle1>Login1</FontTitle1>
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
                <BoxButton>
                <Button textColor="#FFFFFF" backgroundColor="#5D8888" onClick={() => login()}>Login</Button><br />
                </BoxButton>
                            {/*<Button onClick={() => logout()}>logout</Button><br /> */}
                            {/*<Button onClick={() => showToken()}>showToken</Button><br /> */} 
                <Border></Border>
                <FontTitle2>Wanna join us?</FontTitle2>
                <BoxButton>
                <Button textColor="#5D8888" backgroundColor="#FFFFFF" onClick={() => goToRegister()}>SIGN UP</Button><br />
                </BoxButton>
                </Form>
            </Wrapper>

            </WrapperContainer1>

            

            <WrapperContainer2>
            
            <Wrapper>
                <Form>
                <FontTitle1>Login2</FontTitle1>
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
                <BoxButton>
                <Button textColor="#FFFFFF" backgroundColor="#5D8888" onClick={() => login()}>Login</Button><br />
                </BoxButton>
                            {/*<Button onClick={() => logout()}>logout</Button><br /> */}
                            {/*<Button onClick={() => showToken()}>showToken</Button><br /> */} 
                <Border></Border>
                <FontTitle2>Wanna join us?</FontTitle2>
                <BoxButton>
                <Button textColor="#5D8888" backgroundColor="#FFFFFF" onClick={() => goToRegister()}>SIGN UP</Button><br />
                </BoxButton>
                </Form>
            </Wrapper>
            
            </WrapperContainer2>
            </Container>
            
        </>
    )
}

export default Login