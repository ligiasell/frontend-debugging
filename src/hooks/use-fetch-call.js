import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Map } from 'immutable'

import { usePrevious } from '_hooks/use-previous'

const useFetchCall = (action, onSuccess, onReject = () => {}) => {
  const isLoading = useSelector(state => !!state.loading.get(action))
  const wasLoading = usePrevious(isLoading)
  const error = useSelector(state => state.error.get(action, Map()))

  useEffect(() => {
    if (!isLoading && wasLoading) {
      if (!error.size) {
        onSuccess()
      } else {
        onReject(error)
      }
    }
  })

  return [isLoading, error]
}

export default useFetchCall
