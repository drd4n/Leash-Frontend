import React, { useState, useEffect, Component } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

const Button = styled.button`
background-color: #008CBA;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  font-size: 10px;
  cursor: pointer;
`
const TextBox = styled.div`
    width: 330px;
    background-color: white;
    text-align: center;
    border-radius: 15px;
`
const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
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