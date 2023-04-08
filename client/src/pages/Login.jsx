import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form } from 'semantic-ui-react'
import NavButton from "../components/NavButton";
import axios from "axios";

const adminkey = "bp";

const LoginPage = ({ip}) =>{
    const [id, setId] = useState('');
    const [rollno, setRoll] = useState('');
    const [password, setPassword] = useState('');
    const [val, setVal] = useState(0);
    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();
    const fetchUser = async () => {
        try{
            const res = await axios.get(`http://${ip}/student/${id}`);
            if(res.data[0] && res.data[0].password === password && res.data[0].rollno === rollno){
                setVal(1);
            }
        }catch(err){
            console.log(err);
        }
    }

    const checkAuthentication = () => {
        fetchUser();
    }
    useEffect(()=>{
        localStorage.setItem('admin','0');
        localStorage.setItem('user', 'None');
    },[])

    return (
      <>
      <NavButton name={'Register'} pos={70} top={8} posi={'left'}/>
        <h1 style={{marginLeft:"45%", marginTop: "50px"}}>Login</h1>
        <Form style={{width: "400px", marginLeft: "35%"}} onSubmit={async (e) => {
            e.preventDefault();
            checkAuthentication();
            console.log(val);
            if(admin === adminkey){
                localStorage.setItem('admin','1');
                navigate(`/Students`);
            }
            if(val === 1){
                localStorage.setItem('admin','0');
                localStorage.setItem('user', `${id}`);
                navigate(`/student/${id}`)
            }else{
                console.log('fuuuckk');
            }
        } }>
            <h2>Student</h2>
            <Form.Field>
                <label>Student ID</label>
                <input placeholder='Student ID' onChange={(e) => setId(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Roll No.</label>
                <input placeholder='Roll no.' onChange={(e) => setRoll(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Field>
            <h2>Admin</h2>
            <Form.Field>
                <label>Admin Key</label>
                <input placeholder='AdminKey' type="password" onChange={(e) => setAdmin(e.target.value)}/>
            </Form.Field>
            <Button positive onClick={(e)=>e.target.innerHTML = 'Confirm'}>Login</Button>
         </Form>

      </>
    );
  }
  
export default LoginPage;