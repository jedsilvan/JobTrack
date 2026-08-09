import { useEffect } from 'react'
import { BriefcaseIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useModalContext } from '../context/ModalContext'
import Input from './form/Input'
import Button from './form/Button'
import Theme from './Theme'
import ApplicationModal from './modal/ApplicationModal'

export default function Header() {
  const { isModalOpen, toggleModal } = useModalContext()

  useEffect(() => console.log(isModalOpen, '123123123'), [isModalOpen])

  return (
    <header className="container-max-w flex justify-between items-center mt-4 lg:mt-8">
      <div className="flex items-center gap-4">
        <BriefcaseIcon className="size-8" />
        <h1 className="text-2xl text-primary font-medium">JobTrack</h1>
      </div>
      <div className="flex items-center gap-2">
        <Theme />
        <Input placeholder="Search applications" />
        <Button onClick={toggleModal}>
          <PlusIcon className="size-4 inline mb-0.5 mr-1" />
          Add application
        </Button>
      </div>
      <ApplicationModal />
    </header>
  )
}
