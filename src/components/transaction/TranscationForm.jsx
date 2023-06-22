import React, { useEffect } from 'react';
import {
  AsyncSearchBox,
  Button,
  FieldGroup,
  Input,
  SelectBox,
} from '../inputs';
import { useHandleError } from '../../hooks';
import { Controller, useForm } from 'react-hook-form';
import { addTranscationn, editTransaction, getParty } from '../../infra';
import { useNavigate } from 'react-router-dom';
import { isAfter, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { formatDateYear } from '../../utils/date';

const TranscationForm = ({ type, val, modelID }) => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const handleError = useHandleError();
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
  ];
  const paymentType = [
    {
      id: 'in',
      name: 'IN',
    },
    {
      id: 'out',
      name: 'Out',
    },
  ];
  const validateDate = value => {
    const selectedDate = parseISO(value);
    const today = new Date();

    if (isAfter(selectedDate, today)) {
      return 'Selected date cannot be greater than today';
    }

    return true;
  };
  useEffect(() => {
    if (val) {
      // Set default values for the form fields using setValue
      console.log(val);
      setValue('goalId', val.data?.id.toString());
    }
  }, [setValue, val]);

  const onSubmit = setError => payload => {
    if (type === 'Create') {
      addTranscationn(payload)
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
      editTransaction(payload, modelID)
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
        name="amount"
        label="Amount"
        hideLabel={false}
        error={errors.amount}
        className="text-md my-4"
      >
        <Input
          placeholder="Enter the Amount"
          type="number"
          name="amount"
          autoComplete="off"
          hasError={errors.amount}
          {...register('amount', {
            required: 'Please enter the amount',
            value: val?.data?.amount,
          })}
        />
      </FieldGroup>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <FieldGroup
            name="date"
            label="Start Date"
            hideLabel={false}
            error={errors.date}
            className="text-md "
          >
            <Input
              placeholder="Enter date"
              type="date"
              name="date"
              autoComplete="off"
              hasError={errors.date}
              {...register('date', {
                validate: validateDate,
                required: 'Please enter the date',
                value: val?.data?.date ? formatDateYear(val?.data?.date) : null,
              })}
            />
          </FieldGroup>
        </div>

        <div className="col-span-3">
          <FieldGroup
            name="paymentDate"
            label="Payment Date"
            hideLabel={false}
            error={errors.date}
            className="text-md "
          >
            <Input
              placeholder="Enter date"
              type="date"
              name="paymentDate"
              autoComplete="off"
              hasError={errors.paymentDate}
              {...register('paymentDate', {
                required: 'Please enter the date',
                value: val?.data?.paymentDate ? formatDateYear(val?.data?.paymentDate) : null,
              })}
            />
          </FieldGroup>
        </div>
        <div className="flex-1 ml-2"></div>
      </div>
      <FieldGroup
        name="paymentMethod"
        label="Payment Method"
        hideLabel={false}
        error={errors.paymentMethod}
        className="text-md my-4"
      >
        <Controller
          control={control}
          name="paymentMethod"
          rules={{ required: 'Please select a payment method' }}
          defaultValue={val?.data?.paymentMethod || ''}
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

      <FieldGroup
        name="type"
        label="Payment Flow"
        hideLabel={false}
        error={errors.type}
        className="text-md my-4"
      >
        <Controller
          control={control}
          name="type"
          rules={{ required: 'Please select a payment flow' }}
          defaultValue={val?.data?.type || ''}
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
        rules={{ required: 'Please provide party name' }}
        defaultValue={val?.data?.partyId || ''}
        render={({
          field: { onChange, onBlur, value, ref, name },
          fieldState: { error },
        }) => (
          <FieldGroup name={name} label={'Party Name'} error={error}>
            <AsyncSearchBox
              ref={ref}
              fetcher={getParty}
              placeholder={'Search party'}
              emptyText={'No such party'}
              onChange={onChange}
              value={value}
              hasError={error}
              onBlur={onBlur}
            // disabled={disabled}
            />
          </FieldGroup>
        )}
      />

      <Button className="mt-4 font-normal" full type="submit">
        Submit
      </Button>
    </form>
  );
};

export default TranscationForm;
