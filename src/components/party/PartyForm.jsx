import React, { useEffect, useState } from 'react';
import { Button, FieldGroup, Input } from '../inputs';
import { useForm } from 'react-hook-form';
import { addParty, editParty } from '../../infra';
import { useHandleError, useHandleSuccess } from '../../hooks';
import { toast } from 'react-toastify';

const PartyForm = ({ type, val, modelID }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [msg, setMsg] = useState();

  useEffect(() => {
    if (val) {
      // Set default values for the form fields using setValue
      setValue('goalId', val.data?.id.toString());
    }
  }, [setValue, val]);

  const onSubmit = setError => payload => {
    if (type === 'Create') {
      addParty(payload)
        .then(data => {
          console.log(data);
          localStorage.setItem('toastMessage', data.message);
          window.location.reload();
        })
        .catch(err => {
          toast.error(err.message);
          handleError(err, setError);
        });
    }
    else {
      editParty(payload, modelID)
        .then(data => {
          console.log(data);
          localStorage.setItem('toastMessage', data.message);
          window.location.reload();
        })
        .catch(err => {
          toast.error(err.message);
          handleError(err, setError);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))}>
      <div className="text-green-500">{msg}</div>

      <FieldGroup
        name="name"
        label="Name"
        hideLabel={false}
        error={errors.amount}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the party's name"
          type="text"
          name="amount"
          autoComplete="off"
          hasError={errors.name}
          {...register('name', {
            required: 'Please enter the name',
            value: val?.data?.name,
          })}
        />
      </FieldGroup>
      <FieldGroup
        name="contactNo"
        label="Contact Number"
        hideLabel={false}
        error={errors.contactNo}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the contact number"
          type="number"
          name="contactNo"
          autoComplete="off"
          hasError={errors.contactNo}
          {...register('contactNo', {
            required: 'Please enter the contact number',
            pattern: {
              value: /^[9][678][0-9]{8}$/,
              message: 'Contact Number should be at least 10 digits',

            },
            value: val?.data?.contactNo,
          })}
        />
      </FieldGroup>
      <FieldGroup
        name="email"
        label="Email"
        hideLabel={false}
        error={errors.email}
        className="text-md my-4"
      >
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
            value: val?.data?.email,
          })}
        />
      </FieldGroup>

      <Button className="mt-4 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  );
};

export default PartyForm;
