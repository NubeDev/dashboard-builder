import { FastFieldProps } from 'formik'

import { Textarea } from '@/shadcn/components/textarea'

interface Props extends FastFieldProps {
  placeholder: string
}

const TextareaFormik: React.FC<Props> = ({ placeholder, field, form }) => {
  const { name, value, onChange } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <div>
      <Textarea id={name} placeholder={placeholder} value={value} onChange={onChange} />
      {showError && <p className="text-red-600 text-xs">{errors[name] as string}</p>}
    </div>
  )
}

export default TextareaFormik
