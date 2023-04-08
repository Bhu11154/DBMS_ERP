import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import axios from 'axios'
import { Table } from 'semantic-ui-react'
import BackButton from "../components/BackButton";
import NavButton from "../components/NavButton";
import LogoutBtn from "../components/LogoutBtn";
import { useNavigate } from "react-router-dom";

var isAdmin;

const AllStudents = ({ip}) =>{
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchStudents = async () => {
            try{
                const res = await axios.get(`http://${ip}/showStudents`)
                setStudents(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchStudents();
        isAdmin = localStorage.getItem('admin') === '1';
        if(!isAdmin && localStorage.getItem('user')==='None'){
          navigate('/Login');
        }
    },[])
    return (
      <>
      <BackButton/>
      <LogoutBtn/>
        <h1 style={{marginLeft:"43%", marginTop: "60px"}}>Student List</h1>
        <NavButton name={'Courses'} pos={30} top={9}/>
        <NavButton name={'Departments'} pos={15} top={9}/>
        <NavButton name={'Enrollments'} pos={1} top={9}/>
        <Table singleLine inverted selectable style={{width: "50%", marginLeft: "25%", marginTop:"40px"}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Roll No.</Table.HeaderCell>
            <Table.HeaderCell>Courses/Grade</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {students.map((student)=>{
              return <StudentCard obj={student} ip={ip}/>
          })}
        </Table.Body>
        </Table>
      </>
    );
  }
  
export default AllStudents;