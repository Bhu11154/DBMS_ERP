import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Input, Divider, Form, Label, Button } from 'semantic-ui-react'
import BackButton from "../components/BackButton";
import LogoutBtn from "../components/LogoutBtn";

var isAdmin = '0';
const DeptPage = ({ip}) =>{
  const [depts, setDepts] = useState([])
  const [name, setName] = useState('');
  const [hod, sethod] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const insertDept = async () => {
    try{
        const res = await axios.post(`http://${ip}/insertDept`, {
        id : id,
        name : name,
        hod: hod,
      })
    }catch(err){
      console.log(err);
    }
  }
  const fecthDepts = async () => {
    try{
        const res = await axios.get(`http://${ip}/showDepts/`)
        console.log(res.data)
        setDepts(res.data);
    }catch(err){
        console.log(err);
    }
  };
    useEffect(()=>{
        fecthDepts();
        isAdmin = localStorage.getItem('admin') === '1';
        if(!isAdmin && localStorage.getItem('user')==='None'){
          navigate('/Login');
        }
    },[])
    return (
      <>
      <BackButton/>
      <LogoutBtn/>
         <h1 style={{marginLeft:"43%", marginTop: "50px"}}>Departments</h1>
         {isAdmin && 
          <form action="submit" onSubmit={async (e) => {e.preventDefault(); insertDept(); window.location.reload();}} style={{marginTop: "20px", justifyContent: "center", marginLeft:"25%"}}>
            <Input focus placeholder='Dept. ID' onChange={(e) => setId(e.target.value)} style={{paddingRight: "20px"}}/>
            <Input focus placeholder='Name' onChange={(e) => setName(e.target.value)} style={{paddingRight: "20px"}}/>
            <Input focus placeholder='HOD' onChange={(e) => sethod(e.target.value)} style={{paddingRight: "20px"}}/>
            <Button content='Add' primary />
          </form>
        }
        <Table inverted selectable style={{width: "50%", marginLeft: "25%"}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Department Id</Table.HeaderCell>
            <Table.HeaderCell>Department</Table.HeaderCell>
            <Table.HeaderCell>Head of Dept.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {depts.map((dept) => {
          return(
            <>
              <Table.Row>
                <Table.Cell>{dept.id}</Table.Cell>
                <Table.Cell>{dept.name}</Table.Cell>
                <Table.Cell>{dept.hod}</Table.Cell>
              </Table.Row>
            </>
          )
        })}
        </Table.Body>
        </Table>
      </>
    );
  }
  
export default DeptPage;