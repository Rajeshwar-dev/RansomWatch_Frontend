import { useState, useEffect } from "react"

export default function CountUp({ value, duration = 1.2 }) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    const numStr = String(value).replace(/[^0-9.]/g, "")
    const target = parseFloat(numStr)
    if (isNaN(target)) {
      setCount(value)
      return
    }

    const suffix = String(value).replace(/[0-9.,]/g, "") // e.g. "%" or "s"
    const prefix = String(value).startsWith("$") ? "$" : ""

    let start = 0
    const end = target
    const startTime = performance.now()

    let animationFrameId

    const updateCount = (now) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out quad formula: f(t) = t * (2 - t)
      const easedProgress = progress * (2 - progress)
      const currentVal = start + (end - start) * easedProgress

      let formattedVal = ""
      if (String(value).includes(",")) {
        formattedVal = Math.floor(currentVal).toLocaleString()
      } else if (String(value).includes(".")) {
        formattedVal = currentVal.toFixed(1)
      } else {
        formattedVal = Math.floor(currentVal)
      }

      setCount(`${prefix}${formattedVal}${suffix}`)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount)
      } else {
        setCount(value)
      }
    }

    animationFrameId = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrameId)
  }, [value, duration])

  return <span>{count}</span>
}
