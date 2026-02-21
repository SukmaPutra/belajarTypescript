type Props = {
  onClose: () => void;
};

const EmptyProfileModal = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900">
          Profil belum tersedia
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Pengguna ini belum membuat profil.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default EmptyProfileModal;