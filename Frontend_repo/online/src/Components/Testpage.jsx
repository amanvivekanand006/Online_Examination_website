import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import './Css/Testpage.css'
import axios from 'axios';

function Testpage() {
  const { id } = useParams()
  const studentId = localStorage.getItem("student_id"); // Get student ID from local storage
  const subject = localStorage.getItem("subjectname")
  // const studentId = "17"
  // const subject = "react js"
  const[data,setData] = useState([])
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(15);

  const[form,setForm]= useState({
    student: studentId || "", // Ensure it's not null
    question: id || "", // Question ID from URL
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    subject: subject || ""
  
  })
  
  const handleChange=(e)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit=(e)=>{
    // e.preventDefault()
    if (e) e.preventDefault()
    const token = localStorage.getItem("access_token")
    console.log(token)
    console.log(form)
    axios.post(`https://online-examination-website-backend-1.onrender.com/api/Taking_ans/${subject}/`,
      form,
      {
          headers: {
              'Authorization': `Bearer ${token}`, // Add token to headers
              'Content-Type': 'application/json' // Ensure JSON format
          }
      }
    )
    .then((response)=>{
        console.log(response.data)
        setErrorMessage("");
        navigate("/thanks");
    })
    .catch((error)=>{
        console.error(error)
        // Check if the response contains an error message from Django
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Set the error message
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    })
}


  useEffect(()=>{
    fetch(`https://online-examination-website-backend-1.onrender.com/api/update_test_questions/${id}/`)
    .then(response => response.json())
    .then((data) => {
       setData(data)
       console.log("Fetched subjects:", data)
    })
    .catch(error => console.error("Error fetching data:", error))
  },[id])
  
  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit when timer hits zero
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;




  return (
      <div className="form-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

       <div className="timer">
        <h1>
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
        </div>

      <form id="testForm" onSubmit={handleSubmit}>
        <div>
        <h3>Question:{data.question1} </h3>
        <textarea name="answer1" value={form.answer1} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question2} </h3>
        <textarea name="answer2" value={form.answer2} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question3} </h3>
        <textarea name="answer3" value={form.answer3} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question4} </h3>
        <textarea name="answer4" value={form.answer4} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
        <div>
        <h3>Question:{data.question5} </h3>
        <textarea name="answer5" value={form.answer5} onChange={handleChange} type="text" placeholder='Enter Your Answer Here'></textarea>
        </div>
    
        <button type="submit" >Submit</button>
      </form>
    </div>
        
  )
}

export default Testpage