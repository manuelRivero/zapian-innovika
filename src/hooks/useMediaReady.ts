import * as React from "react"

/**
 * Espera la carga de imagen/video antes de permitir animaciones (p. ej. ScrollReveal).
 * Si `shouldWait` es false, `isMediaReady` es true de inmediato.
 */
export function useMediaReady(shouldWait: boolean) {
  const [loaded, setLoaded] = React.useState(!shouldWait)

  React.useEffect(() => {
    setLoaded(!shouldWait)
  }, [shouldWait])

  const onMediaLoad = React.useCallback(() => {
    setLoaded(true)
  }, [])

  /** Ref para <img>: detecta caché del navegador (complete + naturalWidth). */
  const imageRef = React.useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  /** Ref para <video>: detecta caché del navegador (readyState). */
  const videoRef = React.useCallback((node: HTMLVideoElement | null) => {
    if (node && node.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setLoaded(true)
    }
  }, [])

  return {
    isMediaReady: !shouldWait || loaded,
    onMediaLoad,
    imageRef,
    videoRef,
  }
}
