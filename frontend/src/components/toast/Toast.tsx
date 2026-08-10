import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type {
  Toast as ToastType,
  ToastVariant,
} from '../../context/ToastContext'

interface ToastProps {
  toast: ToastType
  onDismiss: (id: string) => void
}

const VARIANT_STYLES: Record<
  ToastVariant,
  { border: string; icon: string; Icon: typeof CheckCircleIcon }
> = {
  success: {
    border: 'border-l-green-500',
    icon: 'text-green-500',
    Icon: CheckCircleIcon,
  },
  error: {
    border: 'border-l-red-500',
    icon: 'text-red-500',
    Icon: XCircleIcon,
  },
  warning: {
    border: 'border-l-yellow-500',
    icon: 'text-yellow-500',
    Icon: ExclamationTriangleIcon,
  },
  info: {
    border: 'border-l-primary',
    icon: 'text-primary',
    Icon: InformationCircleIcon,
  },
}

const Toast = ({ toast, onDismiss }: ToastProps) => {
  const { border, icon, Icon } = VARIANT_STYLES[toast.variant]

  return (
    <div
      role="status"
      className={`${border} bg-(--color-card) border border-solid border-border border-l-2 rounded-lg shadow-lg px-3 py-2.5 flex items-start gap-2 w-80 pointer-events-auto animate-in fade-in slide-in-from-bottom-2`}
    >
      <Icon className={`${icon} size-5 shrink-0 mt-0.5`} />
      <p className="text-sm text-primary flex-1 min-w-0 break-words">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-tertiary hover:text-primary shrink-0"
        aria-label="Dismiss notification"
      >
        <XMarkIcon className="size-4" />
      </button>
    </div>
  )
}

export default Toast
