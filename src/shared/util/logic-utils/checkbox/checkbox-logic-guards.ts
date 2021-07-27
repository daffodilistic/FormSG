import { CheckboxConditionValue } from '../../../../../shared/types/form/form_logic'
import { IConditionSchema } from '../../../../types'
import { hasProp } from '../../has-prop'

import { LogicCheckboxCondition } from './checkbox-logic-types'

/**
 * Typeguard to check if the condition has the backend/logic representation for checkbox condition values
 * @param condition Logic Condition
 */
export const isLogicCheckboxCondition = (
  condition: IConditionSchema,
): condition is LogicCheckboxCondition => {
  return (
    Array.isArray(condition.value) &&
    (condition.value as unknown[]).every(isCheckboxConditionValue)
  )
}

export const isCheckboxConditionValue = (
  value: unknown,
): value is CheckboxConditionValue => {
  const hasValue =
    hasProp(value, 'options') &&
    Array.isArray(value.options) &&
    value.options.every((val) => typeof val === 'string')

  const hasOthers =
    hasProp(value, 'others') && typeof value.others === 'boolean'

  return hasValue && hasOthers
}
