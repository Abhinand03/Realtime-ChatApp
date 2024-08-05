import React from 'react'
import './Land.css'

function Landing() {
  return (
    <>
      <div className='intro-m'>
        <div className='intro-1'>
          <p>Welcome to our innovative chat app, designed to revolutionize the way you communicate! Our app combines cutting-edge technology with user-friendly features to provide a seamless and enjoyable messaging experience. Whether you're connecting with friends, family, or colleagues, our platform offers a variety of tools to make your conversations more engaging and efficient.

          </p>
          <div className='btn-div'>
            <a href='/auth' className='intro-btn ' >
              Explore Now
            </a>

          </div>

        </div>
      </div>

    </>
  )
}

export default Landing