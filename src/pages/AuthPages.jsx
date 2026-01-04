import { Form,  } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "use-local-storage";
import { Modal, Button } from "react-bootstrap";

export default function AuthPages() {
  const [ token, setToken ] = useLocalStorage('token', []);
  const [ show, setShow ] = useState(false);
  const toggleregister = () => {setShow(true)};
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  return (
    <>
      <Modal>
        <Modal.Group>
          <Form>
            <Form.Title>Insert Your Email and Password for Register</Form.Title>
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
            <Button>Register</Button>
          </Form>
        </Modal.Group>
      </Modal>
      <Form>
        <Form.Group>
          <Form.Title>Hi Welcome back!</Form.Title>
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
        <a href="url">Forget Password?</a>

        <Button>Login</Button>
        <p>Or</p>
        <Button onClick={toggleregister}>New Register</Button>
      </Form>
    </>
  );
}