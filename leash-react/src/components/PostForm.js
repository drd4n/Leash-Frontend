import React, { useEffect, useState } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import axios from 'axios'
import TokenValidate from '../config/TokenValidate'
import Tag from './Tag'


const Container = styled.section`
    display: flex;
    align-items: center;
    text-align: center;
`;

const Form = styled.div`
    align-items: center;
    text-align: center;
    display: flex;
    width: 600px;
    border-radius: 15px; 
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    background-color: #242526;
    flex-direction: column;
    justify-content: center;
`;

const Selector = styled.select`
    width: 30%;
    height: 35px;
    background: grey;
    color: white;
    padding-left: 5px;
    font-size: 14px;
    border: none;
    margin-left: 10px;
    margin-top: 3px;

    option {
    color: black;
    background: white;
    display: flex;
    min-height: 20px;
    padding: 0px 2px 1px;
    }
`;

const Row = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
    width: 100%;
`;

const InRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 50px;
    gap: 10px;
`;

const Input = styled.input`
    max-width: 20px;
    margin: 5px;
`;

const InputImg = styled.img`
    max-height: 80px;
    border-radius: 5%;
    padding: 5px;
`;

const PictureLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
`;

const Col = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TagRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 38px;
`;

const Textarea = styled.textarea`
    background-color: #dddddd;
    color: #666666;
    padding: 1em;
    border-radius: 10px;
    margin: 20px;
    border: 2px solid transparent;
    outline: none;
    font-family: "Heebo", sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.4;
    width: 560px;
    min-width: 560px;
    max-width: 650px;
    height: 175px;
    min-height: 175px;
    max-height: 350px;
    transition: all 0.2s;
`;
const AddButton = styled.button`
    width: 40px;
    height: 40px;
    font-weight: 600;
    border-radius: 44px;
    font-size: 24px;
    color: black;
    text-transform: uppercase;
    background: grey;
    border: none;
    outline: 0;
    cursor: pointer;
    transition: all 0.3s ease-out;
    :hover {
        background: white;
        animation: 0.2s ease-out forwards;
    }
`;

const RemoveButton = styled(AddButton)`
    width: 30px;
    height: 20px;
    font-weight: 600;
    border-radius: 20px;
    font-size: 10px;
    color: black;
    text-transform: uppercase;
    background: white;
    border: none;
    outline: 0;
    cursor: pointer;
    transition: all 0.3s ease-out;
    :hover {
        background: red;
        animation: 0.2s ease-out forwards;
    }
`;

const Button = styled(AddButton)`
    width: 120px;
    height: 40px;
    font-weight: 600;
    font-size: 16px;
    border-radius: 44px;
    color: white;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #75B2B2;
    border: none;
    outline: 0;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-out;
    :hover {
        background: #A1D3CD;
        animation: 0.2s ease-out forwards;
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
            axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/post/createPost`, data,{
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
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/post/uploadImage`, formData,{
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
        axios.post(process.env.REACT_APP_NODE_ENDPOINT+`/post/removeSelectedImage/${key}`)
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
        <Container>
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
                    return <TagRow>
                        <Tag key={i} tag={tag} />
                        <RemoveButton onClick={() => {deleteTag(i)}}>X</RemoveButton>
                        </TagRow> 
                        
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

                <InRow>
                    <AddButton onClick={() => { document.getElementById('selectedFile').click(); }}>+</AddButton>
                    <Button onClick={uploadText}>Post</Button>
                </InRow>

            </Row>
            {/* <button onClick={uploadImages}>Upload Images</button> */}
        </Form>
        </Container>
    )
}
export default PostForm


