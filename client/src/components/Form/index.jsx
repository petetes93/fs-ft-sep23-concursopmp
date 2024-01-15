// Form.js

import { useEffect } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as fields from './input-fields'

function Form({
  inputs = [],
  validationSchema,
  onSubmit,
  errorsFromResponse = [],
  submitLabel,
  defaultValues = {},
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), defaultValues })

  useEffect(() => {
    if (!Array.isArray(errorsFromResponse)) return

    errorsFromResponse.forEach(({ field, msg }) => {
      setError(field, { type: 'response', message: msg }, { shouldFocus: true })
    })
  }, [errorsFromResponse])

  return (
    <Stack
      component='form'
      onSubmit={handleSubmit((data) => onSubmit(data, { setError, reset }))}
      spacing={5}
    >
      {Array.isArray(inputs) &&
        inputs.map(({ name, label, type, ...rest }) => {
          const Input = fields[type] || fields.input

          return (
            <div key={name}>
              <Typography variant='subtitle1' gutterBottom>
                {label}
              </Typography>
              <Input
                type={type}
                errors={errors[name]}
                inputRef={register(name)}
                {...rest}
              />
            </div>
          )
        })}

      <Button type='submit'>{submitLabel}</Button>
    </Stack>
  )
}

export default Form
