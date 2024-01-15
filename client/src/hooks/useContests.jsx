import { useState, useEffect } from 'react'
import contestService from 'services/contest-service'

function useContests() {
  const [contests, setContests] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    contestService
      .get()
      .then(({ data }) => setContests(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { contests, loading, errors, setContests }
}

export default useContests
