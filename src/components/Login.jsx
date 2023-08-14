// Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the login API endpoint with Axios
        axios.post('http://127.0.0.1:3333/login', formData)
            .then((response) => {
                // Handle successful login
                console.log('Login successful!', response.data);
                localStorage.setItem('token', response.data.token);
                navigate('/content');

            })
            .catch((error) => {
                // Handle login errors
                console.error('Login failed.', error.response.data);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
