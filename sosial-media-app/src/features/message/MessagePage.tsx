import { Mail } from 'lucide-react'


const MessagePage = () => {
  return (
     <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
      <div className="text-center">
        <Mail size={48} className="text-[#137fec] mx-auto" />
        <h1 className="mt-4 text-3xl font-bold text-white">Fitur Pesan</h1>
        <p className="mt-2 text-[#94a3b8]">Kami sedang mengerjakan fitur ini. Segera hadir!</p>
      </div>
    </div>
  )
}

export default MessagePage
