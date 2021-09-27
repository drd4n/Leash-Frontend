import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

const Button = styled.button`
    align-self: center;
    font-size: 12px;
    padding: 7px;
    border:none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);

`
const TextBox = styled.div`
    width: 330px;
    padding: 5px;
    margin: 2px;
    background-color: white;
    text-align: center;
    border-radius: 15px;
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
        <TextBox>{props.comment.comment_text}</TextBox>
        <Button>UPVOTE</Button>
        <Button>DOWNVOTE</Button>
    </CommentBox>
)
}

export default Comments