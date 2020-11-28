
import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {  useSnackbar } from 'notistack';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from 'axios';


export default function Login() {
  const { register, handleSubmit} = useForm();
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const onSubmit = (data) => {
    // let userLogin = new FormData();
    // userLogin.append("username",data.username);
    // userLogin.append("password",data.password);
    console.log(data)
      userLogin(data);
    }
    async function userLogin(userData) {

        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/user/login', userData , config);
            // res = await response.data.data;
            const data = await res.data.data;
            console.log(res)
            if(data){
              localStorage.setItem('usertoken', data.token);
              localStorage.setItem('userId', data.id);
              enqueueSnackbar('Logged in Successfully', {variant : 'success'})
              history.push('/admin/index')

            }
            
        } 
        catch (err) {
            setError(err.response.data.error);
            enqueueSnackbar(err.response.data.error, {variant : 'error'})
        }
    }
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            {/* <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("../../assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("../../assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader> */}
            <CardBody className="px-lg-5 py-lg-5">
              {/* <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div> */}
              <form  onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
                <FormGroup className={ error == 'incorrect username' ? 'has-danger mb-3': 'mb-3'}>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input className="form-control" placeholder="Username" type="text" autoComplete="new-username" onChange={()=>setError(null)} ref={register} name="username"/>
                  </InputGroup>
                  { error == 'incorrect username' ?<span className="text-danger">Incorrect username</span> :null}
                </FormGroup>
                <FormGroup className={error == 'incorrect password' ? 'has-danger ': ''}>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input className="form-control" placeholder="Password" type="password" autoComplete="new-password" onChange={()=>setError(null)} ref={register} name="password"/>
                  </InputGroup>
                  {error == 'incorrect password' ?<span className="text-danger">Incorrect password</span> :null}
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          {/* <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row> */}
        </Col>
      </>
    );
  }
