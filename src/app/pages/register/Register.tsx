import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '@app/shared/redux/actions/authActions';
import { toast } from 'react-toastify';

import Button from '@shared/components/partials/Button';
import { Form } from '@shared/components/partials/Form';
import { Input } from '@shared/components/partials/Input';

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register: React.FC = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const newUser = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };
      await dispatch(register(newUser));
      toast.success('Register successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Email is already exists');
      setTimeout(() => {
        reset({ fullName: '', email: '', password: '', confirmPassword: '' });
      }, 4000);
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
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
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

        <Button className="btn btn-xl" type="submit" label="Register" />

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
