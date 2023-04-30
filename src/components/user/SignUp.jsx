import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import logoIcon from '../../icons/Logo-white.svg';
import { useHandleError } from '../../hooks';
// import { addUser } from '../../infra';
import { Button, Input, Icon, FieldGroup } from '../inputs';

import lockIcon from '../../icons/lock-icon.svg'
import emailIcon from '../../icons/email-icon.svg';
import userIcon from '../../icons/user-icon.svg';
import petsIcon from '../../icons/pets-icon.svg';
import { addUser } from '../../infra';

const SignUp = () => {
  const handleError = useHandleError();

  const navigate = useNavigate();
  const { handleSubmit, register, control, setValue, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = setError => payload => {
    return addUser(payload)
      .then(data => {
        if (data.status === 200) {
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          handleError(null, null, data.error_msg);
        }
      })
      .catch(err => {
        handleError(null, null, err.message);
      });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block relative py-14 px-20 bg-green-120 w-1/2">
        <div className="flex items-center justify-center h-full">
          <div className="absolute top-[40px] left-[60px]">
            {<Icon className=" h-6" icon={logoIcon} />}
          </div>
          <div className="flex-col ">
            <div className="flex justify-center text-left">
              {<Icon icon={petsIcon} />}
            </div>
            <div className="flex flex-col justify-center">
              <div className="w-full">
              </div>
              <div className="text-center">
                <p className="text-sm text-white max-w-[450px] mx-auto">
                  Personal Expenditure Tracking System helps individuals manage their finances by tracking their spending
                  and providing a clear overview of their financial situation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-auto w-1/2">
        <div className="justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <form onSubmit={handleSubmit(onSubmit(setError))} className="my-1 w-screen pr-4 lg:pr-0 lg:w-full" >
              <label className="block text-gray-800 font-semibold text-2xl mb-2">Sign Up</label>
              <label className="block text-black-50 font-normal mb-6">Hey, Enter your details to create new account</label>

              <FieldGroup name="username" className="mb-4" label="User Name" hideLabel={true} showLabelOnMobile={false} error={errors.username}>
                <Input
                  type="text"
                  icon={<Icon icon={userIcon} />}
                  placeholder="Enter your name"
                  hasError={errors.username}
                  name="username"
                  autoComplete="off"
                  {...register('username', { required: 'Please enter your user name' })}
                />
              </FieldGroup>

              <FieldGroup name="email" label="Email" hideLabel={true} showLabelOnMobile={false} error={errors.email}>
                <Input
                  type="text"
                  icon={<Icon icon={emailIcon} />}
                  placeholder="Enter your email"
                  hasError={errors.email}
                  name="email"
                  autoComplete="off"
                  {...register('email', { required: 'Please enter your email address' })}
                />
              </FieldGroup>

              <FieldGroup name="password" className="mt-4" label="Password" hideLabel={true} showLabelOnMobile={false} error={errors.password}>
                <Input
                  type="password"
                  icon={<Icon icon={lockIcon} />}
                  placeholder="Enter your password"
                  hasError={errors.password}
                  name="password"
                  autoComplete="off"
                  {...register('password', { required: 'Please enter your password' })}
                />
              </FieldGroup>

              <FieldGroup name="confirmPassword" className="mb-11 mt-4" label="confirmPassword" hideLabel={true} showLabelOnMobile={false} error={errors.confirmPassword}>
                <Input
                  type="password"
                  icon={<Icon icon={lockIcon} />}
                  placeholder="Confirm your password"
                  hasError={errors.confirmPassword}
                  name="confirmPassword"
                  autoComplete="off"
                  {...register('confirmPassword', { required: 'Please enter your password again' })}
                />
              </FieldGroup>

              <Button className=" bg-green-120 font-normal " full="true" type="submit" isLoading={isSubmitting} disabled={isSubmitting}>Sign Up</Button>

              <label className="block text-black-50 font-normal text-sm mt-4 text-center">
                Already have an account?
                <Link to="../" className="text-orange-500 ml-1">Login</Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp;
