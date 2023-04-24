import React, { useState, useEffect, useRef } from 'react'
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs'
import { Controller, useForm } from 'react-hook-form';
import { addExpense } from '../../infra';
import { useHandleError } from '../../hooks';
import { useNavigate } from 'react-router-dom';
// import { useHandleError } from '../../../../hooks';

const ExpenseForm = ({ val: promoCode, type, modelID }) => {
  const { control, register, handleSubmit, setError, setValue, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
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
      id: '1',
      name: 'Foods and Drinks',
    },
    {
      id: '2',
      name: 'Transportation',
    },
    {
      id: '3',
      name: 'Entertainment',
    },
    {
      id: '4',
      name: 'Health',
    },
    {
      id: '5',
      name: 'Education',
    },
    {
      id: '6',
      name: 'Debt payments',
    },
    {
      id: '7',
      name: 'Housing',
    },
    {
      id: '8',
      name: 'Miscellaneous',
    },
  ]

  const handleError = useHandleError();
  const onSubmit = setError => payload => {
    addExpense(payload)
      .then(window.location.reload())
      .catch(err => handleError(err, setError))
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
              type="date"
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

      <Button className="mt-4  font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default ExpenseForm;
