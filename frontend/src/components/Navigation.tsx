import { NavLink } from 'react-router-dom'
import { ViewColumnsIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function Navigation() {
  return (
    <>
      <hr className="mt-4 mb-2 border-t"></hr>
      <div className="container-max-w flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            'flex items-center gap-2 pb-2 border-b ' +
            (isActive
              ? 'border-color-border text-primary/80'
              : 'border-transparent')
          }
        >
          <ViewColumnsIcon className="size-4" />
          <span className="text-md">Board</span>
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            'flex items-center gap-2 pb-2 border-b ' +
            (isActive
              ? 'border-color-border text-primary/80'
              : 'border-transparent')
          }
        >
          <ChartBarIcon className="size-4" />
          <span className="text-md">Stats</span>
        </NavLink>
      </div>
      <hr className="mb-4 border-t"></hr>
    </>
  )
}
