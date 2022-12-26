import React from 'react';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { FieldGroup, Input, Button } from '../../components/inputs';
import { useHandleError } from '../../hooks';
import { classNames } from '../../utils';
import petsIcon from '../../icons/pets_icon.png';

const Login = () => {

  const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const handleError = useHandleError();

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block relative py-14 px-20 bg-blue-500 w-1/2">
        <div className="flex justify-center d-block text-left">
          <img height={150} width={150} src={petsIcon}></img>
        </div>
        <div className="mt-48 flex flex-col justify-center">
          <div className="w-full">
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mt-10 mb-3">PETS</h1>
            <p className="text-sm text-blue-300 max-w-[450px] mx-auto">
              pets is a Personal Expenditure Tracking System which is used to keep track of personal finances.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-auto w-1/2">
        <div className="justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Login</h1>
              <h2 className="mt-1 text-sm text-gray-400">Welcome to PETS, Enter your credentials to access your account</h2>
            </div>
            <form className="mt-8" >
              <div className="space-y-5">
                <FieldGroup className="text-sm" name="username" label="Username" error={errors.username}>
                  <Input
                    id="username"
                    type="text"
                    hasError={errors.username}
                    {...register('username', {
                      required: 'please provide your email, phone number, or username',
                    })}
                    placeholder="Enter your username"
                  />
                </FieldGroup>
                <FieldGroup className="text-sm" name="password" label="Password" error={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    hasError={errors.password}
                    {...register('password', {
                      required: 'please enter your password',
                    })}
                    placeholder="Enter your password"
                  />
                </FieldGroup>
              </div>
              <Button className="mt-8 bg-blue-500 font-normal" full isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
