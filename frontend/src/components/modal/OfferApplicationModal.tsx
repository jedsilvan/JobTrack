import { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useModalContext } from '../../context/ModalContext'
import { useUpdateApplication } from '../../api/useApplications'
import Input from '../form/Input'
import Button from '../form/Button'
import Calendar from '../form/Calendar'
import Modal from '../Modal'

const EMPTY_FORM = {
  salary: 0,
  offer_date: new Date().toISOString().split('T')[0],
  response_deadline: new Date().toISOString().split('T')[0],
}

const OfferApplicationModal = () => {
  const { mutate: updateUplication, isPending } = useUpdateApplication()
  const { activeModal, closeModal, modalApplication } = useModalContext()

  const [formData, setFormData] = useState(EMPTY_FORM)

  const [validationErrors, setValidationErrors] = useState(
    {} as { salary?: string },
  )

  const handleChange = (key: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    const errors = {} as { salary?: string }

    if (!formData.salary) {
      errors.salary = 'Salary is required'
    }
    if (isNaN(Number(formData.salary))) {
      errors.salary = 'Invalid number input'
    }

    setValidationErrors(errors)

    if (Object.keys(errors).length === 0) {
      const { salary, offer_date, response_deadline } = formData

      updateUplication({
        ...modalApplication!,
        salary: Math.trunc(salary!),
        offer_date,
        response_deadline,
      })
    }
  }

  const [syncedApplicationId, setSyncedApplicationId] = useState<number | null>(
    null,
  )

  const targetApplicationId = modalApplication?.id ?? null

  if (
    activeModal === 'OFFER_APPLICATION' &&
    targetApplicationId !== syncedApplicationId
  ) {
    setSyncedApplicationId(targetApplicationId)
    setFormData(
      modalApplication
        ? {
            salary: modalApplication.salary ?? 0,
            offer_date:
              modalApplication.offer_date ??
              new Date().toISOString().split('T')[0],
            response_deadline:
              modalApplication.response_deadline ??
              new Date().toISOString().split('T')[0],
          }
        : EMPTY_FORM,
    )
  }

  return (
    <Modal
      isOpen={activeModal === 'OFFER_APPLICATION'}
      onClose={closeModal}
      title="Update application"
    >
      <div className="mb-3">
        <Input
          type="number"
          className={`w-full ${validationErrors.salary && 'border-red-500'}`}
          label="Salary"
          value={formData.salary}
          onChange={(e) => handleChange('salary', e.target.valueAsNumber)}
        />
        {validationErrors.salary && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.salary}</p>
        )}
      </div>
      <Calendar
        label="Offered date"
        className="w-full mb-3"
        value={formData.offer_date}
        onChange={(date) => handleChange('offer_date', date)}
      />
      <Calendar
        label="Response deadline"
        className="w-full mb-4"
        value={formData.response_deadline}
        onChange={(date) => handleChange('response_deadline', date)}
      />
      <Button
        type="submit"
        className="w-full mb-2"
        onClick={handleSubmit}
        icon={<ArrowUpTrayIcon className="size-4 inline mb-0.5 mr-2" />}
        isLoading={isPending}
      >
        Update application
      </Button>
    </Modal>
  )
}

export default OfferApplicationModal
