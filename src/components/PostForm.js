import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import TokenValidate from '../config/TokenValidate'
import Tag from './Tag'

const Form = styled.div`
    align-items: center;
    text-align: center;
    display: flex;
    border-radius: 5px; 
    width:35%;
    margin:auto;
    padding:5px;
    flex-direction: column;
    justify-content: center;
    background-color: #aaaaaa;
`
const Input = styled.input`
    width: 200px;
`
const InputImg = styled.img`
    height: 250px;
    margin:2px;
`
const PictureLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin:2px;
`
const Button = styled.button`
background-color: yellowgreen;
  border: none;
  padding: 7px 12px;
  text-align: center;
  /* display: inline-block; */
  font-size: 10px;
  cursor: pointer;
  margin:2px;
`
const Textarea = styled.textarea`
    resize:none;
    height: 100px;
    width: 350px;
`

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
            <select onChange={(event)=>{addTags(event.target.value)}}>
                <option value="Dogs" >Dogs</option>
                <option value="Cats" >Cats</option>
                <option value="Fishes">Fishes</option>
                <option value="Mammals">Mammals</option>
                <option value="Insects">Insects</option>
                <option value="Reptiles">Reptiles</option>
                <option value="Birds">Birds</option>
                <option value="Amphibians">Amphibians</option>
                <option selected disabled ></option>
            </select>
            <Input
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
            {/* {
            uploadedpics.map(remover => {
                return <form key={uploadedpics.indexOf(remover)} action={removeSelectedImage(remover)}>
                    <input type="submit" value="Remove"/>
                </form>
            })
        } */}
            <button onClick={() => { document.getElementById('selectedFile').click(); }}>Pick File</button>
            <button onClick={uploadText}>Post</button>
            {/* <button onClick={uploadImages}>Upload Images</button> */}
        </Form>
    )
}
export default PostForm


