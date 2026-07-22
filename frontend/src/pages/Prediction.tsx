import { useState } from 'react'
import ImageUpload from '../components/prediction/ImageUpload'
import ResultDisplay from '../components/prediction/ResultDisplay'
import { PredictionResult } from '../types'
const Prediction = () => {
  const [result, setResult] = useState<PredictionResult | null>(null)
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center text-secondary mb-6">Disease Prediction</h1>
      <p className="text-center text-gray-500 mb-8">Upload a cattle image to get a diagnosis</p>
      <ImageUpload onResult={setResult} />
      {result && <ResultDisplay result={result} />}
    </div>
  )
}
export default Prediction
