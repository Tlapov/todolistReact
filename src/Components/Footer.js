import React from 'react'

function Footer() {
  const year = new Date().getFullYear()  
  return (
    <footer>
        <h2>Izradio <span>Toni Lapov</span></h2>
        <p> &copy; {year}</p>
    </footer>
  )
}

export default Footer