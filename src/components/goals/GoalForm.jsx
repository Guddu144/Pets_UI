import React from 'react'
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs'
import { Controller, useForm } from 'react-hook-form';
import { useHandleError } from '../../hooks';
import { addGoal } from '../../infra';

const GoalForm = () => {
  const handleError = useHandleError();
  const { control, register, handleSubmit, setError, formState: { errors } } = useForm();

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
  const onSubmit = setError => payload => {
    addGoal(payload)
      .then(window.location.reload())
      .catch(err => handleError(err, setError))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))} >
      <FieldGroup name="name" label="Budget Name" hideLabel={false} error={errors.amount} className="text-md my-4">
        <Input
          placeholder="Enter the budget's name"
          type="text"
          name="name"
          autoComplete="off"
          hasError={errors.name}
          {...register('name', {
            required: 'Please enter the budget name',
          })}
        />
      </FieldGroup>
      <FieldGroup name="targetAmount" label="Budget Amount" hideLabel={false} error={errors.targetAmount} className="text-md my-4">
        <Input
          placeholder="Enter the target budget amount"
          type="number"
          name="targetAmount"
          autoComplete="off"
          hasError={errors.targetAmount}
          {...register('targetAmount', {
            required: 'Please enter the target budget amount',
          })}
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

      <FieldGroup name="description" label="Description" hideLabel={false} error={errors.email} className="text-md my-4">
        <TextArea
          placeholder="Enter the description"
          type="textarea"
          name="description"
          autoComplete="off"
          hasError={errors.description}
          {...register('description', {
            required: 'Please enter the description',
          })}
        />
      </FieldGroup>

      <Button className="mt-4 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  )
}

export default GoalForm
