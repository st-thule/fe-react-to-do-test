import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form } from '@shared/components/Form';
import Button from '@shared/components/partials/Button';
import { Input } from '@shared/components/partials/Input';
import userService from '@shared/services/user.service';
import { regrex } from '@shared/constants/regrex';

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IRegisterForm>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const newUser = {
        id: crypto.randomUUID(),
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };
      await userService.register(newUser);
      toast.success('Register successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Email is already exists');
      reset({ fullName: '', email: '', password: '', confirmPassword: '' });
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
        <h1 className="form-title">Register</h1>
        <Controller
          name="fullName"
          control={control}
          rules={{ required: 'Full name is required' }}
          render={({ field }) => (
            <Input
              {...field}
              className="input"
              label="Full name"
              errorMessage={errors.fullName?.message}
            />
          )}
        />

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
              label="Email"
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

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Confirm password is required',
            validate: (value) =>
              value === getValues('password') || 'Passwords must match',
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="input"
              type="password"
              label="Confirm Password"
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          className="btn btn-primary btn-xl"
          type="submit"
          label="Register"
        />

        <p className="form-link">
          Yes, I have an account?{' '}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
