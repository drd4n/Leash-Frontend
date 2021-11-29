import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styled, { keyframes, createGlobalStyle } from 'styled-components'

const Center = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px;
    margin-top: -8px;
`

const TagBox = styled.div`
    color: cornflowerblue;
    border-radius: 35px;
    font-size: 13px;
    font-weight: 100;
    letter-spacing: 1px;
    display: inline-block;
    margin: 3px;
    padding: 0.3em 1.1em;
    border: 1.5px solid cornflowerblue;
    display: block;
    margin-top: 5px;
`

export const Tag = (props) => {

    return(
            <Center>
                <TagBox>{props.tag}</TagBox>
            </Center>
    )
}

export default Tag