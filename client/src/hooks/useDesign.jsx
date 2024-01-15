import { useState, useEffect } from 'react'
import designService from 'services/design-service'

function useDesign(designId) {
  const [design, setDesign] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    designService
      .getById(designId)
      .then(({ data }) => setDesign(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { design, loading, errors, setDesign }
}

export default useDesign
