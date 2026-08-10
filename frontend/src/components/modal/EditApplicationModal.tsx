import { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import {
  APPLICATION_STATUS_OPTIONS,
  type ApplicationStatus,
} from '../../models'
import { useModalContext } from '../../context/ModalContext'
import Input from '../form/Input'
import Button from '../form/Button'
import TextArea from '../form/TextArea'
import Dropdown from '../form/Dropdown'
import Calendar from '../form/Calendar'
import Modal from '../Modal'

const EMPTY_FORM = {
  company: '',
  role: '',
  status: APPLICATION_STATUS_OPTIONS[0].value as ApplicationStatus,
  job_link: '',
  description: '',
  applied_date: new Date().toISOString().split('T')[0],
}

const EditApplicationModal = () => {
  const { activeModal, modalApplication, closeModal } = useModalContext()
  const [formData, setFormData] = useState(EMPTY_FORM)

  // Tracks which application's data is currently loaded into formData, so we
  // can tell "the modal just opened / switched applications" apart from
  // "the user is typing." null means "no application loaded yet" (create-new).
  const [syncedApplicationId, setSyncedApplicationId] = useState<number | null>(
    null,
  )

  const targetApplicationId = modalApplication?.id ?? null

  // Adjust state during render instead of in a useEffect. This is the
  // pattern React docs recommend for "reset state when a prop changes":
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  // Calling setState here is safe — React re-renders immediately with the
  // new state before committing to the DOM, so there's no extra paint/effect
  // round-trip (which is what was causing the cascading-render warning).
  if (
    activeModal === 'EDIT_APPLICATION' &&
    targetApplicationId !== syncedApplicationId
  ) {
    setSyncedApplicationId(targetApplicationId)
    setFormData(
      modalApplication
        ? {
            company: modalApplication.company,
            role: modalApplication.role,
            status: modalApplication.status,
            job_link: modalApplication.job_link ?? '',
            description: '',
            applied_date:
              modalApplication.applied_date ??
              new Date().toISOString().split('T')[0],
          }
        : EMPTY_FORM,
    )
  }

  console.log(modalApplication)

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    console.log('Submitting application:', formData)
    // TODO: call useUpdateApplication / useCreateApplication depending on
    // whether modalApplication is set, then closeModal()
  }

  return (
    <Modal
      isOpen={activeModal === 'EDIT_APPLICATION'}
      onClose={closeModal}
      title={modalApplication ? 'Update application' : 'Add application'}
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
        label="Paste job description (for auto-tagging)"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      {/* TODO: generate tags here using pills */}
      <Button type="submit" className="w-full mb-2" onClick={handleSubmit}>
        <ArrowUpTrayIcon className="size-4 inline mb-0.5 mr-2" />
        {modalApplication ? 'Update application' : 'Add application'}
      </Button>
    </Modal>
  )
}

export default EditApplicationModal
