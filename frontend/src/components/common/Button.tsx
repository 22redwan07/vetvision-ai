import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/helpers'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'outline'; children: ReactNode }
const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  const base = 'px-6 py-2 rounded-lg font-medium transition flex items-center justify-center'
  const variants = { primary: 'bg-primary text-white hover:bg-primary/90', outline: 'border border-primary text-primary hover:bg-primary/5' }
  return <button className={cn(base, variants[variant], className)} {...props}>{children}</button>
}
export default Button
