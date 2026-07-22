import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
const navItems = [{ label: 'Home', path: '/' },{ label: 'Prediction', path: '/prediction' },{ label: 'About', path: '/about' },{ label: 'Research', path: '/research' },{ label: 'Contact', path: '/contact' }]
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary"><span>ðŸ„</span> VetVision AI</Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map(item => <Link key={item.path} to={item.path} className="text-gray-700 hover:text-primary transition">{item.label}</Link>)}
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && <div className="md:hidden bg-white border-t py-4 px-4 flex flex-col gap-3">
        {navItems.map(item => <Link key={item.path} to={item.path} className="text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>{item.label}</Link>)}
      </div>}
    </header>
  )
}
export default Header
