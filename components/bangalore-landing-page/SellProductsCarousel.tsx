"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import type { SellProduct } from "@/data/sell-products"

const SellProductFormModal = dynamic(
  () =>
    import("@/components/bangalore-landing-page/SellProductFormModal").then(
      (m) => ({
        default: m.SellProductFormModal,
      })
    ),
  { ssr: false }
)

type SellProductsCarouselProps = {
  title: string
  subtitle?: string
  products: SellProduct[]
  cityName?: string
}

function getGapOffset(itemsPerView: number) {
  if (itemsPerView === 3) return 10
  return 14
}

function ProductCard({
  product,
  onSell,
}: {
  product: SellProduct
  onSell: (product: SellProduct) => void
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSell(product)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSell(product)
        }
      }}
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-brand/40 hover:shadow-md"
    >
      <div className="relative flex h-28 items-center justify-center bg-white p-1 sm:h-60 sm:p-6">
        <Image
          src={product.image}
          alt={product.alt}
          width={280}
          height={240}
          className="h-full w-full scale-110 object-contain sm:scale-100"
          sizes="(max-width: 768px) 33vw, 25vw"
        />
        {/* Mobile: green + like reference image */}
        <span
          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-sm md:hidden"
          aria-hidden
        >
          <Plus className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 border-t border-gray-100 px-2 pb-2 pt-1.5 sm:gap-3.5 sm:px-5 sm:pb-5 sm:pt-4">
        <h3 className="text-[12px] font-semibold leading-snug text-gray-900 sm:text-base">
          Sell {product.name}
        </h3>

        {/* Mobile: stacked price (no button) */}
        <div className="mt-auto md:hidden">
          <p className="text-[9px] leading-tight text-gray-500">Get Up to :</p>
          <p className="text-[13px] font-bold leading-tight text-gray-900">
            {product.priceLabel}
          </p>
        </div>

        {/* Desktop/tablet: price + Sell Now on one line */}
        <div className="mt-auto hidden items-center justify-between gap-2 md:flex">
          <p className="min-w-0 text-sm text-gray-500 sm:text-[15px]">
            Get Up to:{" "}
            <span className="font-bold text-gray-900">{product.priceLabel}</span>
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onSell(product)
            }}
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-brand bg-white px-3.5 text-sm font-semibold text-brand transition hover:bg-mint sm:h-10 sm:px-5"
          >
            Sell Now
          </button>
        </div>
      </div>
    </article>
  )
}

export function SellProductsCarousel({
  title,
  subtitle,
  products,
  cityName = "Hyderabad",
}: SellProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const [pickupModalLoaded, setPickupModalLoaded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<SellProduct | null>(
    null
  )
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (pickupModalOpen) setPickupModalLoaded(true)
  }, [pickupModalOpen])

  const openSellModal = (product: SellProduct) => {
    setSelectedProduct(product)
    setPickupModalLoaded(true)
    setPickupModalOpen(true)
  }

  useEffect(() => {
    const handleResize = () => {
      // Mobile: 3 cols · Tablet & desktop: 4 cols
      setItemsPerView(window.innerWidth < 768 ? 3 : 4)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerView])

  useEffect(() => {
    if (!isAutoPlaying || products.length <= itemsPerView) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1
        if (nextIndex >= products.length) return 0
        return nextIndex
      })
    }, 3500)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, products.length, itemsPerView])

  const gapOffset = getGapOffset(itemsPerView)
  const loopProducts = [...products, ...products]

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Get cash for scrap
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div
          className="relative mt-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden py-1">
            <motion.div
              className="flex gap-3 sm:gap-4"
              animate={{
                x: `-${currentIndex * (100 / itemsPerView)}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              {loopProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="shrink-0"
                  style={{
                    flexBasis: `calc(${100 / itemsPerView}% - ${gapOffset}px)`,
                  }}
                >
                  <ProductCard product={product} onSell={openSellModal} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {pickupModalLoaded ? (
        <SellProductFormModal
          open={pickupModalOpen}
          onOpenChange={setPickupModalOpen}
          cityName={cityName}
          productName={
            selectedProduct ? `Sell ${selectedProduct.name}` : undefined
          }
          productPrice={selectedProduct?.priceLabel}
        />
      ) : null}
    </section>
  )
}
