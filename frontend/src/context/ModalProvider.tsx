import React, { useState } from 'react'
import { ModalContext, type ModalType } from './ModalContext'
import type { Application } from '../models'

export const ModalProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null)
  const [modalApplication, setModalApplication] = useState<Application | null>(
    null,
  )

  const openModal = (type: ModalType, application?: Application) => {
    setActiveModal(type)
    setModalApplication(application ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setModalApplication(null)
  }

  return (
    <ModalContext.Provider
      value={{ activeModal, modalApplication, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}
