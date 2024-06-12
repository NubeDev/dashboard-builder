import { buttonVariants } from 'src/shadcn/components/ui/button'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '#features',
    label: 'Features'
  },
  {
    href: '#testimonials',
    label: 'Testimonials'
  },
  {
    href: '#pricing',
    label: 'Pricing'
  },
  {
    href: '#faq',
    label: 'FAQ'
  }
]

const Menu = () => {
  return (
    <nav className="hidden md:flex gap-2 justify-end">
      {routeList.map((route: RouteProps, i) => (
        <a
          rel="noreferrer noopener"
          href={route.href}
          key={i}
          className={`text-[17px] ${buttonVariants({
            variant: 'ghost'
          })}`}
        >
          {route.label}
        </a>
      ))}
    </nav>
  )
}

export default Menu
