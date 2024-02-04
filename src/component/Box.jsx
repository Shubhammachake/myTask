import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';

function Box() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [show, setShow] = useState(true);
  const [showSuc, setShowSuc] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');
  const [userName, setUserName] = useState('');
  const [LoginModal, setLoginModal] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      if (!validatePassword(value)) {
        setPasswordError(
          'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 special character.'
        );
      } else {
        setPasswordError('');
      }
    }

    if (name === 'confirmPass') {
      if (value !== data.password) {
        setConfirmPassError('Passwords do not match.');
      } else {
        setConfirmPassError('');
      }
    }
    if (name === 'name') {
      if (value === '') {
        setNameError('Please Enter Name');
      } else {
        setNameError('');
        setShow(true);
      }
    }
    if (name === 'email') {
      if (value === '') {
        setEmailError('Please Enter Email');
      } else {
        setEmailError('');
      }
    }
    setShowSuc(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log('Signing up:', data);

    setUserName(data.name);

    setShowSuc(true);

    setTimeout(() => {
      setShowSuc(false);
    }, 2000);

 

    localStorage.setItem('data', JSON.stringify(data));
    setLoginModal(true);
   setShow(false)
   
  };

  const close = () => {
    setShow(false);
    
    
  };

  const goToLogin=()=>{
    setLoginModal(true)
    setShow(false)
  }

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('data'));
    console.log('data from Storage', storeData);
  }, []);

  return (
    <>
      {show && (
        <Modal show={true}>
          <form onSubmit={handleSignUp}>
            <Modal.Header closeButton>
              <Modal.Title>SignUp</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => handleChange(e)}
                name="name"
                required
              />
              {nameError && <p style={{ color: 'red', marginBottom: '0px' }}>{nameError}</p>}
              <br />

              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => handleChange(e)}
                name="email"
                required
              />
              {emailError && <p style={{ color: 'red', marginBottom: '0px' }}>{emailError}</p>}
              <br />

              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => handleChange(e)}
                name="password"
                required
              />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              <br />

              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => handleChange(e)}
                name="confirmPass"
                required
              />
              {confirmPassError && <p style={{ color: 'red' }}>{confirmPassError}</p>}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit" disabled={passwordError !== '' || confirmPassError !== '' || nameError !== '' || emailError !== ''}>
                SignUp
              </Button>
              <Button variant="primary" onClick={goToLogin}>
                Login
              </Button>
              <Button variant="primary" onClick={close}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      )}

      {showSuc && data.name && data.email && data.password && data.confirmPass === data.password && (
        <Modal show={true}>
          <Modal.Header closeButton>
            <Modal.Title>Hello, {userName}!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Successful SignUp!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowSuc(false)}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      )}
      {LoginModal && <Login/>}
    </>
  );
}

export default Box;
