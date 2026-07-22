import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import Button from '../common/Button'
const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-green-50 py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }} className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-secondary"><span className="text-primary">AI-Powered</span> Cattle Disease Detection</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto lg:mx-0">Early detection saves herds. Upload an image and get a fast, accurate diagnosis using state-of-the-art deep learning.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button onClick={() => navigate('/prediction')}>Start Prediction <ArrowRight size={18} className="ml-2" /></Button>
            <Button variant="outline" onClick={() => navigate('/about')}><Play size={18} className="mr-2" /> Learn More</Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.8, delay:0.2 }} className="lg:w-1/2 mt-10 lg:mt-0">
          <img src="/vet-hero.svg" alt="Veterinary AI" className="w-full max-w-md mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}
export default Hero
