/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { isEmpty } from 'lodash'

import FormErrorMessage from '~components/FormControl/FormErrorMessage'

import { Checkbox2, Checkbox2Props, FakeCheckbox, FakeInput } from './Checkbox2'
import { CheckboxOthersProvider } from './CheckboxOthersContext'

export default {
  title: 'Components/Checkbox2',
  component: Checkbox2,
  decorators: [],
} as Meta

const Template: Story<Checkbox2Props> = (args) => {
  return <Checkbox2 {...args} />
}
export const Default = Template.bind({})
Default.args = {}

export const Playground: Story = ({
  name,
  othersInputName,
  othersCheckboxName,
  label,
  isDisabled,
  isRequired,
  ...args
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data))
  }
  const options = ['Option 1', 'Option 2', 'Option 3']
  // const othersInputRegister = register(othersInputName, {
  //   required: isOthersChecked ? 'Please specify Others' : false,
  // })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        // isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={!isEmpty(errors)}
        mb={6}
      >
        <FormLabel>{label}</FormLabel>
        {options.map((o, idx) => (
          <Checkbox key={idx} value={o} {...register(name)} {...args}>
            {o}
          </Checkbox>
        ))}
        <Controller
          control={control}
          name={`${name}-others`}
          rules={{
            validate: {
              desync: (val) => {
                return val !== null || 'OI!'
              },
            },
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => {
            return (
              <Checkbox2
                // onBlur={onBlur}
                name={`${name}-others`}
                onChange={onChange}
                // checked={value}
                // inputRef={ref}
              />
            )
          }}
        />
        <FormErrorMessage>
          {errors[name]?.message ?? errors[`${name}-others`]?.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  )
}

Playground.args = {
  name: 'Checkbox',
  othersInputName: 'Others',
  othersCheckboxName: 'othersCheckbox',
  label: 'Checkbox label',
  isRequired: true,
  isDisabled: false,
}

export const Playground2: Story = ({}) => {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm()

  const isCheckboxChecked = useWatch({
    control,
    name: 'checkbox-others',
  })

  const inputValue = useWatch({
    control,
    name: 'input',
  })

  // const context = {
  //   onInputChange: () => {},
  //   onCheckboxChange: () => {},
  //   checkboxRef: null,
  //   inputRef: null,
  // }

  useEffect(() => {
    if (!isCheckboxChecked) {
      trigger('input')
    }
  }, [isCheckboxChecked, trigger])

  const options = ['Option 1', 'Option 2', 'Option 3']

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!isEmpty(errors)}>
        {options.map((o, idx) => (
          <Checkbox key={idx} value={o} {...register('checkbox')}>
            {o}
          </Checkbox>
        ))}
        <CheckboxOthersProvider>
          <FakeCheckbox {...register('checkbox-others')}>Others</FakeCheckbox>
          <FakeInput
            {...register('input', {
              validate: {
                required: (value) => {
                  if (!value && isCheckboxChecked)
                    return 'Required when others is checked'
                  return true
                },
              },
            })}
          ></FakeInput>
        </CheckboxOthersProvider>
        <FormErrorMessage>{errors.input?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  )
}

Playground2.args = {
  // name: 'Checkbox',
  // othersInputName: 'Others',
  // othersCheckboxName: 'othersCheckbox',
  // label: 'Checkbox label',
  // isRequired: true,
  // isDisabled: false,
}
