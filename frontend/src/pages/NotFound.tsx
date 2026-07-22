import { Link } from 'react-router-dom'
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-6xl font-bold text-gray-300">404</h1>
    <p className="text-xl text-gray-600 mt-2">Page not found</p>
    <Link to="/" className="mt-4 text-primary hover:underline">Go Home</Link>
  </div>
)
export default NotFound
