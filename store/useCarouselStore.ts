import { create } from 'zustand'
import type { UseEmblaCarouselType } from 'embla-carousel-react'

export type CarouselApi = UseEmblaCarouselType[1]

interface CarouselState {
  api: CarouselApi | null
  canScrollPrev: boolean
  canScrollNext: boolean
  setApi: (api: CarouselApi) => void
  setCanScrollPrev: (canScroll: boolean) => void
  setCanScrollNext: (canScroll: boolean) => void
  scrollPrev: () => void
  scrollNext: () => void
}

export const useCarouselStore = create<CarouselState>((set, get) => ({
  api: null,
  canScrollPrev: false,
  canScrollNext: false,
  setApi: (api) => set({ api }),
  setCanScrollPrev: (canScrollPrev) => set({ canScrollPrev }),
  setCanScrollNext: (canScrollNext) => set({ canScrollNext }),
  scrollPrev: () => {
    const api = get().api
    if (api) api.scrollPrev()
  },
  scrollNext: () => {
    const api = get().api
    if (api) api.scrollNext()
  },
}))
