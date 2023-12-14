import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function Landingpage() {

  // function definition
  // redirect from one page to another page we can use hook ie useNavigate()

  const navigate=useNavigate()
  const handleNavigate=()=>{
   
    navigate('/home')

  }
  return (
    <>

      <Row>

        <Col></Col>

        <Col lg={6}>

          <h1>Welcome Videos.com</h1>
          <p style={{textAlign:'justify'}}>Where user can use their favourite videos,user can upload any youtube videos by copy & paste their url in  to Videos.com will allow to add & remove their uploaded videos & also arrange them in different categories by drag & drop it is free try it now!!! </p>

          <button onClick={handleNavigate} className='btn btn-dark'>Click Here To Know More</button>

        </Col>

        <Col lg={5}>

          <img src="https://cdn.dribbble.com/users/2057110/screenshots/13891063/media/a5bd8fba15af54af793e087d6f3a7587.gif" alt="no image" className='img-fluid'/>

        </Col>

      </Row>


    </>
  )
}

export default Landingpage