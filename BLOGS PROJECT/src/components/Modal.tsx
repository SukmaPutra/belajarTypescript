type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
};
const Modal = ({ isOpen, onClose, onConfirm, title, description }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div className="relative z-10 w-full max-w-md rounded-lg bg-gray-800 shadow-lg">
        {/* header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-300">{description}</p>
        </div>

        {/* footer */}
        <div className="flex justify-end gap-3 border-t border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
