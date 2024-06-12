import copy from 'clipboard-copy'

import { CopyIconSvg } from 'src/icons'
import { CoreComponentType } from 'src/pages/Builder'

type Props = {
  elementCopy: CoreComponentType
}

const CopyButtonIcon: React.FC<Props> = ({ elementCopy }) => {
  const { type, props, labelValue } = elementCopy

  const copyCode = () => {
    const elementCode = getElementCode(type, props, labelValue)
    copy(elementCode)
    alert('Code copied to clipboard!')
  }

  const getPropsAsString = (props: any) => {
    return Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
  }

  const getElementCode = (type: string, props: any, labelValue: string | undefined) => {
    switch (type) {
      case 'Button':
        return `<Button ${getPropsAsString(props)}>${labelValue}</Button>`
      case 'Input':
        return `<Input ${getPropsAsString(props)}>`
      case 'Textarea':
        return `<Textarea ${getPropsAsString(props)}>${labelValue}</Textarea>`
      case 'Div':
        return `<div ${getPropsAsString(props)}>${labelValue}</div>`
      case 'Checkbox':
        return `<Checkbox ${getPropsAsString(props)}>${labelValue} />`
      case 'Text':
        return `<div ${getPropsAsString(props)}>${labelValue}</div>`
      default:
        return ''
    }
  }

  return (
    <button className="mt-8 flex items-center justify-center gap-1" onClick={copyCode}>
      <CopyIconSvg />
      <span className="font-medium text-sm">Copy element</span>
    </button>
  )
}

export default CopyButtonIcon
