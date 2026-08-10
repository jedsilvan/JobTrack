import { useToastContext } from '../../context/ToastContext'
import Toast from './Toast'

const ToastContainer = () => {
  const { toasts, dismissToast } = useToastContext()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[51] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  )
}

export default ToastContainer
