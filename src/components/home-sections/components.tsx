'use client'

import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import UnsplashImage from '@/components/unsplash-image'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useCallback, useEffect, useRef, useState } from 'react'

const TWEEN_FACTOR_BASE = 0.4
const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)

export function HeroSlidingImage({
  imageSlides,
}: {
  imageSlides: {
    src: string
    alt: string
    color: string
    blurHash: string
  }[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const tweenFactor = useRef(0)

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => (tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length), [])

  const tweenOpacity = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach(slideIndex => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach(loopItem => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const opacity = numberWithinRange(tweenValue, 0, 1).toString()
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity
      })
    })
  }, [])

  useEffect(() => {
    if (!api) return

    setTweenFactor(api)
    tweenOpacity(api)
    api.on('reInit', setTweenFactor).on('reInit', tweenOpacity).on('scroll', tweenOpacity).on('slideFocus', tweenOpacity)
  }, [api, tweenOpacity, setTweenFactor])

  return (
    <Carousel setApi={setApi} plugins={[AutoScroll({ stopOnInteraction: false })]} opts={{ align: 'center', loop: true, skipSnaps: true }} className='w-full'>
      <CarouselContent className='w-full'>
        {imageSlides.map((image, index) => (
          <CarouselItem key={index} className='basis-1/3 sm:basis-1/5 md:basis-[14.2857143%]'>
            <div className='relative aspect-[2/3] overflow-hidden rounded-md'>
              <UnsplashImage priority {...image} fill sizes='(min-width: 780px) calc(16.67vw - 16px), calc(33.26vw - 16px)' />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
