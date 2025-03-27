import React, {useState, useEffect}  from 'react'
import { Link, useParams } from 'react-router-dom'; 
import books from './Images/books.jpg'


export default function Studentssub() {
  const { id } = useParams(); 
  const[data,setData] = useState({ subjects: [], student_id: null })
          useEffect(()=>{
              fetch(`https://online-examination-website-backend-1.onrender.com/api/student_subjects/${id}/`)
              .then(response => response.json())
              .then((sub) => {
                  console.log("Fetched subjects:", sub);
                  setData(sub)})
              .catch(error => console.error("Error fetching data:", error));
          },[id])
  return (
    <div className='sub_container'>
    <div className='card-container'>
         {data.subjects.map((subject, index)=>
         (
          <div className="card" key={index}>
              <img src={books} alt="Photo" className="card-img" />
              <button className="card-btn">
                   <Link to={`/student_ans/${subject}/${data.student_id}`}> {subject}</Link>
              </button>
          </div>
         ))}
    </div> 
    </div>

  )
}
