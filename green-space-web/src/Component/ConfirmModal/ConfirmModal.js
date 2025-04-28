import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                    Xác nhận xóa
                  </Dialog.Title>
                  <p className="text-gray-500 dark:text-gray-300">
                    Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Xóa
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
