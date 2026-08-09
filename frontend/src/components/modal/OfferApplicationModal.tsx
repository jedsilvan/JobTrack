import { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { type Application } from '../../models'
import { useModalContext } from '../../context/ModalContext'
import Input from '../form/Input'
import Button from '../form/Button'
import Calendar from '../form/Calendar'
import Modal from '../Modal'

const OfferApplicationModal = ({
  salary = 0,
  offer_date = new Date().toISOString().split('T')[0],
  response_deadline = new Date().toISOString().split('T')[0],
}: Partial<Application> = {}) => {
  const [formData, setFormData] = useState({
    salary,
    offer_date,
    response_deadline,
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
      isOpen={activeModal === 'OFFER_APPLICATION'}
      onClose={closeModal}
      title="Update application"
    >
      <Input
        className="w-full mb-3"
        label="Salary"
        value={formData.salary}
        onChange={(e) => handleChange('salary', e.target.value)}
      />
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
      <Button type="submit" className="w-full mb-2" onClick={handleSubmit}>
        <ArrowUpTrayIcon className="size-4 inline mb-0.5 mr-2" />
        Update application
      </Button>
    </Modal>
  )
}

export default OfferApplicationModal
