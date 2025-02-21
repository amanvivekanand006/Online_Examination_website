import React, { useEffect, useState } from 'react'
import boy from './Images/boy.jpg'
import './Css/Subjects.css'
import { Link } from 'react-router-dom'



const handleSubjectClick = (subjectName) => {
    localStorage.setItem("subjectname", subjectName);
    console.log("i am saving sub name",subjectName)
};


const Subjects = () =>{
    const[data,setData] = useState({subjects:[]})
        useEffect(()=>{
            fetch("http://127.0.0.1:8000/api/sub/")
            .then(response => response.json())
            .then((sub) => {
                console.log("Fetched subjects:", sub);
                setData(sub)})
            .catch(error => console.error("Error fetching data:", error));
        },[])



  return (
    <div className='card-container'>
         {data.subjects.map((Subject, index)=>
         (
          <div className="card" key={Subject[1]}>
              <img src={boy} alt="Photo" className="card-img" />
              <button className="card-btn" onClick={() => handleSubjectClick(Subject[0])}>
                   <Link to={`/testpage/${Subject[1]}`}> {Subject[0]}</Link>
              </button>
          </div>
         ))}
    </div> 
  )
}

export default Subjects

