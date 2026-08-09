import { createContext, useContext } from 'react'
import type { Application } from '../models'

export type ModalType =
  'ADD_APPLICATION' | 'EDIT_APPLICATION' | 'OFFER_APPLICATION'

export type ModalContextType = {
  activeModal: ModalType | null
  modalApplication: Application | null
  openModal: (type: ModalType, application?: Application) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
)

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}
