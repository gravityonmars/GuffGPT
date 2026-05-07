import { useState, useEffect } from 'react'

export default function useApiData(endpoint, fallback) {
  const [data, setData] = useState(fallback)

  useEffect(() => {
    fetch(`/api/${endpoint}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setData)
      .catch(() => {})
  }, [endpoint])

  return data
}
