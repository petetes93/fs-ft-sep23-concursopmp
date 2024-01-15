import { useState, useEffect } from 'react'
import designService from 'services/design-service'

function useDesigns() {
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    designService
      .get()
      .then(({ data }) => setDesigns(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { designs, loading, errors, setDesigns }
}

export default useDesigns
