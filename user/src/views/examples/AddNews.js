import React, { useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {  useSnackbar } from 'notistack'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Label,
    Container,
    Row, Col

} from "reactstrap";
import { useForm } from "react-hook-form";
import Header from "../../components/Headers/Header.js";
import mapData from '../../data/districts.json'
import { GlobalContext } from '../../context/GlobalContext.js';

import Editor from 'material-ui-editor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'


export default function AddNews() {
    const {id} = useParams();
    const [editMode,setEditMode]= useState(false)
    const [editNews, setEditNews]=useState()
    const { register, handleSubmit, errors } = useForm();
    const { addedNews ,error, dispatch , updateNews} = useContext(GlobalContext);
    const { enqueueSnackbar } = useSnackbar();
     const [content, setContent] = useState("");
    var i = 1 ;
    Object.keys(mapData.features).map(
    (e) => {
        mapData.features[e]["idx"] = `${i}`;
        i++
    });

    useEffect(()=>{
        if(id){
            setEditMode(true);
            fetchEditNews();
        }

    }, [id]);

    async function fetchEditNews() {
        let response = await axios.get(`http://localhost:5000/api/v1/news/${id}`)
        response = await response.data.data;
        console.log(response, "edit")
        setEditNews(response.news);

    };
    const district = mapData.features.map(x=>x);
    const onSubmit=(data) =>{
        // const newNews = {
        //     district : data.district,
        //     newsTitle : data.title,
        //     newsContent : data.content,
        //     imageFile : data.imageFile[0]
        // }
        if(!id){
        let newNews = new FormData();
        newNews.append("district",data.district);
        newNews.append("newsTitle",data.title);
        newNews.append("newsContent",content);
        newNews.append("imageFile",data.imageFile[0]);
        newNews.append("status","");
        console.log(newNews)
        addedNews(newNews)
            
        } else {
        let updatedData = new FormData();
        updatedData.append("district",data.district);
        updatedData.append("newsTitle",data.title);
        updatedData.append("newsContent",content);
        updatedData.append("imageFile",data.imageFile[0]);
        updatedData.append("status",editNews.status);
            
            updateNews(updatedData , id);
        }
    }

   
    return (
        <>
            <Header />
            <Container className="mt-n4" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">{!id ? 'Add News' : 'Edit News'}</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="tender_form">
                                <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
                                    {/* <h6 className="heading-small text-muted mb-4">
                                    Project information
                                    </h6> */}
                                    <FormGroup className={error != null && error.district ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-district"
                                        >
                                            District :
                                         </label>
                                        
                                        <select
                                            className="form-control-alternative form-control"
                                            id="input-district"
                                            name="district"
                                            // placeholder={error != null && error.ProjectTitle ? error.ProjectTitle : 'Enter project Title'}
                                            type="select"
                                            ref={register}
                                        >
                                        {district.map(x=>{
                                        return (
                                        <option key={x.idx} value={x.idx} selected={ editNews && editNews.district}>{x.properties.जिल्ला}</option>
                                        )})}
                                        </select>
                   
                                    </FormGroup>
                                    <FormGroup className={error != null && error.newsTitle ? 'has-danger': '' }>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-title"
                                        >
                                            News Title : 
                                        </label>
                                        
                                        <input
                                            className="form-control-alternative form-control"
                                            defaultValue={editNews && editNews.newsTitle}
                                            id="input-title"
                                            placeholder={error != null && error.newsTitle ? error.newsTitle : ' Enter News Title '}
                                            type="text"
                                            ref ={register}
                                            name="title"
                                        />
                                    </FormGroup>
                                    <FormGroup className={error != null && error.newsContent ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-content"
                                        >
                                             News Content :
                                        </label>
                                        
                                        {/* <textarea
                                            className="form-control-alternative form-control"
                                            // defaultValue="Lucky"
                                            id="input-content"
                                            // placeholder={error != null && error.Procurement ? error.Procurement :"Enter your content here"}
                                            rows="5"
                                            ref={register}
                                            name="content"
                                        >
                                            </textarea> */}
                                         {/* <Editor className="form-control-alternative form-control" 
                                         content={"<p>Enter your content here</p>"}
                                                  onChange={(event)=>{}}/> */}
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={editNews && editNews.newsContent}
                                            onReady={ editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log( 'Editor is ready to use!', editor );
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setContent(data);
                                                 console.log( { event, editor, data } );
                                            } }
                                            onBlur={ ( event, editor ) => {
                                                console.log( 'Blur.', editor );
                                            } }
                                            onFocus={ ( event, editor ) => {
                                                console.log( 'Focus.', editor );
                                            } }
                                        />
            
                                    </FormGroup>
                                    <FormGroup className={error != null && error.image ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="customFileLang"
                                        >
                                            Choose featured image
                                        </label>
                                        {/* <div className="custom-file"> */}
                                        <input className="form-control-alternative form-control" 
                                        // value={editNews && editNews.imageFile} 
                                        id="customFileLang"  type="file" ref={register} name="imageFile"/>
                                            {/* <label className="custom-file-label" htmlFor="customFileLang">Select file</label> */}
                                        {/* </div> */}
                                        {error != null && error.image ? <span className="text-danger">{error.image}</span> : null }
                                    </FormGroup>
                                    {/* <h6 className="heading-small text-muted mb-4">
                                    Project Address
                                    </h6> */}
                        
                                    <Button size="md" color="primary" type="submit">{!id ? 'ADD' : 'UPDATE'}</Button>

                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
