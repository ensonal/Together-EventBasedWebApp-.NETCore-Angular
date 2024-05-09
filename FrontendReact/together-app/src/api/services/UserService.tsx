import LoginForm from '../../routes/Login/LoginForm';
import { LoginValues } from '../models/LoginValues';
import RegisterForm from '../../routes/Register/RegisterForm';
import { RegisterValues } from '../models/RegisterValues';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/axios';

export function Login() {
  const navigate = useNavigate();

  async function handleSubmit(values: LoginValues) {
    const data = await post('/User/login', values);

    localStorage.setItem('jwToken', data.user.jwToken);
    localStorage.setItem('id', data.user.id);
    localStorage.setItem('userRole', data.user.roles[0]);

    navigate('/');
  }

  return <LoginForm onSubmit={handleSubmit} />;
}

export function Register() {
  const navigate = useNavigate();

  async function handleSubmit(values: RegisterValues) {
    const response = await post('/User/register', {
      email: values.Email,
      username: values.Username,
      password: values.Password,
      name: values.Name,
      surname: values.Surname,
      phoneNumber: values.PhoneNumber,
      country: values.Country,
      city: values.City,
      birthday: new Date(),
    });

    if (response.succeeded) {
      navigate('/login');
    }
  }

  return <RegisterForm onSubmit={handleSubmit} />;
}