import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logoIcon from '../../icons/Logo-white.svg';
import { useHandleError } from '../../hooks';
import { Button, Input, Icon, FieldGroup } from '../inputs';
import lockIcon from '../../icons/lock-icon.svg'
import emailIcon from '../../icons/email-icon.svg';
import userIcon from '../../icons/user-icon.svg';
import petsIcon from '../../icons/pets-icon.svg';
import { addUser } from '../../infra';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const SignUp2 = () => {
  const [msg, setMsg] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleError = useHandleError();

  const navigate = useNavigate();
  const { handleSubmit, register, control, setValue, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = setError => payload => {
    return addUser(payload)
      .then(data => {
        if (data.status === 200) {
          setMsg(data.message)
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
        <div className="flex text-green-500 justify-end p-3">{msg}</div>
        <div className="justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <form onSubmit={handleSubmit(onSubmit(setError))} className="my-1 w-screen pr-4 lg:pr-0 lg:w-full" >
              <label className="block text-gray-800 font-semibold text-2xl mb-2">Sign Up</label>
              <label className="block text-black-50 font-normal mb-6">Hey, Enter your details to create new account</label>

              <FieldGroup name="username" className="mb-4" label="User Name" hideLabel={true} showLabelOnMobile={false} error={errors.username}>
                <Input
                  type="text"
                  icon={<Icon icon={userIcon} />}
                  placeholder="Enter your username"
                  hasError={errors.username}
                  name="username"
                  autoComplete="off"
                  {...register('username', { required: 'Please enter your user name' })}
                />
              </FieldGroup>

              <FieldGroup name="email" label="Email" hideLabel={true} showLabelOnMobile={false} error={errors.email}>
                <Input
                  type="email"
                  icon={<Icon icon={emailIcon} />}
                  placeholder="Enter your email"
                  hasError={errors.email}
                  name="email"
                  autoComplete="off"
                  {...register('email', {
                    required: 'Please enter your email address',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </FieldGroup>
              <FieldGroup name="password" className="mt-4 relative" label="Password" hideLabel={true} showLabelOnMobile={false} error={errors.password}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  icon={<Icon icon={lockIcon} />}
                  placeholder="Enter your password"
                  hasError={errors.password}
                  name="password"
                  autoComplete="off"
                  {...register('password', { required: 'Please enter your password', minLength: 8 })}
                />
                <div className="eye-icon absolute top-[17px] left-[342px] float-right  px-4">
                  {showPassword ? (
                    <FaEyeSlash
                      className="password-icon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="password-icon"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </FieldGroup>

              <FieldGroup name="confirmPassword" className="mb-11 mt-4 relative" label="confirmPassword" hideLabel={true} showLabelOnMobile={false} error={errors.confirmPassword}>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  icon={<Icon icon={lockIcon} />}
                  placeholder="Confirm your password"
                  hasError={errors.confirmPassword}
                  name="confirmPassword"
                  autoComplete="off"
                  {...register('confirmPassword', { required: 'Please enter your password again', minLength: 8 })}
                />
                <div className="eye-icon absolute top-[17px] left-[342px] float-right  px-4">
                  {showConfirmPassword ? (
                    <FaEyeSlash
                      className="confirmpassword-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="confirmpassword-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
              </FieldGroup>

              <Button className=" bg-green-120 font-normal " full="true" type="submit" isLoading={isSubmitting} disabled={isSubmitting} >Sign Up</Button>

              <label className="block text-black-50 font-normal text-sm mt-4 text-center">
                Already have an account?
                <Link to="../" className="text-orange-500 ml-1">Login</Link>
              </label>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUp2;
