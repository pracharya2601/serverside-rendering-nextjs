import {useState} from 'react';
import Link from 'next/Link';
import { useUser } from '../../utils/auth/useUser';
import { getUserFromCookie } from '../../utils/auth/userCookies'
import {authRouteWrapper} from '../../components/authRouteWrapper';

import {Form, Button, Container, Jumbotron, Alert, InputGroup} from 'react-bootstrap';


const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [term, setTerm] = useState(false);
    const [age, setAge] = useState(false);
    const [error, setError] = useState(null);

    const {signUp} = useUser();

    const onSubmit = async (event) => {
      event.preventDefault(); 
      await signUp(email, password, fullName, age, term);
      const userFromCookie = getUserFromCookie();
      if(userFromCookie) {
        window.location.href = '/'
      } else {
        if(!email && !password && !fullName && !term && !age) {
          setError({message: "Enter email and password to continue"})
        } else {
          setError({message: "Email already exist"})
        }
      }

  }
    const onChange = (e, setVal) => {
        setVal(e.target.value)
        setError(null)
    }

    return (
        <Container>
            <Jumbotron style={{marginTop: '20px'}}>
            <h1>Sign Up</h1>
            {error && (
            <Alert variant="danger" variant="danger" onClose={() => setError(null)} dismissible>
              {error.message} 
            </Alert>
            )}
            <Form>
                <Form.Group controlId="formBasicFullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={fullName} onChange={e => onChange(e, setFullName)}  type="text" placeholder="Your Full Name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={e => onChange(e, setEmail)}  type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={e => setPassword(e.target.value)}  type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="age">
                    <InputGroup.Prepend>
                    <InputGroup.Checkbox onChange={() => setAge(!age)} value={age}/>
                    <InputGroup.Text id="basic-addon3">
                        I am over 18 years of age.
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                </Form.Group>
                <Form.Group controlId="termandcondition">
                    <InputGroup.Prepend>
                    <InputGroup.Checkbox onChange={() => setTerm(!term)} value={term}/>
                    <InputGroup.Text id="basic-addon3">
                        I agree to Term and Condition.
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                </Form.Group>

                <Form.Group>
                <Button variant="primary" onClick={onSubmit}>
                    SignUp
                </Button>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                        Already have an Account ? {' '}
                        <Link href="/auth/login">
                            <a>Go to Login</a>
                        </Link>

                    </Form.Label>
                </Form.Group>
            </Form>    
            </Jumbotron>
        </Container>
    )
}

export default authRouteWrapper(Signup);