import { motion } from 'framer-motion'
import { PredictionResult } from '../../types'
import { CheckCircle, AlertCircle, Info, Activity } from 'lucide-react'
import GradCamImage from './GradCamImage'

const ResultDisplay = ({ result }: { result: PredictionResult }) => {
  const isHealthy = result.prediction === 'Healthy'
  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-start gap-4">
        {isHealthy ? <CheckCircle className="w-10 h-10 text-green-500" /> : <AlertCircle className="w-10 h-10 text-red-500" />}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-secondary">{result.prediction}</h2>
          <div className="flex items-center gap-2 mt-1"><span className="text-sm text-gray-500">Confidence:</span><span className="text-sm font-semibold">{(result.confidence*100).toFixed(2)}%</span></div>
          <p className="mt-2 text-gray-700">{result.description}</p>
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl"><h3 className="font-semibold text-secondary flex items-center gap-2"><AlertCircle size={18} /> Symptoms</h3><p className="text-sm text-gray-600 mt-1">{result.symptoms}</p></div>
        <div className="bg-gray-50 p-4 rounded-xl"><h3 className="font-semibold text-secondary flex items-center gap-2"><Activity size={18} /> Recommendations</h3><p className="text-sm text-gray-600 mt-1">{result.recommendations}</p></div>
        <div className="bg-gray-50 p-4 rounded-xl md:col-span-2"><h3 className="font-semibold text-secondary flex items-center gap-2"><Info size={18} /> Prevention</h3><p className="text-sm text-gray-600 mt-1">{result.prevention}</p></div>
      </div>
      {result.grad_cam && (
        <div className="mt-6"><h3 className="font-semibold text-secondary mb-2">AI Attention Map (Grad-CAM)</h3><GradCamImage base64={result.grad_cam} /></div>
      )}
      <div className="mt-4 text-xs text-gray-400 flex justify-between"><span>Processing time: {result.processing_time}s</span><span>{result.timestamp}</span></div>
    </motion.div>
  )
}
export default ResultDisplay
