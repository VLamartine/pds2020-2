import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import classes from './Register.module.css';
import { useState, useEffect } from 'react';

const Register = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: {
      value: '',
      valid: false,
      touched: false
    },
    name: {
      value: '',
      valid: false,
      touched: false
    },
    password: {
      value: '',
      valid: false,
      touched: false
    },
    passwordConfirmation: {
      value: '',
      valid: false,
      touched: false
    }
  });

  useEffect(() => {
    for(let field in formData){
      if(!formData[field].valid){
        setIsFormValid(false);
        return;
      }
    }
    setIsFormValid(true);
  }, [formData]);

  const handleChange = (e) => {
    const value = e.target.value;
    let valid;
    switch (e.target.id) {
      case 'name':
        valid = e.target.value.trim() !== ""
        break;
      case 'email':
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        valid = pattern.test(value);
        break;
      case 'password':
        valid = value.length >= 8;
        break;
      case 'passwordConfirmation':
        valid = value === formData.password.value;
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [e.target.id]: {
        valid: valid,
        value: value,
        touched: true
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const formClasses = [
    classes.Form, 'w-25','p-4' ,'m-auto', 'd-flex', 'flex-column',
    'border', 'border-dark', 'rounded'
  ];
  return (
    <Form noValidate className={formClasses.join` `} onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nome</Form.Label>
        <Form.Control isInvalid={!formData.name.valid && formData.name.touched} required onChange={handleChange} type="text" placeholder="Seu email" />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control isInvalid={!formData.email.valid && formData.email.touched} required onChange={handleChange} type="email" placeholder="Digite seu email" />
        <Form.Control.Feedback type="invalid">Digite um email válido</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Senha</Form.Label>
        <Form.Control isInvalid={!formData.password.valid && formData.password.touched} minLength="8" required onChange={handleChange} type="password" placeholder="Senha" />
        <Form.Control.Feedback type="invalid">A senha deve ter no mínimo 8 caracteres</Form.Control.Feedback>
      </Form.Group> 

      <Form.Group controlId="passwordConfirmation">
        <Form.Label>Confirmar senha</Form.Label>
        <Form.Control isInvalid={!formData.passwordConfirmation.valid && formData.passwordConfirmation.touched} onChange={handleChange} type="password" placeholder="Confirmar senha"  />
        <Form.Control.Feedback type="invalid">As duas senhas devem ser a mesma</Form.Control.Feedback>
      </Form.Group>
      <Button disabled={!isFormValid} className={'m-auto'} variant="primary" type="submit">
        Cadastrar
      </Button>
      <Form.Text>
        <Link to="/login">
          Já possui uma conta? Faça o login!
        </Link>
      </Form.Text>
    </Form>
  )
}

export default Register;