import React, { useState, useContext} from 'react'
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


export default function AddNews() {
    const { register, handleSubmit, errors } = useForm();
    const { addedNews ,error} = useContext(GlobalContext)
     const [content, setContent] = useState("");
    var i = 1 ;
    Object.keys(mapData.features).map(
    (e) => {
        mapData.features[e]["idx"] = `${i}`;
        i++
    });
    const district = mapData.features.map(x=>x);
    const onSubmit=(data) =>{
        // const newNews = {
        //     district : data.district,
        //     newsTitle : data.title,
        //     newsContent : data.content,
        //     imageFile : data.imageFile[0]
        // }
        let newNews = new FormData();
        newNews.append("district",data.district);
        newNews.append("newsTitle",data.title);
        newNews.append("newsContent",content);
        newNews.append("imageFile",data.imageFile[0])
        console.log(newNews)
        addedNews(newNews);
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
                                        <h3 className="mb-0">Add News</h3>
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
                                            // defaultValue="lucky.jesse"
                                            id="input-district"
                                            name="district"
                                            // placeholder={error != null && error.ProjectTitle ? error.ProjectTitle : 'Enter project Title'}
                                            type="select"
                                            ref={register}
                                        >
                                        {district.map(x=><option key={x.idx} value={x.idx}>{x.properties.जिल्ला}</option>)}
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
                                            data="Enter your content here</p>"
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
                                            <input className="form-control-alternative form-control"  id="customFileLang"  type="file" ref={register} name="imageFile"/>
                                            {/* <label className="custom-file-label" htmlFor="customFileLang">Select file</label> */}
                                        {/* </div> */}
                                        {error != null && error.image ? <span className="text-danger">{error.image}</span> : null }
                                    </FormGroup>
                                    {/* <h6 className="heading-small text-muted mb-4">
                                    Project Address
                                    </h6> */}
                        
                                    <Button size="md" color="primary" type="submit">ADD</Button>

                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
