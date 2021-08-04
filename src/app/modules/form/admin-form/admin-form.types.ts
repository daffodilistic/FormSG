import { Result } from 'neverthrow'

import {
  FormFieldSchema,
  FormResponseMode,
  IForm,
  IPopulatedForm,
  IUserSchema,
} from '../../../../types'
import { ForbiddenFormError } from '../form.errors'

import { EditFieldError } from './admin-form.errors'

export enum PermissionLevel {
  Read = 'read',
  Write = 'write',
  Delete = 'delete',
}

export type AssertFormFn = (
  user: IUserSchema,
  form: IPopulatedForm,
) => Result<true, ForbiddenFormError>

export type OverrideProps = {
  endPage?: IForm['endPage']
  startPage?: IForm['startPage']
  admin: string
  title: string
  responseMode: FormResponseMode
  emails?: string | string[]
  publicKey?: string
}

export type EditFormFieldResult = Result<FormFieldSchema[], EditFieldError>
