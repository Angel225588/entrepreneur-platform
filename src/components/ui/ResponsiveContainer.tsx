interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
}

export default function ResponsiveContainer({
  children,
  className = ""
}: ResponsiveContainerProps) {
  return (
    <div className={`
      w-full
      min-w-[320px]
      max-w-none
      sm:max-w-[640px]
      md:max-w-[768px]
      lg:max-w-[1024px]
      xl:max-w-[1200px]
      2xl:max-w-[1400px]
      mx-auto
      px-4
      sm:px-6
      lg:px-8
      ${className}
    `}>
      {children}
    </div>
  )
}