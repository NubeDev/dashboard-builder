import { Square } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import { Row } from 'src/components/blocks'
import { ElementModel, RowLayoutModel } from 'src/utils/models'
import {
  DivideLayoutFour,
  DivideLayoutOne,
  DivideLayoutOneThree,
  DivideLayoutOneTwo,
  DivideLayoutOneTwoOne,
  DivideLayoutThree,
  DivideLayoutThreeOne,
  DivideLayoutTwo,
  DivideLayoutTwoOne
} from 'src/components/common/DivideLayout'
import Logo from 'src/components/common/Logo'
import Menu from 'src/components/blocks/Headers/Menu'
import OverviewChart from 'src/examples/OverviewChart'
import CardsStats from 'src/examples/CardsStats'
import CardsActivityGoal from 'src/examples/CardsActivityGoal'
import DemoGithub from 'src/examples/DemoGithub'
import { CardsTeamMembers } from 'src/examples/CardsTeamMembers'
import DatePickerDemo from 'src/examples/DatePickerDemo'
import MenuFooter from 'src/components/blocks/Footers/Menu'
import { TableDemo } from 'src/examples/InvoiceTable'
import { CardsCookieSettings } from 'src/examples/CardsCookieSettings'

export const LIST_CORE_ELEMENTS: ElementModel[] = [
  {
    name: 'box',
    type: 'component',
    icon: Square,
    element: Row,
    label: 'Row'
  },
  {
    name: 'box',
    type: 'component',
    element: Row,
    icon: Square,
    label: 'Row Header',
    position: 'header'
  },
  {
    name: 'box',
    type: 'component',
    element: Row,
    icon: Square,
    label: 'Row Footer',
    position: 'footer'
  }
]

export const LIST_ROW_LAYOUTS: RowLayoutModel[] = [
  {
    id: 1,
    name: 'one',
    className: 'grid-cols-1',
    icon: DivideLayoutOne,
    value: '1',
    items: [
      {
        id: uuidv4(),
        className: ''
      }
    ]
  },
  {
    id: 2,
    name: 'two',
    className: 'grid-cols-2',
    icon: DivideLayoutTwo,
    value: '2',
    items: [
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      }
    ]
  },
  {
    id: 3,
    name: 'three',
    className: 'grid-cols-3',
    icon: DivideLayoutThree,
    value: '3',
    items: [
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      }
    ]
  },
  {
    id: 4,
    name: 'four',
    className: 'grid-cols-4',
    icon: DivideLayoutFour,
    value: '4',
    items: [
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      }
    ]
  },
  {
    id: 5,
    name: 'one two',
    className: 'grid-cols-3',
    icon: DivideLayoutOneTwo,
    value: '1_2',
    items: [
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-[2]'
      }
    ]
  },
  {
    id: 6,
    name: 'two one',
    className: 'grid-cols-3',
    icon: DivideLayoutTwoOne,
    value: '2_1',
    items: [
      {
        id: uuidv4(),
        className: 'flex-[2]'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      }
    ]
  },
  {
    id: 7,
    name: 'one three',
    className: 'grid-cols-3',
    icon: DivideLayoutOneThree,
    value: '1_3',
    items: [
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-[3]'
      }
    ]
  },
  {
    id: 8,
    name: 'one two one',
    className: 'grid-cols-3',
    icon: DivideLayoutOneTwoOne,
    value: '1_2_1',
    items: [
      {
        id: uuidv4(),
        className: 'flex-1'
      },
      {
        id: uuidv4(),
        className: 'flex-[2]'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      }
    ]
  },
  {
    id: 9,
    name: 'three one',
    className: 'grid-cols-3',
    icon: DivideLayoutThreeOne,
    value: '3_1',
    items: [
      {
        id: uuidv4(),
        className: 'flex-[3]'
      },
      {
        id: uuidv4(),
        className: 'flex-1'
      }
    ]
  }
]

export const LIST_ELEMENTS_EXAMPLE: ElementModel[] = [
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
