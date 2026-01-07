import { useState, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPages() {
  const [ token, setToken ] = useLocalStorage('token', '');
  const [ show, setShow ] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const redirect = useNavigate();

  useEffect(() => {
    console.log("token on render:", JSON.stringify(token));
    if (token) redirect('/', {state: {token}});
  }, [token, redirect]);

  const handleShowRegister = () => {
    setShow(true);
  }

  const handleCloseRegister = () => {
    setShow(false);
  }

  const url = "https://c05a3a4b-6ce4-4b73-bcb4-4adf00190f87-00-1cbacayl5uma6.pike.replit.dev/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        setToken(res.data.token);
        console.log('login was successful, token saved');
      }
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/signup`, { username, password });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <Modal show={show} onHide={handleCloseRegister}>
          <Modal.Body>
            <Form>
              <Form.Label>Insert Your Email and Password for Register</Form.Label>
              <Form.Group>
                <Form.Control 
                  placeholder="Insert Username" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control 
                  placeholder="Insert Password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleSignUp}>Register</Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Hi Welcome back!</Form.Label>
              <Form.Control 
                placeholder="Insert Username" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control 
                placeholder="Insert Password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </Form.Group>
          <Button onClick={handleLogin}>Login</Button>
          <p>Or</p>
          <Button onClick={handleShowRegister}>New Register</Button>
        </Form>
      </Container>
    </>
  );
}