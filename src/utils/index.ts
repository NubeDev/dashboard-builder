import {
  CardsActivityGoal,
  CardsCookieSettings,
  CardsStatus,
  CardsTeamMembers,
  DatePickerDemo,
  DemoGithub,
  OverviewChart,
  TableDemo
} from '@/examples'

import Logo from '@/components/common/Logo'
import MenuFooter from '@/components/blocks/Footers/Menu'
import MenuHeader from '@/components/blocks/Headers/Menu'

export const getArrayBooleanByCurrentLayout = (currentLayout: string) => {
  if (currentLayout.includes('_')) {
    const arr = currentLayout.split('_')
    const len = arr.length || 0

    return Array(len).fill(false)
  }

  return Array(Number(currentLayout)).fill(false)
}

export const getComponentByName = (name: string) => {
  switch (name) {
    case 'logo':
      return Logo
    case 'menu_header':
      return MenuHeader
    case 'menu_footer':
      return MenuFooter
    case 'table':
      return TableDemo
    case 'cookie_settings':
      return CardsCookieSettings
    case 'overview_chart':
      return OverviewChart
    case 'cards_status':
      return CardsStatus
    case 'cards_activity_goal':
      return CardsActivityGoal
    case 'demo_github':
      return DemoGithub
    case 'cards_team_members':
      return CardsTeamMembers
    case 'date_picker_demo':
      return DatePickerDemo
  }
}
