import React, { useState } from 'react'
import students from './data'
import '../App.css'

const Reportcard = () => {

  const [studentData, setStudentData] = useState(students)
  const [name, setName] = useState("")
  const [marks, setMarks] = useState("")

  function submitHandler(event){
    event.preventDefault()

    if(!name || !marks) return

    const newStudent = {
      name: name,
      marks: Number(marks)
    }

    setStudentData([...studentData, newStudent])

    setName("")
    setMarks("")
  }

  let TotalStudents = studentData.length

  let PassedStudent = studentData.filter((item) => item.marks >= 40).length

  let FailedStudent = studentData.filter((item) => item.marks < 40).length

  let totalMarks = studentData.reduce((acc, item) => acc + item.marks, 0)
  let average = TotalStudents ? (totalMarks / TotalStudents).toFixed(2) : 0

  return (
    <div className="container">
      <h2 className="title">Report Card</h2>

      <form onSubmit={submitHandler} className="form">
        <input 
          placeholder='name' 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input 
          placeholder='marks' 
          value={marks}
          onChange={(e)=>setMarks(e.target.value)}
        />

        <button type='submit'>Add</button>
      </form>

      <p>Total: {TotalStudents}</p>
      <p>Passed: {PassedStudent}</p>
      <p>Failed: {FailedStudent}</p>
      <p>Average: {average}</p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {
            studentData.map((item,index) => {
              const status = item.marks >= 40 ? "Pass" : "Fail"

              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.marks}</td>
                  <td className={status === "Pass" ? "pass" : "fail"}>
                    {status}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Reportcard