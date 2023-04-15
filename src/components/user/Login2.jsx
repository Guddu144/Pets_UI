import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FieldGroup, Input, Button, Icon } from '../../components/inputs';
import { useHandleError } from '../../hooks';
import { classNames } from '../../utils';
import petsIcon from '../../icons/Pets-icon.svg';
import logoIcon from '../../icons/Logo-white.svg';
import { loginUser } from '../../infra';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

const Login2 = () => {
  const onChange = value => {
    console.log(value);
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  localStorage.clear();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const handleError = useHandleError();

  const onSubmit = setError => payload => {
    return loginUser(payload)
      .then(data => {
        if (data.status === 200) {
          const loginData = data.data;
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('message', data.message);
          navigate('/');
        } else {
          handleError(
            { errors: { username: ['Invalid login credentials'] } },
            setError,
          );
        }
      })
      .catch(err => {
        if (err.message.includes('User')) {
          handleError({ errors: { username: [`${err.message}`] } }, setError);
        } else {
          handleError({ errors: { password: [`${err.message}`] } }, setError);
        }
      });
  };

  return (
    <div className="min-h-screen flex ">
      <div className=" hidden lg:block relative px-20 bg-green-120 w-1/2 h-screen ">
        <div className="flex items-center justify-center h-full">
          <div className="absolute top-[40px] left-[60px]">
            {<Icon className=" h-6" icon={logoIcon} />}
          </div>
          <div className="flex-col ">
            <div className="flex justify-center text-left">
              {<Icon icon={petsIcon} />}
            </div>
            <div className="flex flex-col justify-center">
              <div className="w-full"></div>
              <div className="text-center">
                <p className="text-sm text-white max-w-[450px] mx-auto">
                  Personal Expenditure Tracking System helps individuals manage
                  their finances by tracking their spending and providing a
                  clear overview of their financial situation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-auto w-1/2">
        <div className="justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Login</h1>
              <h2 className="mt-1 text-sm text-gray-400">
                Welcome to ACS, Enter your credentials to access your account!!
              </h2>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit(setError))}
              className="mt-8 w-screen pr-4 lg:pr-0 lg:w-full"
            >
              <div className="space-y-5">
                <FieldGroup
                  className="text-sm"
                  name="username"
                  label="Username"
                  error={errors.username}
                >
                  <Input
                    id="username"
                    type="text"
                    hasError={errors.username}
                    {...register('username', {
                      required:
                        'please provide your email, phone number, or username',
                    })}
                    placeholder="Enter your username"
                  />
                </FieldGroup>
                <FieldGroup
                  className="text-sm relative "
                  name="password"
                  label="Password"
                  error={errors.password}
                >
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    hasError={errors.password}
                    {...register('password', {
                      required: 'please enter your password',
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
                        message:
                          'Use 8 or more characters with letters, numbers & symbols',
                      },
                    })}
                    placeholder="Enter your password"
                    className="relative"
                  />
                  <span className="eye-icon absolute top-[34px] left-[342px] px-4 float-right ">
                    {showPassword ? (
                      <FaEyeSlash
                        className="password-icon  "
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </span>
                </FieldGroup>
                <div>
                  <ReCAPTCHA
                    sitekey="6LezLzYlAAAAABE9L3oDnQ1gk0TjX3ox1DqZGYaP"
                    onChange={onChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="rememberMe"
                    id="rememberMe"
                    value="true"
                  />
                  <label htmlFor="rememberMe"> Remember me</label>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  to="/ForgetPassword"
                  className="text-blue-700 font-normal text-sm mt-3"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-6">
                <Button
                  className=" bg-green-120 font-normal"
                  full
                  isLoading={isSubmitting}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in' : 'Login'}
                </Button>
              </div>
              <label className="block text-black-50 font-normal text-sm mt-4 text-center">
                Don&apos;t have an account?
                <Link to="/signup" className="text-orange-500 ml-1">
                  Register
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
