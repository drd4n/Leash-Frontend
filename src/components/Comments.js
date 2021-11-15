import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Button = styled.button`

`
const Text = styled.div`
    
`
const ProfileImg = styled.img`
    
  `  
const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border:none;
    border-radius: 44px;
    margin:10px;
    padding:5px;
    background-color: #aaaaaa;
`
export const Comments = (props) => {

return ( 
    <CommentBox>
        <div>{props.comment.owner.firstname} {props.comment.owner.lastname}</div>
        <div>{props.comment.comment_text}</div>
    </CommentBox>
)
}

export default Comments