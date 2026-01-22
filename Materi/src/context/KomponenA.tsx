import KomponenB from "./KomponenB"


const KomponenA = () => {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <KomponenB />
      </div>
    </div>
  )
}

export default KomponenA
