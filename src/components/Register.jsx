import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the register API endpoint with Axios
        axios.post('http://127.0.0.1:3333/register', formData)
            .then((response) => {

                // Handle the successful registration (e.g., show a success message, redirect, etc.)
                console.log('Registration successful!', response.data);

                navigate('/content');

            })
            .catch((error) => {
                // Handle registration errors (e.g., display error message)
                console.error('Registration failed.', error.response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </label>
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
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
