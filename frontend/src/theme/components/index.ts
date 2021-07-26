import { RATING_THEME_KEY, RatingField } from './Field/Rating'
import { YESNO_THEME_KEY, YesNoField } from './Field/YesNo'
import { Banner } from './Banner'
import { Button } from './Button'
import { Form } from './Form'
import { FormError } from './FormError'
import { FormLabel } from './FormLabel'
import { Input } from './Input'
import { Link } from './Link'
import { PhoneNumberInput } from './PhoneNumberInput'
import { Tag } from './Tag'
import { Textarea } from './Textarea'
import { Tile } from './Tile'

export const components = {
  Banner,
  Button,
  Form,
  FormError,
  FormLabel,
  Input,
  Link,
  PhoneNumberInput,
  Textarea,
  [RATING_THEME_KEY]: RatingField,
  [YESNO_THEME_KEY]: YesNoField,
  Tag,
  Tile,
}
