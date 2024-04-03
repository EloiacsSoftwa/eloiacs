import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, FormControl, Image, Row } from 'react-bootstrap';
import Logo from "../../Assets/images/H&T.png";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'; // Import eye icons
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { KEY_IS_LOGGED_IN, RESET_PASSWORD_API_CALL, USER_ACCOUNT_LOGOUT, storeToLocalStorage } from '../../utils/Constant';
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'confirm password') {
      setConfirmPassword(value);
      if (password === value) {
        setPasswordMatch(true);
      }else {
        setPasswordMatch(false);
      }
    }
  }

  const handleResetPassword = () => {
    if (password.length === 0) {
      setError("Invalid Password");
      return;
    }
    if (confirmPassword.length === 0 || !passwordMatch) {
      setError("Invalid Confirm Password");
      return;
    }
    if (password === props.loginUsers.password) {
      toast.error("New password must be different from the old password");
      return;
    }

    const bodyData = {
      userId: props.loginUsers.loginId,
      password: password,
    }

    // axios.post('http://97.74.94.57:8080/handt/v2/account/reset-password', bodyData).then(response => {
    //   console.log(response.data.data);
    //   toast.success("Password reset successfully");
    //   storeToLocalStorage(KEY_IS_LOGGED_IN, false);
    //   dispatch({ type: USER_ACCOUNT_LOGOUT })
      
    // }).catch(error => {
    //   console.log("Error Encountered", error);
    //   toast.error("Failed to reset password");
    // })
    dispatch({ type: RESET_PASSWORD_API_CALL, data: bodyData })
    storeToLocalStorage(KEY_IS_LOGGED_IN, false);
    dispatch({ type: USER_ACCOUNT_LOGOUT })
  }

  return (
    <div className='full-background' style={{ paddingRight: 50, paddingLeft: 50 }}>
      <ToastContainer />
      <Row>
        <Col className='text-end mt-2'>
          <Link to='/'><IoMdClose style={{ fontSize: 28, cursor: 'pointer', color: '#1d1d5e' }} /></Link>
        </Col>
      </Row>
      <Container fluid className='d-flex justify-content-center pt-5'>
        <div className='border text-center mt-5 shadow rounded bg-light' style={{ width: 450, height: 420 }}>
          <Image src={Logo} style={{ width: 200 }} />
          <div>
            <FloatingLabel className='mb-3' style={{ marginInlineStart: 75 }} label="New Password">
              <FormControl name='password' className='rounded-3 inputfocus' placeholder='Enter new password' type={showPassword ? 'text' : 'password'} style={{ width: 300 }} onChange={(e) => handlePassword(e)} />
              <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer', position: 'absolute', right: 100, top: '50%', transform: 'translateY(-50%)', color: '#CCCCCC' }}>
                {showPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
              </span>
              {error && !password && (
                <p style={{ fontSize:12, color: 'red', marginInlineEnd: 250 }}>
                  Please Enter Password.
                </p>
              )}
            </FloatingLabel>
            <FloatingLabel label="Confirm Password" style={{ marginInlineStart: 75 }}>
              <FormControl name='confirm password' className='rounded-3 inputfocus' placeholder='Confirm password' type={showPassword ? 'text' : 'password'} style={{ width: 300 }} onChange={(e) => handlePassword(e)} />
              {error && !confirmPassword ? (
                <p style={{ fontSize:12, color: 'red', marginInlineEnd: 200 }}>
                  Please confirm your password.
                </p>
              ) : error && !passwordMatch ? (
                <p style={{ fontSize:12, color: 'red', marginInlineEnd: 250 }}>
                  Password do no match.
                </p>
              ) : null}
            </FloatingLabel>
          </div>
          <Button className='mt-4 border-0 fw-bolder' type='submit' style={{ backgroundColor: '#1d1d5e', width: 'max-content', height: 'max-content' }} onClick={handleResetPassword}>Reset Password</Button>
        </div>
      </Container>
    </div>
  )
}

const mapToProps = (state) => {
  return {
    loginUsers: state.users,
  }
}


export default connect(mapToProps)(ResetPassword);
