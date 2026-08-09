import { PlusIcon } from '@heroicons/react/24/outline'
import { APPLICATION_STATUS_OPTIONS } from '../../models'
import Input from '../form/Input'
import Button from '../form/Button'
import TextArea from '../form/TextArea'
import Dropdown from '../form/Dropdown'
import Calendar from '../form/Calendar'
import Modal from '../Modal'
import { useModalContext } from '../../context/ModalContext'
import { useEffect } from 'react'

const ApplicationModal: React.FC = () => {
  const { isModalOpen, toggleModal } = useModalContext()

  useEffect(() => console.log(isModalOpen, 'sdfsdfsdf'), [isModalOpen])

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal} title="Add application">
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

export default ApplicationModal
