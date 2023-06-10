import React, { useEffect } from 'react';
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs';
import { Controller, useForm } from 'react-hook-form';
import { useHandleError } from '../../hooks';
import { addGoal, editGoal } from '../../infra';
import { toast } from 'react-toastify';

const GoalForm = ({ type, val, modelID }) => {
  const handleError = useHandleError();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

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
  ];
  useEffect(() => {
    if (val) {
      // Set default values for the form fields using setValue
      setValue('categoryId', val.data?.categoryId.toString());
    }
  }, [setValue, val]);
  const onSubmit = setError => payload => {
    if (type === 'Create') {
      addGoal(payload)
        .then(data => {
          console.log(data);
          localStorage.setItem('toastMessage', data.message);
          window.location.reload();
        })
        .catch(err => {
          toast.error(err.message);
          handleError(err, setError);
        });
    } else {
      editGoal(payload, modelID)
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
      <FieldGroup
        name="name"
        label="Budget Name"
        hideLabel={false}
        error={errors.amount}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the budget's name"
          type="text"
          name="name"
          autoComplete="off"
          hasError={errors.name}
          {...register('name', {
            required: 'Please enter the budget name',
            value: val?.data?.name,
          })}
        />
      </FieldGroup>
      <FieldGroup
        name="targetAmount"
        label="Budget Amount"
        hideLabel={false}
        error={errors.targetAmount}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the target budget amount"
          type="number"
          name="targetAmount"
          autoComplete="off"
          hasError={errors.targetAmount}
          {...register('targetAmount', {
            required: 'Please enter the target budget amount',
            value: val?.data?.targetAmount,
          })}
        />
      </FieldGroup>
      <FieldGroup
        name="categoryId"
        label="Category"
        hideLabel={false}
        error={errors.categoryId}
        className="text-md my-4"
      >
        <Controller
          control={control}
          name="categoryId"
          rules={{ required: 'Please select a categorey type' }}
          defaultValue={val?.data?.categoryId || ''}
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

      <FieldGroup
        name="description"
        label="Description"
        hideLabel={false}
        error={errors.email}
        className="text-md my-4"
      >
        <TextArea
          placeholder="Enter the description"
          type="textarea"
          name="description"
          autoComplete="off"
          hasError={errors.description}
          {...register('description', {
            required: 'Please enter the description',
            value: val?.data?.description,
          })}
        />
      </FieldGroup>

      <Button className="mt-4 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  );
};

export default GoalForm;
