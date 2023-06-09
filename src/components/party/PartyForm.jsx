import React, { useState } from 'react'
import { Button, FieldGroup, Input } from '../inputs'
import { useForm } from 'react-hook-form';
import { addParty } from '../../infra';
import { useHandleError, useHandleSuccess } from '../../hooks';

const PartyForm = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [msg, setMsg] = useState()

  const onSubmit = setError => payload => {
    addParty(payload)
      .then(window.location.reload())
      .catch(err => handleError(err, setError))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))} >
      <div className="text-green-500">{msg}</div>

      <FieldGroup name="name" label="Name" hideLabel={false} error={errors.amount} className="text-md my-4">
        <Input
          placeholder="Enter the party's name"
          type="text"
          name="amount"
          autoComplete="off"
          hasError={errors.name}
          {...register('name', {
            required: 'Please enter the name',
          })}
        />
      </FieldGroup>
      <FieldGroup name="contactNo" label="Contact Number" hideLabel={false} error={errors.contactNo} className="text-md my-4">
        <Input
          placeholder="Enter the contact number"
          type="number"
          name="contactNo"
          autoComplete="off"
          hasError={errors.contactNo}
          {...register('contactNo', {
            required: 'Please enter the contact number',
          })}
        />
      </FieldGroup>
      <FieldGroup name="email" label="Email" hideLabel={false} error={errors.email} className="text-md my-4">
        <Input
          placeholder="Enter the party's email"
          type="email"
          name="email"
          autoComplete="off"
          hasError={errors.email}
          {...register('email', {
            required: 'Please enter the email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </FieldGroup>

      <Button className="mt-4 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default PartyForm
