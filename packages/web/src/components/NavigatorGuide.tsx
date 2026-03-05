import { Breadcrumbs} from '@mui/joy'
import { Link, useLocation } from 'react-router'

export default function NavigatorGuide() {
  const { pathname } = useLocation()
  return (
    <Breadcrumbs aria-label="breadcrumbs">
      {pathname.split('/').map((item: string) => (
        <Link to={item} color="neutral" className='text-[1rem]' >
          {item}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
