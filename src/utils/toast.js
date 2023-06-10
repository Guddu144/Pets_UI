import { toast } from 'react-toastify';

const toastify = () => {
  const toastMessage = localStorage.getItem('toastMessage');

  if (toastMessage) {
    toast.success(toastMessage); // Show the toast message
    localStorage.removeItem('toastMessage'); // Remove the toast message from localStorage
  }
};
export default toastify;
