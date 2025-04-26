import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '@shared/components/partials/Button';
import { Form } from '@shared/components/partials/Form';
import { Input } from '@shared/components/partials/Input';
import { login } from '@shared/redux/actions/authActions';

interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: ILoginForm) => {
    try {
      const userLogin = {
        email: data.email,
        password: data.password,
      };

      await dispatch(login(userLogin));
      toast.success('Login successfully');
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password');
      reset({ email: '', password: '' });
    }
  };

  return (
    <div className="register">
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
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
        <Button className="btn btn-xl" type="submit" label="Login" />

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
