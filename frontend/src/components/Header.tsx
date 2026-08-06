import { BriefcaseIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <>
        <header className="my-4">
          <div className="container-max-w flex items-center gap-4">
              <BriefcaseIcon className="size-8" />
              <h1 className="text-2xl text-primary font-medium">JobTrack</h1>
          </div>
        </header>
    </>
  )
}