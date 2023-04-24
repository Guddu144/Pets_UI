import React from 'react'
import { AsyncSearchBox, Button, FieldGroup, Input, SelectBox } from '../inputs'
import { useHandleError } from '../../hooks';
import { Controller, useForm } from 'react-hook-form';
import { addTranscationn, getParty } from '../../infra';

const TranscationForm = () => {
  const { control, register, handleSubmit, setError, setValue, watch, formState: { errors } } = useForm();
  const handleError = useHandleError();
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
  const paymentType = [
    {
      id: 'in',
      name: 'Incoming',
    },
    {
      id: 'out',
      name: 'Outgoing',
    },

  ]

  const onSubmit = setError => payload => {
    addTranscationn(payload)

      .then(
        console.log('gsjdb'),
      )
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
              placeholder="Select a payment method"
            />
          )}
        />
      </FieldGroup>

      <FieldGroup name="type" label="Payment Flow" hideLabel={false} className="text-md my-4">
        <Controller
          control={control}
          name="type"
          rules={{ 'required': 'Please select a payment flow' }}
          render={({
            field: { onChange, ref, value },
            fieldState: { error },
          }) => (
            <SelectBox
              onChange={onChange}
              items={paymentType}
              value={value}
              ref={ref}
              hasError={error}
              placeholder="Select a payment flow type"
            />
          )}
        />
      </FieldGroup>

      <Controller
        control={control}
        name="partyId"
        rules={{ required: ('Please provide party name') }}
        render={({
          field: { onChange, onBlur, value, ref, name },
          fieldState: { error },
        }) => (
          <FieldGroup
            name={name}
            label={('Party Name')}
            error={error}
          >
            <AsyncSearchBox
              ref={ref}
              fetcher={getParty}
              placeholder={('Search party')}
              emptyText={('No such party')}
              onChange={onChange}
              value={value}
              hasError={error}
              onBlur={onBlur}
            // disabled={disabled}
            />
          </FieldGroup>
        )}
      />

      <Button className="mt-4 bg-blue-500 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default TranscationForm
