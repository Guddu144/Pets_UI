import toast from 'react-hot-toast/headless';

const DEFAULT_OPTS = {
  type: 'error', // success | error | warning
  keep: true,
  duration: 5000,
  description: undefined,
};

const useNotify = () => {
  return (msg, opts = {}) => {
    const _opts = Object.assign(DEFAULT_OPTS, opts);
    toast(msg, {
      type: _opts.type,
      duration: _opts.keep ? Infinity : _opts.duration,
      description: _opts.description,
    });
  };
};

export default useNotify;
