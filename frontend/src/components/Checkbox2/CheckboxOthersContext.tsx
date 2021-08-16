import { createContext, FC, RefObject, useContext, useRef } from 'react'

type CheckboxOthersContextProps = {
  inputRef: RefObject<HTMLInputElement>
  checkboxRef: RefObject<HTMLInputElement>
}

const CheckboxOthersContext = createContext<
  CheckboxOthersContextProps | undefined
>(undefined)

/**
 * Provider component that wraps your app and makes auth object available to any
 * child component that calls `useAuth()`.
 */
export const CheckboxOthersProvider: FC = ({ children }) => {
  const checkboxOthers = useProvideCheckboxOthers()

  return (
    <CheckboxOthersContext.Provider value={checkboxOthers}>
      {children}
    </CheckboxOthersContext.Provider>
  )
}

/**
 * Hook for components nested in ProvideAuth component to get the current auth object.
 */
export const useCheckboxOthers = (): CheckboxOthersContextProps => {
  const context = useContext(CheckboxOthersContext)
  if (!context) {
    throw new Error(
      `useCheckboxOthers must be used within a CheckboxOthersProvider component`,
    )
  }
  return context
}

// Provider hook that creates checkboxOthers object and handles state
const useProvideCheckboxOthers = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)

  return {
    inputRef,
    checkboxRef,
  }
}
