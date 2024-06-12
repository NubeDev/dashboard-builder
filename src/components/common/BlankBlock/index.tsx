import { CircleX } from 'lucide-react'
import { useState } from 'react'

import { cn } from 'src/shadcn/lib/utils'
import { TableDemo } from 'src/examples/InvoiceTable'
import { ElementModel } from 'src/libs/models'
import { CardsCookieSettings } from 'src/examples/CardsCookieSettings'

import PlusElement from './PlusElement'
import OverviewChart from 'src/examples/OverviewChart'
import CardsStats from 'src/examples/CardsStats'
import CardsActivityGoal from 'src/examples/CardsActivityGoal'
import DemoGithub from 'src/examples/DemoGithub'
import { CardsTeamMembers } from 'src/examples/CardsTeamMembers'
import DatePickerDemo from 'src/examples/DatePickerDemo'
import Logo from '../Logo'
import Menu from 'src/components/blocks/Headers/Menu'
import MenuFooter from 'src/components/blocks/Footers/Menu'

type Props = {
  className?: string
  positionIndex: number
  onRemoveOrAddElement?: (index: number, value: boolean) => void
}

const LIST_ELEMENTS_EXAMPLE: ElementModel[] = [
  {
    label: '0',
    name: 'Logo',
    element: Logo
  },
  {
    label: '9',
    name: 'Menu Header',
    element: Menu
  },
  {
    label: '10',
    name: 'Menu Footer',
    element: MenuFooter
  },
  {
    label: '1',
    name: 'Table',
    element: TableDemo
  },
  {
    label: '2',
    name: 'Cookie Settings',
    element: CardsCookieSettings
  },
  {
    label: '3',
    name: 'Overview Chart',
    element: OverviewChart
  },
  {
    label: '4',
    name: 'Cards Status',
    element: CardsStats
  },
  {
    label: '5',
    name: 'Cards Activity Goal',
    element: CardsActivityGoal
  },
  {
    label: '6',
    name: 'Demo Github',
    element: DemoGithub
  },
  {
    label: '7',
    name: 'Cards Team Members',
    element: CardsTeamMembers
  },
  {
    label: '8',
    name: 'Date Picker Demo',
    element: DatePickerDemo
  }
]

const BlankBlock: React.FC<Props> = ({ className = '', positionIndex, onRemoveOrAddElement }) => {
  // state
  const [selectedElement, setSelectedElement] = useState<ElementModel | null>(null)

  // function
  const handleSelectElement = (element: ElementModel) => {
    setSelectedElement({ ...element })
    onRemoveOrAddElement && onRemoveOrAddElement(positionIndex, true)
  }

  return (
    <div className={cn('w-full', className && className)}>
      {selectedElement ? (
        <div className="w-full relative group/item">
          <button
            className="absolute top-2 right-2 z-30 bg-white rounded-full hidden group-hover/item:inline-block transition-all"
            onClick={() => {
              setSelectedElement(null)
              onRemoveOrAddElement && onRemoveOrAddElement(positionIndex, false)
            }}
          >
            <CircleX className="text-red-600" />
          </button>
          <selectedElement.element />
        </div>
      ) : (
        <div className="w-full min-h-[150px] border border-dashed border-indigo-500 rounded-md flex items-center justify-center">
          <PlusElement listElements={LIST_ELEMENTS_EXAMPLE} handleSelectElement={handleSelectElement} />
        </div>
      )}
    </div>
  )
}

export default BlankBlock
