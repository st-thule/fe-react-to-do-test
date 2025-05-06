import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@shared/components/Form';
import Button from '@shared/components/partials/Button';
import { Input } from '@shared/components/partials/Input';
import { AuthContext } from '@shared/context/auth.context';
import userService from '@shared/services/user.service';
import { regrex } from '@shared/constants/regrex';

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const authContext = useContext(AuthContext);
  const currentUser = authContext.isUserLoggedIn();
  const navigate = useNavigate();

  if (currentUser) {
    navigate('/');
  }

  const onSubmit = async (data: ILoginForm) => {
    try {
      const userLogin = {
        email: data.email,
        password: data.password,
      };
      await userService.login(userLogin.email, userLogin.password);
      toast.success('Login successfully');
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="auth-wrapper">
      <Form
        className="form form-auth"
        onSubmit={handleSubmit(onSubmit)}
        defaultValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      >
        <h1 className="form-title">Welcome back!</h1>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: regrex.regresValue,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="input"
              label="Username"
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="input"
              type="password"
              label="Password"
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Login"
        />

        <p className="form-link">
          Don’t have and account?{' '}
          <Link to="/register">
            <span>Register</span>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
