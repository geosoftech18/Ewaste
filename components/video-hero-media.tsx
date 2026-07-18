"use client"

import { useEffect, useState } from "react"

const YT_ID = "Joxu_uv0OeA"
const POSTER_SRC = "/hero/video-poster.jpg"
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&loop=1&playlist=${YT_ID}&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0`

/** Client-only media layer — keeps hero copy in the server HTML for Speed Index */
export function VideoHeroMedia() {
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    if (loadVideo) return
    const timeoutId = window.setTimeout(() => setLoadVideo(true), 20000)
    return () => window.clearTimeout(timeoutId)
  }, [loadVideo])

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <img
        src={POSTER_SRC}
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="async"
        className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        aria-hidden
      />
      {loadVideo ? (
        <iframe
          src={EMBED_SRC}
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: "none", border: "none" }}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          title="Hero Video"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          className="absolute inset-0 z-[6] cursor-pointer bg-transparent border-0 p-0"
          aria-label="Play background video"
          onClick={() => setLoadVideo(true)}
        />
      )}
    </div>
  )
}
