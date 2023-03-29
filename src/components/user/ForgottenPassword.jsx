import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FieldGroup, Input, Button, Icon } from '../../components/inputs';
import { useHandleError } from '../../hooks';
import { classNames } from '../../utils';
import petsIcon from '../../icons/Pets-icon.svg';
import logoIcon from '../../icons/Logo-white.svg';

const ForgottenPassword = () => {
  const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const handleError = useHandleError();

  const onSubmit = setError => payload => {

  };

  return (
    <div className="min-h-screen flex">
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
            <div>
              <h1 className="text-2xl font-semibold mb-2">Password Reset</h1>
              <h2 className="mt-1 text-sm text-gray-400">Reset your password</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit(setError))} className="mt-8 w-screen pr-4 lg:pr-0 lg:w-full">

              <div className="space-y-5">
                <FieldGroup className="text-sm" name="username" label="Enter your email address" error={errors.username}>
                  <Input
                    id="username"
                    type="text"
                    hasError={errors.username}
                    {...register('username', {
                      required: 'please provide your email, phone number, or username',
                    })}
                    placeholder="Enter your email"
                  />
                </FieldGroup>
              </div>
              <div className="mt-6">
                <Button className=" bg-green-120 font-normal" full isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in' : 'Login'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgottenPassword
