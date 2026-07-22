import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { PredictionResult } from '../../types'

interface ImageUploadProps { onResult: (result: PredictionResult) => void }
const ImageUpload = ({ onResult }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) { setFile(file); setPreview(URL.createObjectURL(file)) }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg','.jpg','.png'] }, maxFiles: 1 })
  const removeImage = () => { setFile(null); setPreview(null) }
  const handlePredict = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const { data } = await api.post('/api/predict', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      onResult(data)
      toast.success('Prediction complete!')
    } catch (error) {
      toast.error('Prediction failed. Please try again.')
      console.error(error)
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {!preview ? (
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}>
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Drag & drop an image here, or click to browse</p>
          <p className="text-sm text-gray-400 mt-2">Supports JPEG, PNG</p>
        </div>
      ) : (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full max-h-96 object-contain rounded-xl" />
          <button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"><X size={20} /></button>
          <div className="mt-4 flex justify-center">
            <button onClick={handlePredict} disabled={loading} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Predict Disease'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default ImageUpload