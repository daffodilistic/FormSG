/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Box,
  Checkbox,
  forwardRef,
  Input,
  useMergeRefs,
} from '@chakra-ui/react'

import { useCheckboxOthers } from './CheckboxOthersContext'

export interface Checkbox2Props {
  name: string
  onChange?: (val: string | null) => void
}

export const Checkbox2 = ({ onChange, name }: Checkbox2Props) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  // Parent in charge of validation - if others checkbox not checked, but something
  // is typed in input, parent needs to knows
  // cbString + checkboxChecked

  // If in child, always make sure input is cleared when others checkbox is unchecked.
  // cbString

  // 1. Focus input when checkbox is toggled on.
  // 2. Select checkbox when typing input

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setIsCheckboxChecked(isChecked)
    if (isChecked) {
      inputRef.current?.focus()
      onChange?.(inputValue)
    } else {
      onChange?.('')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    onChange?.(value)
    if (!!value && !isCheckboxChecked) {
      setIsCheckboxChecked(true)
    }
  }

  return (
    <Box>
      <Checkbox
        isChecked={isCheckboxChecked}
        onChange={handleCheckboxChange}
      ></Checkbox>
      <Input
        name={name}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
      ></Input>
    </Box>
  )
}

export const FakeCheckbox = forwardRef<any, 'input'>((props: any, ref) => {
  const { checkboxRef, inputRef } = useCheckboxOthers()
  const mergedRef = useMergeRefs(checkboxRef, ref)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      inputRef.current?.focus()
    }
    props.onChange?.(event)
  }

  return <Checkbox {...props} ref={mergedRef} onChange={handleCheckboxChange} />
})

export const FakeInput = forwardRef<any, 'input'>((props: any, ref) => {
  const { inputRef, checkboxRef } = useCheckboxOthers()
  const mergedRefs = useMergeRefs(inputRef, ref)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    props.onChange?.(event)

    if (!!value && !checkboxRef.current?.checked) {
      checkboxRef.current?.click()
    }
  }

  return (
    <Input {...props} ref={mergedRefs} onChange={handleInputChange}></Input>
  )
})
