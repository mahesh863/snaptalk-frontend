import React, {useState} from 'react'

//Css
import "../css/global.css"
import "../css/signin.css"


//Reactstrap
import { Form, FormGroup, Input, Label, Button } from "reactstrap"


//Router
import { Link } from 'react-router-dom'

//API
import {API} from '../helper/API'
import axios from 'axios'




const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handelSubmit = () => {
        axios({
            method: "POST",
            url: `${API}/auth/signup`,
            data: {
                name : name,
                email: email,
                password: password
            },

        }).then((res) => {
            console.log(res.data);

        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <div className= "base-div" > 
            <div className= "container base-container " >
                <h3 style= {{ textAlign: "center" }} >SignUp</h3>

                <div className= "input-div" >
                    <Form  >
                         <FormGroup style={{marginTop: "10px"}}>
                            <Label>Name</Label>

                            <Input name= "name" value= {name} onChange= {(e) => setName(e.target.value)} />
                        </FormGroup>


                        <FormGroup style={{marginTop: "10px"}}>
                            <Label>Email</Label>
                            <Input name= "email" value= {email} onChange= {(e) => setEmail(e.target.value)} />

                        </FormGroup>

                         <FormGroup style={{marginTop: "10px"}}>
                            <Label>Password</Label>

                            <Input type= "password" name= "password"  value= {password} onChange= {(e) => setPassword(e.target.value)}  />
                        </FormGroup>


                        <FormGroup style={{marginTop: "10px"}}>
                            <Label>Confirm Password
                            </Label>
                            <Input type= "password" name = "confirm-password" value= {confirmPassword} onChange= {(e) => setConfirmPassword(e.target.value)}  />

                        </FormGroup>



                        <Button className= "buttons" onClick= {handelSubmit} >
                            Submit
                        </Button>
                    </Form>

                    <p style= {{ marginTop: "10px" }} >  Already have an account? <Link to="signin" >Signin</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
