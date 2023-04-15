import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import crossIcon from '../../icons/cross-icon.svg';
import { Button, Icon } from '../inputs';
import { classNames } from '../../utils';

const sizes = {
  'sm': 'sm:max-w-sm',
  'md': 'sm:max-w-lg',
  'lg': 'sm:max-w-lg md:max-w-2xl',
};

const Modal = ({ isOpen, onClose, children, size = 'lg', showCloseButton }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-40">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 h-full overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-0 sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  sizes[size],
                  'relative bg-white rounded-t-3xl sm:rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 w-full sm:p-6',
                )}
              >
                {showCloseButton &&
                  <div className="hidden sm:block absolute top-0 right-0 pt-6 pr-6">
                    <Button
                      type="button"
                      onClick={onClose}
                      className="bg-blue-50 rounded-full p-1.5"
                    >
                      <Icon icon={crossIcon} className="h-3 w-3 text-blue-700" />
                    </Button>
                  </div>
                }
                <div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
