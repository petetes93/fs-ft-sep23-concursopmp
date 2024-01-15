import { useState, useEffect } from 'react'
import contestService from 'services/contest-service'

function useContest(contestId) {
  const [contest, setContest] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    contestService
      .getById(contestId)
      .then(({ data }) => setContest(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { contest, loading, errors, setContest }
}

export default useContest
