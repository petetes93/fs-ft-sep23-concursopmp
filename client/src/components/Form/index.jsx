import { useEffect } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as fields from './input-fields'

function Form({
  inputs,
  validationSchema,
  onSubmit,
  errorsFromResponse = [],
  submitLabel,
  defaultValues = {},
}) {
  const {
    control,
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
      {inputs.map(({ name, type, label, ...rest }) => {
        const Input = fields[type] || fields.input

        return (
          <Stack key={name} spacing={1}>
            <Typography variant='subtitle1'>{label}</Typography>
            <Controller
              control={control}
              name={name}
              render={({ field }) => <Input type={type} {...field} {...rest} />}
            />
          </Stack>
        )
      })}

      <Button type='submit'>{submitLabel}</Button>
    </Stack>
  )
}

export default Form
