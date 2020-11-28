import React, {useReducer, useContext} from 'react'
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
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext.js';
import {  useSnackbar } from 'notistack';


export default function CreateUser() {
    const { register, handleSubmit, errors } = useForm();
    const {addedUser , user, error} =useContext(GlobalContext);
    const { enqueueSnackbar } = useSnackbar();
    const onSubmit = (data) => {

             addedUser(data);
    }
    if(!user.isAdmin ) {
        enqueueSnackbar('You are not authorized to create user', {variant : 'warning'})
    }

    return (
        <>
            <Header />
            <Container className="mt-n4" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            {user.isAdmin ? 
                            <>
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Add User</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="tender_form">
                                <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">

                                    <FormGroup className={error != null && error.name ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-full-name"
                                        >
                                            Full Name
                                         </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            id="input-full-name"
                                            name="name"
                                            placeholder={error != null && error.name? error.name: "Enter Full Name"}
                                            type="text"
                                            ref={register}
                                        />
                                    </FormGroup>
                                    <FormGroup className={error != null && error.email ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                        >
                                           Email
                                        </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            id="input-email"
                                            placeholder={error != null && error.email ? error.email : "Enter Email" }
                                            type="email"
                                            ref ={register}
                                            name="email"
                                        />
                                    </FormGroup>
                                    <FormGroup className={error != null && error.username ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-username"
                                        >
                                            Username
                                        </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Lucky"
                                            id="input-username"
                                            placeholder={error != null && error.username ? error.username : "Enter Username"}
                                            type="text"
                                            ref={register}
                                            name="username"
                                        />
                                    </FormGroup>
                                    <FormGroup className={error != null && error.password ? 'has-danger': ''}>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-password"
                                        >
                                            Password
                                        </label>
                                        <input
                                            className="form-control-alternative form-control"
                                            // defaultValue="Jesse"
                                            id="input-password"
                                            placeholder={error != null && error.password ? error.password : "Enter Password"}
                                            type="password"
                                            ref={register}
                                            name="password"
                                        />
                                    </FormGroup>
                                    <Button size="md" color="primary" type="submit">CREATE USER</Button>

                                </form>
                            </CardBody>
                            </> :
                            <CardBody>
                                <h2>You are not authorized to create user</h2>
                            </CardBody>
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

