import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Divider, Form, Label, Button } from 'semantic-ui-react'
import BackButton from "../components/BackButton";
import LogoutBtn from "../components/LogoutBtn";
import { useNavigate } from "react-router-dom";

var isAdmin = '0';

const EnrollmentPage = ({ip}) =>{
  const [enrollments, setEnrollments] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const insertEnrollment = async () => {
    try{
        const res = await axios.post(`http://${ip}/insertEnrollment`, {
        id : id,
        studId : studentId,
        courseId: courseId,
        grade: "X"
      })
    }catch(err){
      console.log(err);
    }
  }
  const fetchEnrollments = async () => {
    try{
        const res = await axios.get(`http://${ip}/getEnrollmentDetails/`)
        console.log(res.data)
        setEnrollments(res.data);
    }catch(err){
        console.log(err);
    }
  };
    useEffect(()=>{
        fetchEnrollments();
        isAdmin = localStorage.getItem('admin') === '1';
        if(!isAdmin && localStorage.getItem('user')==='None'){
          navigate('/Login');
        }
    },[])
    return (
      <>
        <BackButton/>
        <LogoutBtn/>
          <h1 style={{marginLeft:"43%", marginTop: "30px"}}>Enrollments</h1>
          {isAdmin && 
            <form action="submit" onSubmit={async (e) => {e.preventDefault(); insertEnrollment(); window.location.reload();}} style={{marginTop: "20px", justifyContent: "center", marginLeft:"25%"}}>
              <Input focus placeholder='Enroll ID' onChange={(e) => setId(e.target.value)} style={{paddingRight: "20px"}}/>
              <Input focus placeholder='Student ID' onChange={(e) => setStudentId(e.target.value)} style={{paddingRight: "20px"}}/>
              <Input focus placeholder='Course ID' onChange={(e) => setCourseId(e.target.value)} style={{paddingRight: "20px"}}/>
              <Button content='Enroll' primary />
            </form>
          }
        <Table inverted selectable style={{width: "50%", marginLeft: "25%"}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Enroll ID</Table.HeaderCell>
            <Table.HeaderCell>Student Name</Table.HeaderCell>
            <Table.HeaderCell>Course</Table.HeaderCell>
            <Table.HeaderCell>Grade</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {enrollments.length > 0 && enrollments.map((enrollment) => {
            return(
              <Table.Row>
                  <Table.Cell>{enrollment.EnrollId}</Table.Cell>
                  <Table.Cell>{enrollment.StudentName}</Table.Cell>
                  <Table.Cell>{enrollment.CourseName}</Table.Cell>
                  <Table.Cell>{enrollment.Grade}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
        </Table>
      </>
    );
  }
  
export default EnrollmentPage;