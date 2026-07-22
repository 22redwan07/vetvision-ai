import { motion } from 'framer-motion'
import { Shield, Zap, BarChart3, Camera } from 'lucide-react'
const features = [
  { icon: Camera, title: 'Instant Upload', desc: 'Drag & drop or browse to upload cattle images instantly.' },
  { icon: Zap, title: 'Fast AI Inference', desc: 'Ensemble of six deep learning models gives results in seconds.' },
  { icon: BarChart3, title: 'Detailed Results', desc: 'Get disease name, confidence, symptoms, and recommendations.' },
  { icon: Shield, title: 'Grad-CAM Visualization', desc: 'See where the AI focuses for transparent decision-making.' },
]
const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">Why VetVision AI?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <motion.div key={idx} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: idx*0.1 }} viewport={{ once:true }} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"><f.icon className="w-6 h-6 text-primary" /></div>
              <h3 className="text-xl font-semibold text-secondary">{f.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Features
