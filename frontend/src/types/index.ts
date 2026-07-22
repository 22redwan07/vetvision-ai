export interface PredictionResult {
  prediction: string
  confidence: number
  probabilities: Record<string, number>
  grad_cam: string | null
  processing_time: number
  timestamp: string
  symptoms: string
  description: string
  recommendations: string
  prevention: string
}
