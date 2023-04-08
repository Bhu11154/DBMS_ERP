import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Input, Divider, Form, Label, Button } from 'semantic-ui-react'
import BackButton from "../components/BackButton";
import LogoutBtn from "../components/LogoutBtn";
var isAdmin = '0';

const CoursesPage = ({ip}) =>{
  const [courses, setCourses] = useState([])
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const insertCourse = async () => {
    try{
        const res = await axios.post(`http://${ip}/insertCourse`, {
        id : id,
        name : name,
        dept: dept,
      })
    }catch(err){
      console.log(err);
    }
  }
  const fetchCourses = async () => {
    try{
        const res = await axios.get(`http://${ip}/showCourses/`)
        console.log("heyy");
        console.log(res.data)
        setCourses(res.data);
    }catch(err){
        console.log(err);
    }
  };
    useEffect(()=>{
        fetchCourses();
        isAdmin = localStorage.getItem('admin') === '1';
        if(!isAdmin && localStorage.getItem('user')==='None'){
          navigate('/Login');
        }
    },[])
    return (
      <>
        <BackButton/>
        <LogoutBtn/>
        <h1 style={{marginLeft:"43%", marginTop: "50px"}}>Courses</h1>
        {isAdmin && 
          <form action="submit" onSubmit={async (e) => {e.preventDefault(); insertCourse(); window.location.reload();}} style={{marginTop: "20px", justifyContent: "center", marginLeft:"25%"}}>
            <Input focus placeholder='Course ID' onChange={(e) => setId(e.target.value)} style={{paddingRight: "20px"}}/>
            <Input focus placeholder='Name' onChange={(e) => setName(e.target.value)} style={{paddingRight: "20px"}}/>
            <Input focus placeholder='Department' onChange={(e) => setDept(e.target.value)} style={{paddingRight: "20px"}}/>
            <Button content='Add' primary />
          </form>
        }
        <Table celled inverted selectable style={{width: "50%", marginLeft: "25%"}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Course Id</Table.HeaderCell>
            <Table.HeaderCell>Course</Table.HeaderCell>
            <Table.HeaderCell>Department</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {courses.map((course) => {
          return(
            <>
              <Table.Row>
                <Table.Cell>{course.CourseId}</Table.Cell>
                <Table.Cell>{course.CourseName}</Table.Cell>
                <Table.Cell>{course.DepartName}</Table.Cell>
              </Table.Row>
            </>
          )
        })}
        </Table.Body>
        </Table>
      </>
    );
  }
  
export default CoursesPage;