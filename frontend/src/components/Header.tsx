import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BriefcaseIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/outline'
import Input from './Input'
import Button from './Button'
import Modal from './Modal'
import TextArea from './TextArea'
import Dropdown from './Dropdown'

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="container-max-w flex justify-between items-center mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="size-8" />
          <h1 className="text-2xl text-primary font-medium">JobTrack</h1>
        </div>
        <div className="flex gap-2">
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
      <Dropdown
        options={[
          { value: 'Test', label: 'Text' },
          { value: 'Test 2', label: 'Text 2' },
        ]}
        selectedValue=""
        label="Status"
        className="w-full mb-3"
      />
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
      <Button type="submit" className="w-full">
        <PlusIcon className="size-4 inline mb-0.5 mr-1" />
        Save application
      </Button>
    </Modal>
  )
}
