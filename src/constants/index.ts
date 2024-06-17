import { Square } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

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

export const LIST_CORE_ELEMENTS: ElementModel[] = [
  {
    name: 'box',
    icon: Square,
    label: 'Row',
    value: 'row'
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
    value: 'logo'
  },
  {
    label: '9',
    name: 'Menu Header',
    value: 'menu_header'
  },
  {
    label: '10',
    name: 'Menu Footer',
    value: 'menu_footer'
  },
  {
    label: '1',
    name: 'Table',
    value: 'table'
  },
  {
    label: '2',
    name: 'Cookie Settings',
    value: 'cookie_settings'
  },
  {
    label: '3',
    name: 'Overview Chart',
    value: 'overview_chart'
  },
  {
    label: '4',
    name: 'Cards Status',
    value: 'cards_status'
  },
  {
    label: '5',
    name: 'Cards Activity Goal',
    value: 'cards_activity_goal'
  },
  {
    label: '6',
    name: 'Demo Github',
    value: 'demo_github'
  },
  {
    label: '7',
    name: 'Cards Team Members',
    value: 'cards_team_members'
  },
  {
    label: '8',
    name: 'Date Picker Demo',
    value: 'date_picker_demo'
  }
]
