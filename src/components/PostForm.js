import React, { useEffect, useState } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import axios from 'axios'
import TokenValidate from '../config/TokenValidate'
import Tag from './Tag'

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

const Form = styled.div`
    align-items: center;
    text-align: center;
    display: flex;
    width: 600px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 20px;
    padding:10px;
    background-color: #242526;
    flex-direction: column;
    justify-content: center;
`;

const Selector = styled.select`
    width: 100%;
`;

const Row = styled.section`
    display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-shrink: 0;
    height: 100%;
    width: 100%;
`;

const Input = styled.input`
    max-width: 20px;
    margin: 5px;
`;

const InputImg = styled.img`
    height: 250px;
    margin: 2px;
`;

const PictureLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin:2px;
`;

const Textarea = styled.textarea`
    background-color: #dddddd;
  color: #666666;
  padding: 1em;
  border-radius: 10px;
  margin:20px;
  border: 2px solid transparent;
  outline: none;
  font-family: "Heebo", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  width: 500px;
  height: 100px;
  transition: all 0.2s;
`;
const Button = styled.button`
    width: 250px;
    height: 40px;
    padding: 10px 10px;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 44px;
    color: ${(props) => props.textColor};
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: ${(props) => props.backgroundColor};
    border: none;
    outline: 0;
    cursor: pointer;
    margin-top: 0.5rem;
    margin-Bottom: 1.5rem;
    margin-left: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    :hover {
        background: #A1D3CD;
        color: #FFFFFF;
        animation: ${jump} 0.2s ease-out forwards;
    }
`;
    

export const PostForm = ({ setWillFetch }) => {

    const [postDetail, setPostDetail] = useState('')
    const [tags, setTags] = useState([])
    const [uploadedpics, setUploadedpics] = useState([])
    const [shower, setShower] = useState([])
    const [isDirty, setisDirty] = useState(false)

    async function uploadText() {
        if(!TokenValidate()){
            return alert("Session is out of date, please login again")
        }
        if (tags.length === 0){
            return alert('please add at least one tag')
        }
        if (!postDetail) {
            return alert('please fill out what you want to ask')
        } else {
            const data = {
                post_text: postDetail,
                picture_link: uploadedpics,
                tags:tags
            }
            //post ไปที่ url ,object ใน format ของ json (เรียกว่า body)
            axios.post("http://localhost:3001/post/createPost", data,{
                headers : {'x-access-token':localStorage.getItem('token')}
            })
                .then(res => {
                    setWillFetch(true)
                    console.log("Successfully posted")
                })
                .catch((error) => {
                    // console.log(error)
                    console.log(error.response.data.errors)
                })

            setPostDetail('')
            setUploadedpics([])
            setShower([])
            setTags([])
            return
        }

    }

    function onDrop(selectedImage) {
        let temp = [];
        //pictures.map(image => {
        let formData = new FormData()
        formData.append("image", selectedImage, selectedImage)
        console.log(formData)
        axios.post('http://localhost:3001/post/uploadImage', formData,{
            headers:{'x-access-token':localStorage.getItem('token')}
        })
            .then(res => {
                shower.push(res.data.src)
                uploadedpics.push(res.data.picture_link)
                setisDirty(true)
            })
        return temp;
    }

    function removeSelectedImage(index) {
        const key = uploadedpics[index]
        axios.post(`http://localhost:3001/post/removeSelectedImage/${key}`)
            .then(res => {
                uploadedpics.splice(index, 1)
                shower.splice(index, 1)
                setisDirty(true)
                console.log(JSON.stringify(uploadedpics))
                console.log(res.data)
            })
    }

    useEffect(() => {
        if (isDirty) {
            setShower(shower)
            setisDirty(false)
        }

    }, [isDirty, shower])

    function addTags(tag) {
        if(tag === ""){
            return
        }
        if(tags.length > 2){
            return alert("You cannot tag more than three categories")
        }
        if(tags.includes(tag)){
            return alert("You already added this tag")
        }else{
            setTags([...tags, tag])
        }
    }

    function deleteTag(i) {
        tags.splice(i,1)
        setTags([...tags])
    }

    return (
        <Form>
            <Textarea
                placeholder="What do you want to ask?"
                type="text"
                value={postDetail}
                onChange={(event) => {
                    setPostDetail(event.target.value)
                }} />
            {
                tags.map((tag,i) => {
                    return <Col>
                        <Tag key={i} tag={tag} />
                        <button onClick={() => {deleteTag(i)}}>X</button>
                        </Col> 
                })
            }
            <Input
                placeholder="choose categorie(s)"
                type="file"
                id="selectedFile"
                onChange={(event) => {
                    onDrop(event.target.files[0])
                }}
                style={{ display: 'none' }}
            />
            <PictureLayout>
                {
                    shower.map((shwr, i) => {
                        return <Col>
                            <InputImg key={i} src={shwr} alt={shower.indexOf(shwr)} />
                            <Button onClick={() => removeSelectedImage(shower.indexOf(shwr))} >Remove</Button>
                        </Col>
                    }
                    )
                }
            </PictureLayout>
            <Row>
                <Selector onChange={(event)=>{addTags(event.target.value)}}>
                <option value="Dogs" >Dogs</option>
                <option value="Cats" >Cats</option>
                <option value="Fishes">Fishes</option>
                <option value="Mammals">Mammals</option>
                <option value="Insects">Insects</option>
                <option value="Reptiles">Reptiles</option>
                <option value="Birds">Birds</option>
                <option value="Amphibians">Amphibians</option>
                <option selected disabled ></option>
            </Selector>
            <Input
                type="file"
                id="selectedFile"
                onChange={(event) => {
                    onDrop(event.target.files[0])
                }}
                style={{ display: 'none' }}
            />
            {/* {
            uploadedpics.map(remover => {
                return <form key={uploadedpics.indexOf(remover)} action={removeSelectedImage(remover)}>
                    <input type="submit" value="Remove"/>
                </form>
            })
        } */}
            <Button onClick={() => { document.getElementById('selectedFile').click(); }}>Pick File</Button>
            <Button onClick={uploadText}>Post</Button>
            </Row>
            {/* <button onClick={uploadImages}>Upload Images</button> */}
        </Form>
    )
}
export default PostForm


