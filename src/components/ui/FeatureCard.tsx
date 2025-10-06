'use client'

interface FeatureCardProps {
  title: string
  subtitle: string
  description: string
  benefits: string[]
  buttonText: string
  centerIconText?: string
  image?: string
  layout?: 'horizontal' | 'vertical' | 'presentation'
  onButtonClick: () => void
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  benefits = [],
  buttonText,
  centerIconText = "ICON",
  image,
  layout = 'horizontal',
  onButtonClick
}: FeatureCardProps) {
  const isVertical = layout === 'vertical'
  const isPresentation = layout === 'presentation'

  return (
    <div className={`
      w-full
      ${isVertical ? 'max-w-2xl min-h-[90vh]' : isPresentation ? 'max-w-6xl min-h-[80vh]' : 'max-w-6xl min-h-[80vh]'}
      bg-bg
      border-2
      border-border
      rounded-xl
      text-left
      transition-all
      duration-300
      hover:shadow-lg
      hover:border-primary
      group
      relative
      overflow-hidden
      flex
      flex-col
      ${isVertical ? '' : 'md:flex-row'}
    `}>
      {/* Corner Highlights */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-primary/30 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-secondary/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-warning/30 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-success/30 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Image Section - 50% of the card */}
      <div className={`
        w-full
        ${isVertical ? 'h-1/2' : isPresentation ? 'md:w-1/2 h-64 md:h-full' : 'md:w-1/2 h-64 md:h-full'}
        relative
        bg-gradient-to-br
        from-primary/20
        to-secondary/20
        flex
        items-center
        justify-center
        order-1
        ${isVertical ? '' : 'md:order-1'}
      `}>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex justify-center">
            <div className="w-32 h-32 relative group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-warning/30 rounded-full opacity-80"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-secondary/40 via-warning/40 to-success/40 rounded-full opacity-80"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-warning/50 via-success/50 to-primary/50 rounded-full opacity-80"></div>
              <div className="absolute inset-6 bg-bg rounded-full flex items-center justify-center border border-border">
                <span className="text-xs font-bold text-text">{centerIconText}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section - 50% of the card */}
      <div className={`
        w-full
        ${isVertical ? 'h-1/2 p-6' : isPresentation ? 'md:w-1/2 p-8' : 'md:w-1/2 p-8'}
        flex
        flex-col
        justify-center
        order-2
        ${isVertical ? '' : 'md:order-2'}
      `}>
        {/* Title */}
        <h1 className={`${isVertical ? 'text-2xl md:text-3xl mb-3' : isPresentation ? 'text-3xl md:text-4xl mb-4' : 'text-3xl md:text-4xl mb-4'} font-bold text-text group-hover:text-primary transition-colors duration-300`}>
          {title}
        </h1>

        {/* Subtitle */}
        <h2 className={`${isVertical ? 'text-lg md:text-xl mb-4' : isPresentation ? 'text-xl md:text-2xl mb-6' : 'text-xl md:text-2xl mb-6'} font-semibold text-text`}>
          {subtitle}
        </h2>

        {/* Description */}
        <p className={`${isVertical ? 'text-base mb-6' : isPresentation ? 'text-lg mb-8' : 'text-lg mb-8'} text-text-muted leading-relaxed group-hover:text-text transition-colors duration-300`}>
          {description}
        </p>

        {/* Benefits List */}
        {benefits && benefits.length > 0 && (
          <div className={`${isVertical ? 'mb-6' : isPresentation ? 'mb-8' : 'mb-8'}`}>
            <h3 className={`${isVertical ? 'text-lg mb-3' : isPresentation ? 'text-xl mb-4' : 'text-xl mb-4'} font-semibold text-text`}>You&apos;ll get:</h3>
            <ul className={`${isVertical ? 'space-y-2' : isPresentation ? 'space-y-3' : 'space-y-3'}`}>
              {benefits.map((benefit, index) => (
                <li key={index} className={`flex items-start ${isVertical ? 'text-sm' : isPresentation ? 'text-base' : 'text-base'} text-text-muted group-hover:text-text transition-colors duration-300`}>
                  <span className={`text-primary mr-3 mt-1 font-bold ${isVertical ? 'text-base' : isPresentation ? 'text-lg' : 'text-lg'}`}>•</span>
                  <span className="flex-1">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onButtonClick}
            className={`
              bg-primary
              text-white
              ${isVertical ? 'px-10 py-4 text-lg' : isPresentation ? 'px-12 py-5 text-xl' : 'px-12 py-5 text-xl'}
              rounded-full
              font-semibold
              hover:bg-primary/90
              dark:bg-primary
              dark:text-bg-dark
              dark:hover:bg-primary/80
              transition-all
              duration-300
              hover:scale-105
              shadow-xl
              hover:shadow-2xl
              border-2
              border-primary
              hover:border-primary/80
            `}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Stroke Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary via-secondary to-warning opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}