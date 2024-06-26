import { FastFieldProps } from 'formik'

import { Input } from '@/shadcn/components/input'

interface Props extends FastFieldProps {
  type: string
  placeholder: string
}

const InputFormik: React.FC<Props> = ({ type, placeholder, field, form }) => {
  const { name, value, onChange } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <div>
      <Input id={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {showError && <p className="text-red-600 text-xs">{errors[name] as string}</p>}
    </div>
  )
}

export default InputFormik
