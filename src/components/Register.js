import React, { useState, useEffect } from 'react'
import validator from 'validator'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
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
    
`;

const Form = styled.div`
    width: 100%;
    max-width: 414px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    flex-shrink: 0;
`;

const Label = styled.label`
    color: #FFFFFF;
    margin-bottom: -0.8rem;
`;

const Label2 = styled.label`
    max-height: 100%;
    margin-bottom: -0.3rem;
    font-style: light;
    font-weight: 200;
    font-size: 14px;
    flex-shrink: 0;
    margin:10px;
    color:red;
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
    min-width: 70%;
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
    margin-top: 2rem;
    margin-Bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    :hover {
        background: #A1D3CD;
        color: #FFFFFF;
        animation: ${jump} 0.2s ease-out forwards;
    }
`;


export const Register = () => {

    const [form, setForm] = useState({})
    const [error, setError] = useState('')

    function checkPassword() {
        if (!form.crPassword) {
            return ""
        }
        if (form.crPassword !== form.password) {
            return "Please make sure your passwords match."
        } else {
            return ""
        }
    }

    async function validate() {
        
        console.log(JSON.stringify(form.dob))
        console.log(form.dob)
        if (!form.firstname) {
            return setError("Firstname must be filled")
        }
        if (!form.lastname) {
            return setError("Lastname must be filled")
        }
        if (!form.email) {
            return setError("E-mail must be filled")
        }
        if (!validator.isEmail(form.email)) {
            return setError("E-mail is not valid")
        }
        if (!form.dob) {
            return setError("Date of birth must be filled")
        }
        if (!validator.isDate(form.dob, { format:'DD/MM/YYYY' ,delimiters: '/', strictMode: true })) {
            return setError("Date of birth is not in format")
        }
        if (!form.username) {
            return setError("Username must be filled")
        }
        if (!form.password) {
            return setError("Password must be filled")
        }

        axios.post('http://localhost:3001/auth/register', form)
        // ,{
        //     headers: { 'content-type': 'application/x-www-form-urlencoded' }
        // }
            .then((res) => {
                localStorage.clear()
                localStorage.setItem('token', res.data.token)
                return window.location.href = "http://localhost:3000/finishYourProfile"
            }).catch((e) => {
                console.log(JSON.stringify(e))
                console.log(e.response.data.errors)
            })

    }

    return (
        <>
            
            
            <GlobalStyle />

            <Container>

            <WrapperContainer2>
            
            <Wrapper>
                <Form>
                <FontTitle1>Register</FontTitle1>
                
                    <Label htmlFor="firstname">First name</Label><br />
                    <Input
                        type="text"
                        id="firstname"
                        name="firstname"
                        onChange={(event) => { setForm({ ...form, firstname: event.target.value.trim() }) }} /><br />

                    <Label htmlFor="lastname">Last name</Label><br />
                    <Input
                        type="text"
                        id="lastname"
                        name="lastname"
                        onChange={(event) => { setForm({ ...form, lastname: event.target.value.trim() }) }} /><br />

                    <Label htmlFor="email">E-mail</Label><br />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(event) => { setForm({ ...form, email: event.target.value.trim() }) }} /><br />

                    <Label htmlFor="dob">Birth date</Label><br />
                    <DatePicker
                        id="dob"
                        name="dob"
                        selected={form.dob}
                        onChange={(date) => { setForm({...form, dob: date})}}
                        dateFormat='dd-MM-yyyy'
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" /><br />

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
                        name="username"
                        onChange={(event) => { setForm({ ...form, password: event.target.value.trim() }) }} /><br />

                    <Label htmlFor="crPassword">Confirm Password</Label><br />
                    <span>
                        <Input
                            type="password"
                            id="crPassword"
                            name="crPassword"
                            onChange={(event) => { setForm({ ...form, crPassword: event.target.value.trim() }) }} />

                        <Label2>
                            {
                                // password !== crPassword ? "password not match" : ""
                                checkPassword()
                            }
                        </Label2>
                    </span>
                    <Label2>
                        {
                            error
                        }
                    </Label2>
                    
                    <BoxButton>
                    <Button textColor="#5D8888" backgroundColor="#FFFFFF" onClick={() => validate()}>Confirm</Button>
                    </BoxButton>
                </Form>
            </Wrapper>
            
            </WrapperContainer2>
            </Container>
        </>
    )
}

export default Register
