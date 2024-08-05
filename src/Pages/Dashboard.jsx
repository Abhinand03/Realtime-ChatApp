import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Users from '../Components/Users'
import './Dash.css'
import Navbar from '../Components/Navbar'
import Chatpage from './Chatpage'

function Dashboard() {
  const [status, setstatus] = useState(false)
  const handlechat = () => {
    setstatus(true)


  }


  return (
    <>
      <div >
        <Row className='g-0'>
          <Col md={4} style={{ background: '#113237' }} className='all-users'>
            <div>
              <div style={{ position: "sticky", top: "0px" }}>
                <Navbar />

              </div>
              <div onClick={handlechat}>
                <Users />



              </div>
            </div>

          </Col>


          <Col md={8} className=' ch-bg'>
          <div>
            <Chatpage status={status} />

          </div>


          </Col>
        </Row>


      </div>

    </>
  )
}

export default Dashboard