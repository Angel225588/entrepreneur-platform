interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  onGetStarted: () => void
}

export default function HeroSection({
  title,
  subtitle,
  description,
  onGetStarted
}: HeroSectionProps) {
  return (
    <section className="
      relative
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      px-4
      sm:px-6
      lg:px-8
      py-12
      overflow-hidden
    ">
      {/* Background gradient */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-bg-dark
        via-bg
        to-bg-light
        opacity-95
      "></div>

      {/* Content */}
      <div className="
        relative
        z-10
        w-full
        max-w-xs
        xs:max-w-sm
        sm:max-w-md
        md:max-w-2xl
        lg:max-w-4xl
        xl:max-w-5xl
        2xl:max-w-6xl
        mx-auto
        text-center
        space-y-8
        md:space-y-12
      ">
        {/* Main Title */}
        <div className="space-y-4 md:space-y-6">
          <h1 className="
            text-3xl
            xs:text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            2xl:text-9xl
            font-bold
            text-text
            leading-tight
            tracking-tight
          ">
            {title}
          </h1>

          {/* Subtitle */}
          <h2 className="
            text-lg
            xs:text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            xl:text-5xl
            2xl:text-6xl
            font-medium
            text-primary
            leading-relaxed
          ">
            {subtitle}
          </h2>
        </div>

        {/* Description */}
        <p className="
          text-base
          xs:text-lg
          sm:text-xl
          md:text-2xl
          text-text-muted
          leading-relaxed
          max-w-2xl
          mx-auto
          px-4
        ">
          {description}
        </p>

        {/* CTA Button */}
        <div className="pt-4 md:pt-8">
          <button
            onClick={onGetStarted}
            className="
              inline-flex
              items-center
              justify-center
              px-8
              sm:px-12
              md:px-16
              py-4
              sm:py-5
              md:py-6
              bg-primary
              text-bg-dark
              text-lg
              xs:text-xl
              sm:text-2xl
              font-semibold
              rounded-full
              hover:bg-warning
              active:bg-highlight
              transition-all
              duration-300
              transform
              hover:scale-105
              focus:outline-none
              focus:ring-4
              focus:ring-primary
              focus:ring-opacity-50
              shadow-lg
              hover:shadow-xl
            "
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="
        absolute
        top-1/4
        right-1/4
        w-32
        h-32
        bg-secondary
        rounded-full
        opacity-10
        blur-xl
        animate-pulse
      "></div>

      <div className="
        absolute
        bottom-1/4
        left-1/4
        w-24
        h-24
        bg-success
        rounded-full
        opacity-10
        blur-xl
        animate-pulse
        animation-delay-1000
      "></div>
    </section>
  )
}