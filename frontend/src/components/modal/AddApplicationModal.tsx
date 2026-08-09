import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  APPLICATION_STATUS_OPTIONS,
  ApplicationStatus,
} from '../../models'
import { useModalContext } from '../../context/ModalContext'
import Input from '../form/Input'
import Button from '../form/Button'
import TextArea from '../form/TextArea'
import Dropdown from '../form/Dropdown'
import Calendar from '../form/Calendar'
import Modal from '../Modal'

const AddApplicationModal = () => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: APPLICATION_STATUS_OPTIONS[0].value as ApplicationStatus,
    job_link: '',
    applied_date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    console.log('Submitting application:', formData)
  }

  const { activeModal, closeModal } = useModalContext()

  return (
    <Modal
      isOpen={activeModal === 'ADD_APPLICATION'}
      onClose={closeModal}
      title="Add application"
    >
      <Input
        placeholder="e.g. Nimbus Labs"
        className="w-full mb-3"
        label="Company"
        value={formData.company}
        onChange={(e) => handleChange('company', e.target.value)}
      />
      <Input
        placeholder="e.g. Frontend engineer"
        className="w-full mb-3"
        label="Role"
        value={formData.role}
        onChange={(e) => handleChange('role', e.target.value)}
      />
      <div className="flex gap-2 mb-3">
        <div className="w-50">
          <Dropdown
            options={APPLICATION_STATUS_OPTIONS}
            selectedValue={formData.status}
            label="Status"
            className="w-full"
            onChange={(value) => handleChange('status', value)}
          />
        </div>
        <Calendar
          label="Applied date"
          className="w-50"
          value={formData.applied_date}
          onChange={(date) => handleChange('applied_date', date)}
        />
      </div>
      <Input
        placeholder="https://..."
        className="w-full mb-3"
        label="Job posting link"
        value={formData.job_link}
        onChange={(e) => handleChange('job_link', e.target.value)}
      />
      <TextArea
        placeholder="Paste job description here..."
        className="w-full mb-4"
        label=" Paste job description (for auto-tagging)"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      {/* TODO: generate tags here using pills */}
      <Button type="submit" className="w-full mb-2" onClick={handleSubmit}>
        <PlusIcon className="size-4 inline mb-0.5 mr-1" />
        Save application
      </Button>
    </Modal>
  )
}

export default AddApplicationModal
