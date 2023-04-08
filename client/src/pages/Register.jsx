import { useState, useEffect } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavButton from "../components/NavButton";
const RegisterPage = ({ip}) =>{
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [rollno, setRoll] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [dept, setDept] = useState('');
    const navigate = useNavigate();
    const insertStudent = async () => {
        try{
            const res = await axios.post(`http://${ip}/insertStudent`, {
            id : id,
            name : name,
            rollno: rollno,
            dob : dob,
            department: dept,
            password: password,
            Cgpa : "0.0"
          });
          console.log("INSERTEd");
        }catch(err){
          console.log(err);
        }
      }
    useEffect(()=>{
        localStorage.setItem('admin', '0');
    },[])
    return (
      <>
        <h1 style={{marginLeft:"45%", marginTop: "50px"}}>Register</h1>
        <NavButton name={'Login'} pos={15} top={9}/>
        <Form style={{width: "400px", marginTop: "50px", marginLeft: "35%"}} onSubmit={async (e) => {
            e.preventDefault();
            //console.log(name);
            if(name !== '' && id !== '' && rollno !== '' && dob !== '' && password !=='' && dept !== ''){
                console.log('inside');
                insertStudent();
                navigate(`/Login`)
            }else{
                console.log('fuuuckk');
            }
        } } >
            <Form.Field>
                <label>Student ID</label>
                <input placeholder='Student ID' onChange={(e) => setId(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Roll No.</label>
                <input placeholder='Roll no.' onChange={(e) => setRoll(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Dob</label>
                <input placeholder='Dob' onChange={(e) => setDob(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Department</label>
                <input placeholder='Department' onChange={(e) => setDept(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Field>
            <Button positive >Register</Button>
        </Form>
      </>
    );
  }
  
export default RegisterPage;