import React, { useState, useEffect, useRef } from 'react'
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs'
import { Controller, useForm } from 'react-hook-form';
import { addParty } from '../../infra';
import { useHandleError, useHandleSuccess } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const PartyForm = () => {
  const { control, register, handleSubmit, setError, setValue, watch, formState: { errors } } = useForm();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [msg, setMsg] = useState()
  const navigate = useNavigate();

  const onSubmit = setError => payload => {
    addParty(payload)
      .then(data => {
        if (data.status === 200) {
          setMsg(data.message)
          navigate('/party')
        }
      })
      .catch(err => handleError(err, setError))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))} >
      <div className="text-green-500">{msg}</div>

      <FieldGroup name="name" label="Name" hideLabel={false} hasError={errors.amount} className="text-md my-4">
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
      <FieldGroup name="contactNo" label="Contact Number" hideLabel={false} hasError={errors.contactNo} className="text-md my-4">
        <Input
          placeholder="Enter the contact number"
          type="text"
          name="contactNo"
          autoComplete="off"
          hasError={errors.contactNo}
          {...register('contactNo', {
            required: 'Please enter the contact number',
          })}
        />
      </FieldGroup>
      <FieldGroup name="email" label="Email" hideLabel={false} hasError={errors.email} className="text-md my-4">
        <Input
          placeholder="Enter the party's name"
          type="text"
          name="email"
          autoComplete="off"
          hasError={errors.email}
          {...register('email', {
            required: 'Please enter the email',
          })}
        />
      </FieldGroup>

      <Button className="mt-4 bg-blue-500 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default PartyForm
