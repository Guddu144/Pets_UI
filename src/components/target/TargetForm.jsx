import React, { useEffect } from 'react';
import { Button, FieldGroup, Input, SelectBox, TextArea } from '../inputs';
import { Controller, useForm } from 'react-hook-form';
import { useHandleError } from '../../hooks';
import { addGoal, addTarget, editGoal } from '../../infra';
import { toast } from 'react-toastify';
import { formatDateYear } from '../../utils/date';

const TargetForm = ({ type, val, modelID }) => {
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
      name: 'New Vehicle',
    },
    {
      id: '2',
      name: 'New Home',
    },
    {
      id: '3',
      name: 'Holiday Trip',
    },
    {
      id: '4',
      name: 'Education',
    },
    {
      id: '5',
      name: 'Emergency Fund',
    },
    {
      id: '6',
      name: 'Health Care',
    },
    {
      id: '7',
      name: 'Party',
    },
    {
      id: '8',
      name: 'Kids Spoiling',
    },
    {
      id: '9',
      name: 'Charity',
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
      addTarget(payload)
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
      // editGoal(payload, modelID)
      //   .then(data => {
      //     console.log(data);
      //     localStorage.setItem('toastMessage', data.message);
      //     window.location.reload();
      //   })
      //   .catch(err => {
      //     toast.error(err.message);
      //     handleError(err, setError);
      //   });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit(setError))}>
      <FieldGroup
        name="name"
        label="Target Name"
        hideLabel={false}
        error={errors.amount}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the target's name"
          type="text"
          name="name"
          autoComplete="off"
          hasError={errors.name}
          {...register('name', {
            required: 'Please enter the target name',
            value: val?.data?.name,
          })}
        />
      </FieldGroup>
      <FieldGroup
        name="targetAmount"
        label="Target Amount"
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
        name="savedAlready"
        label="Saved Amount"
        hideLabel={false}
        error={errors.email}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the already saved amount"
          type="number"
          name="savedAlready"
          autoComplete="off"
          hasError={errors.savedAlready}
          {...register('savedAlready', {
            required: 'Please enter the saved amount',
            value: val?.data?.savedAlready,
          })}
        />
      </FieldGroup>
      <div className="col-span-3">
        <FieldGroup
          name="desireDate"
          label="Desired Date"
          hideLabel={false}
          error={errors.desireDate}
          className="text-md "
        >
          <Input
            placeholder="Enter date"
            type="date"
            name="desireDate"
            autoComplete="off"
            hasError={errors.desireDate}
            {...register('desireDate', {
              required: 'Please enter the date',
              value: val?.data?.desireDate ? formatDateYear(val?.data?.desireDate) : null,
            })}
          />
        </FieldGroup>
      </div>
      <FieldGroup
        name="category"
        label="Category"
        hideLabel={false}
        error={errors.category}
        className="text-md my-4"
      >
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Please select a categorey type' }}
          defaultValue={val?.data?.category || ''}
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

export default TargetForm;
