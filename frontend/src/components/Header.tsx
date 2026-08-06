import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/outline'
import Input from './Input'
import Button from './Button'

export default function Header() {
  return (
    <>
      <header className="container-max-w flex justify-between items-center mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="size-8" />
          <h1 className="text-2xl text-primary font-medium">JobTrack</h1>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search applications" />
          <Button>
            <PlusIcon className="size-4 inline mb-0.5 mr-1" />
            Add application
          </Button>
        </div>
      </header>
    </>
  )
}
