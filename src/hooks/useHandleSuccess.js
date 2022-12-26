import useNotify from './useNotify';

const useHandleSuccess = () => {
  const notify = useNotify();

  return (msg, err) => {
    const _msg = msg || 'operation successful';
    notify(_msg, { type: 'success', keep: true });
  }
};

export default useHandleSuccess;
