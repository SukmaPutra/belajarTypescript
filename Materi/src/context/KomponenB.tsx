import KomponenC from "./KomponenC"

const KomponenB = () => {
  return (
    <div className="flex justify-between p-4 items-center">
        
        <h1 className="text-gray-900 dark:text-white text-4xl">Title</h1>
      <KomponenC />
    </div>
  )
}

export default KomponenB
