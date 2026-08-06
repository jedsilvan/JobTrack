import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BriefcaseIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/outline'
import Input from './Input'
import Button from './Button'
import Modal from './Modal'
import TextArea from './TextArea'
import Dropdown from './Dropdown'
import Calendar from './Calendar'
import { APPLICATION_STATUS_OPTIONS } from '../models'
import Theme from './Theme'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="container-max-w flex justify-between items-center mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="size-8" />
          <h1 className="text-2xl text-primary font-medium">JobTrack</h1>
        </div>
        <div className="flex items-center gap-2">
          <Theme />
          <Input placeholder="Search applications" />
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusIcon className="size-4 inline mb-0.5 mr-1" />
            Add application
          </Button>
        </div>
      </header>
      {createPortal(
        <ModalContent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />,
        document.body,
      )}
    </>
  )
}

function ModalContent({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-secondary">Add application</p>
        <XMarkIcon className="size-5 inline cursor-pointer" onClick={onClose} />
      </div>
      <Input
        placeholder="e.g. Nimbus Labs"
        className="w-full mb-3"
        label="Company"
      />
      <Input
        placeholder="e.g. Frontend engineer"
        className="w-full mb-3"
        label="Role"
      />
      <div className="flex gap-2 mb-3">
        <div className="w-50">
          <Dropdown
            options={APPLICATION_STATUS_OPTIONS}
            selectedValue=""
            label="Status"
            className="w-full"
          />
        </div>
        <Calendar label="Applied date" className="w-50" />
      </div>
      <Input
        placeholder="https://..."
        className="w-full mb-3"
        label="Job posting link"
      />
      <TextArea
        placeholder="Paste job description here..."
        className="w-full mb-4"
        label="Paste job description (for auto-tagging)"
      />
      {/* TODO: generate tags here using pills */}
      <Button type="submit" className="w-full mb-2">
        <PlusIcon className="size-4 inline mb-0.5 mr-1" />
        Save application
      </Button>
    </Modal>
  )
}
