import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ButtonGroup, FormControl } from '@chakra-ui/react'

import Button from '~components/Button'
import FormErrorMessage from '~components/FormControl/FormErrorMessage'
import FormLabel from '~components/FormControl/FormLabel'
import Input from '~components/Input'

import { ResendOtpButton } from './ResendOtpButton'

export type OtpFormInputs = {
  otp: string
}

interface OtpFormProps {
  onSubmit: (inputs: OtpFormInputs) => Promise<void>
  onResendOtp: () => Promise<void>
}

export const OtpForm = ({
  onSubmit,
  onResendOtp,
}: OtpFormProps): JSX.Element => {
  const { handleSubmit, register, formState, setError } =
    useForm<OtpFormInputs>()

  const validateOtp = useCallback(
    (value: string) => value.length === 6 || 'Please enter a 6 digit OTP.',
    [],
  )

  const onSubmitForm = async (inputs: OtpFormInputs) => {
    return onSubmit(inputs).catch((e) => {
      setError('otp', { type: 'server', message: e.message })
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormControl isInvalid={!!formState.errors.otp} mb="2.5rem">
        <FormLabel isRequired htmlFor="otp">
          Enter 6 digit OTP sent to your email
        </FormLabel>
        <Input
          type="text"
          maxLength={6}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          {...register('otp', {
            required: 'OTP is required.',
            pattern: {
              value: /^[0-9\b]+$/,
              message: 'Only numbers are allowed.',
            },
            validate: validateOtp,
          })}
        />
        {formState.errors.otp && (
          <FormErrorMessage>{formState.errors.otp.message}</FormErrorMessage>
        )}
      </FormControl>
      <ButtonGroup spacing="1.5rem">
        <Button isLoading={formState.isSubmitting} type="submit">
          Sign in
        </Button>
        <ResendOtpButton onResendOtp={onResendOtp} />
      </ButtonGroup>
    </form>
  )
}
