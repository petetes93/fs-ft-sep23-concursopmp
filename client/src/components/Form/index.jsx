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
    register,
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
      component="form"
      onSubmit={handleSubmit((data) => onSubmit(data, { setError, reset }))}
      spacing={5}
    >
      {inputs.map(({ name, type, label, ...rest }) => {
        const Input = fields[type] || fields.input
        if (type === 'file') {
          return (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field: { onChange, value, ...field } }) => {
                return (
                  <Input
                    {...field}
                    {...rest}
                    value={value?.fileName}
                    type={type}
                    errors={errors[name]}
                    onChange={(e) => onChange(e.target.files[0])}
                  />
                )
              }}
            />
          )
        }
        const { ref, ...registerProps } = register(name)
        return (
          <Stack key={name} spacing={1}>
            <Typography variant="subtitle1">{label}</Typography>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Input
                  type={type}
                  inputRef={ref}
                  errors={errors[name]}
                  {...field}
                  {...registerProps}
                  {...rest}
                />
              )}
            />
          </Stack>
        )
      })}

      <Button type="submit" sx={{ backgroundColor: '#dee2e6' }}>
        {submitLabel}
      </Button>
    </Stack>
  )
}

export default Form
