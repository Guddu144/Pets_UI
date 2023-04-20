import React, { useState, useEffect, useRef } from 'react'
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs'
import { Controller, useForm } from 'react-hook-form';
import { addEarning } from '../../infra/apiClient';
<<<<<<< HEAD
import { useHandleError } from '../../hooks';
=======
>>>>>>> 69673c9 (linechart added and api integrated for earning and expenses)
// import { useHandleError } from '../../../../hooks';

const EarningForm = ({ val: promoCode, type, modelID }) => {
  const { control, register, handleSubmit, setError, setValue, watch, formState: { errors } } = useForm();

  const paymentMethod = [
    {
      id: '0',
      name: 'Cash',
    },
    {
      id: '1',
      name: 'Online',
    },
    {
      id: '2',
      name: 'Cheque',
    },
  ]

  const categories = [
    {
<<<<<<< HEAD
      id: '9',
      name: 'Salary',
    },
    {
      id: '10',
      name: 'Investment income',
    },
    {
      id: '11',
      name: 'Rental income',
    },
    {
      id: '12',
      name: 'Gifts/inheritances',
    },
    {
      id: '13',
      name: 'Retirement income',
    },
    {
      id: '14',
      name: 'Miscellaneous',
    },
  ]

  const handleError = useHandleError();

  const onSubmit = setError => payload => {
    addEarning(payload)
      .then(console.log('done'))
      .catch(err => handleError(err, setError))
=======
      id: '0',
      name: 'Salary',
    },
    {
      id: '1',
      name: 'Investment',
    },
    {
      id: '2',
      name: 'Others',
    },
  ]

  // const handleError = useHandleError();

  const onSubmit = setError => payload => {
    addEarning(payload)
      .then(console.log('done'))
>>>>>>> 69673c9 (linechart added and api integrated for earning and expenses)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))} >
      <FieldGroup name="amount" label="Amount" hideLabel={false} hasError={errors.amount} className="text-md my-4">
        <Input
          placeholder="Enter the Amount"
          type="number"
          name="amount"
          autoComplete="off"
          hasError={errors.amount}
          {...register('amount', {
            required: 'Please enter the amount',
          })}
        />
      </FieldGroup>
      <div className="flex">
        <div className="flex-1">
          <FieldGroup name="date" label="Date" hideLabel={false} className="text-md my-4">
            <Input
              placeholder="Enter from date"
              type="datetime-local"
              name="date"
              autoComplete="off"
              hasError={errors.date}
              {...register('date', {
                required: 'Please enter the from date',
              })}
            />
          </FieldGroup>
        </div>
        <div className="flex-1 ml-2">
        </div>
      </div>

      <FieldGroup name="paymentMethod" label="Payment Method" hideLabel={false} className="text-md my-4">
        <Controller
          control={control}
          name="paymentMethod"
          rules={{ 'required': 'Please select a payment method' }}
          render={({
            field: { onChange, ref, value },
            fieldState: { error },
          }) => (
            <SelectBox
              onChange={onChange}
              items={paymentMethod}
              value={value}
              ref={ref}
              hasError={error}
              placeholder="Select a payment type"
            />
          )}
        />
      </FieldGroup>

      <FieldGroup name="categoryId" label="Category" hideLabel={false} className="text-md my-4">
        <Controller
          control={control}
          name="categoryId"
          rules={{ 'required': 'Please select a categorey type' }}
          render={({
            field: { onChange, ref, value },
            fieldState: { error },
          }) => (
            <SelectBox
              onChange={onChange}
              items={categories}
              value={value}
              ref={ref}
              hasError={error}
              placeholder="Select a categorey type"
            />
          )}
        />
      </FieldGroup>

      <FieldGroup name="note" label="Note" hideLabel={false} hasError={errors.note} className="text-md my-4">
        <TextArea
          placeholder="Enter the note"
          type="textArea"
          name="note"
          autoComplete="off"
          hasError={errors.note}
          {...register('note', {
            required: 'Please enter the note',
          })}
        />
      </FieldGroup>

      <Button className="mt-4 bg-blue-500 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default EarningForm;
