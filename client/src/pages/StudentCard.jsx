import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Table } from 'semantic-ui-react'

const StudentCard = ({obj, ip}) =>{
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchCourses = async () => {
      try{
          const res = await axios.get(`http://${ip}/coursesTaken/${obj.id}`);
          console.log('Here');
          console.log(res.data)
          setCourses(res.data);
      }catch(err){
          console.log(err);
      }
    };
    fetchCourses();
  },[])
  
    return (
      <Table.Row  style={{cursor: "pointer"}} onClick={() => navigate(`/student/${obj.id}`)}>
        <Table.Cell>{obj.name}</Table.Cell>
        <Table.Cell>{obj.rollno}</Table.Cell>
        <Table.Cell>
          <div style={{display:"flex"}}>
          {courses.length > 0 && courses.map((course) => {
             return(
               <div style={{marginRight: "20px"}}>{course.name}: {course.grade}</div>
             );
          })}
          </div>
        </Table.Cell>
      </Table.Row>
    );
  }
  
export default StudentCard;