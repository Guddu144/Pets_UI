import React, { useState, useEffect, useRef } from 'react'
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs'
import { Controller, useForm } from 'react-hook-form';
import { addEarning } from '../../infra/apiClient';
import { useHandleError } from '../../hooks';
import { isAfter, parseISO } from 'date-fns';

const EarningForm = () => {
  const { control, register, handleSubmit, setError, formState: { errors } } = useForm();

  const paymentMethod = [
    {
      id: 'Cash',
      name: 'Cash',
    },
    {
      id: 'Online',
      name: 'Online',
    },
    {
      id: 'Cheque',
      name: 'Cheque',
    },
  ]

  const categories = [
    {
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

  const validateDate = value => {
    const selectedDate = parseISO(value);
    const today = new Date();

    if (isAfter(selectedDate, today)) {
      return 'Selected date cannot be greater than today';
    }

    return true;
  };

  const handleError = useHandleError();

  const onSubmit = setError => payload => {
    addEarning(payload)
      .then(window.location.reload())
      .catch(err => handleError(err, setError))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))} >
      <FieldGroup name="amount" label="Amount" hideLabel={false} error={errors.amount} className="text-md my-4">
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
          <FieldGroup name="date" label="Date" hideLabel={false} error={errors.date} className="text-md my-4">
            <Input
              placeholder="Enter from date"
              type="date"
              name="date"
              autoComplete="off"
              hasError={errors.date}
              {...register('date', {
                validate: validateDate,
                required: 'Please enter the from date',
              })}
            />
          </FieldGroup>
        </div>
        <div className="flex-1 ml-2">
        </div>
      </div>

      <FieldGroup name="paymentMethod" label="Payment Method" error={errors.paymentMethod} hideLabel={false} className="text-md my-4">
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

      <FieldGroup name="categoryId" label="Category" hideLabel={false} error={errors.categoryId} className="text-md my-4">
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

      <FieldGroup name="note" label="Note" hideLabel={false} error={errors.note} className="text-md my-4">
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

      <Button className="mt-4font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default EarningForm;
