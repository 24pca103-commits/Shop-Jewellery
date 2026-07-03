import { CheckCircle, X, Info, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Toast.css';

const icons = { success: CheckCircle, error: AlertCircle, info: Info };
const colors = { success: '#4CAF80', error: '#E57373', info: '#8B5A2B' };

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="toast-container">
      {toasts.map(t => {
        const Icon = icons[t.type] || CheckCircle;
        const color = colors[t.type] || colors.success;
        return (
          <div key={t.id} className="toast" style={{ '--toast-color': color }}>
            <Icon size={18} style={{ color }} />
            <span className="toast-msg">{t.message}</span>
            <button className="toast-close" onClick={() => removeToast(t.id)}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
