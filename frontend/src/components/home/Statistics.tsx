import { motion } from 'framer-motion'
import { Activity, Database, Users, Award } from 'lucide-react'
const stats = [{ icon: Activity, value: '98%', label: 'Accuracy' },{ icon: Database, value: '15k+', label: 'Images Trained' },{ icon: Users, value: '6', label: 'Disease Classes' },{ icon: Award, value: '6', label: 'Ensemble Models' }]
const Statistics = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: idx*0.1 }} viewport={{ once:true }} className="p-6 rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-secondary">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Statistics
