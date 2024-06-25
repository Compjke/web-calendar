import { ToastContext } from './ToastContext';
import { useContext } from 'react';

export const useToast = () => useContext(ToastContext);
