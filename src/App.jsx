import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import Box from "./component/Box"


export default function App() {

const [show,setShow]=useState(false)


const handleShow=()=>{
  setShow(!show);
 
}
 return (
  <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Task</Navbar.Brand>
        <Button variant="primary"onClick={handleShow}>SignUp</Button>{' '}
      </Container>
      
    </Navbar>
    {show &&<Box/>}
    
    
  </div>
 )
}
