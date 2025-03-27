import { CheckCircle } from "lucide-react"

interface SuccessMessageProps {
  title: string
  message: string
}

export default function SuccessMessage({ title, message }: SuccessMessageProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700">{message}</p>
    </div>
  )
}

