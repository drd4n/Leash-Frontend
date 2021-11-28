import React, { useState } from 'react'
import axios from 'axios'
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Link } from 'react-router-dom';

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
    ;
  }

  body, html, #root {
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
    height: 100%;
    width: 100%;
  
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

const TextForm = styled.div`
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

const Input = styled.input`
    max-width: 100%;
    min-width: 100%;
    padding: 8px 10px;
    background: #000000;
    color: #FFFFFF;
    margin-bottom: 0rem;
    border-radius: 10px;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0);
    font-size: 14px;
    transition: all 0.3s ease-out;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
    :focus,
    :hover {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 0px 2.5px rgba(255, 255, 255, 255);
        
    }
`;
const Error = styled.label`
    color: red;
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



export const AdminLogin = () => {

    const [form, setForm] = useState({})
    const [error, setError] = useState("")

    async function login() {
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/auth/admin`, form
            // ,{
            //     headers: { 'content-type': 'application/x-www-form-urlencoded'}
            // }
        )
            .then((res) => {
                console.log(res)
                localStorage.clear()
                localStorage.setItem('admintoken', res.data.admin_token)
                return document.getElementById("dashboard").click()
            }).catch((e) => {
                // console.log(JSON.stringify(e))
                // console.log(e.response.data.errors)
                setError(e.response.data.errors)
            })
    }

    // function logout() {
        // if (!TokenValidate()) {
        //     return alert("session out of date")
        // }
    //      axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/request/adminLogout`, {
    //             token: localStorage.getItem('admintoken')
    //         })
    //         .then((res) => {
    //             if(res.status === 200){
    //                 localStorage.clear()
    //             }
    //         })
    // }

    return (
        <>
            
            <GlobalStyle />

            <Container>
            
            <WrapperContainer2>
            
            <Wrapper>
                <TextForm>
                <FontTitle1>Admin Login</FontTitle1>
                <Label htmlFor="username">Username</Label><br />
                <Input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(event) => { setForm({ ...form, username: event.target.value.trim() }) }} /><br />
                <Label htmlFor="password">Password</Label><br />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(event) => { setForm({ ...form, password: event.target.value.trim() }) }} /><br />
                <Error>{error}</Error>
                
                <BoxButton>
                <Button textColor="#FFFFFF" backgroundColor="#5D8888" onClick={() => login()}>Login</Button><br />
                </BoxButton>
                </TextForm>
            </Wrapper>
            
            </WrapperContainer2>
            </Container>
            {/*<Button onClick={() => logout()}>logout</Button><br /> */}
            {/*<Button onClick={() => showToken()}>showToken</Button><br /> */}
            <Link id="dashboard" to="/dashboard"></Link>
        </>
    )
}

export default AdminLogin