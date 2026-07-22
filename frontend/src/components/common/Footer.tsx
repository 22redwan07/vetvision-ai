import { Github, Linkedin, Mail } from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold"><span>ðŸ„</span> VetVision AI</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="mailto:redwan.shiddiki@example.com" className="hover:text-primary transition"><Mail size={20} /></a>
            <a href="https://github.com/redwan-shiddiki" target="_blank" rel="noopener" className="hover:text-primary transition"><Github size={20} /></a>
            <a href="https://linkedin.com/in/redwan-shiddiki" target="_blank" rel="noopener" className="hover:text-primary transition"><Linkedin size={20} /></a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-4 border-t border-gray-700 pt-4">&copy; {new Date().getFullYear()} MD. Redwan Shiddiki. All rights reserved.</div>
      </div>
    </footer>
  )
}
export default Footer
