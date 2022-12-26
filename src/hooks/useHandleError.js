import useNotify from './useNotify';

const useHandleError = () => {
  const notify = useNotify();

  return (err, setError, msg) => {
    if (setError && err.errors) {
      Object.entries(err.errors)
        .forEach(([field, errors]) => {
          setError(field, { type: 'custom', message: errors[0] });
        });
    } else {
      const _msg = msg || 'an unexpected error occurred';
      notify(_msg, { type: 'error', keep: true });
    }
  }
};

export default useHandleError;
