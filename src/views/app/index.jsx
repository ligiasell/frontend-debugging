import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { getCarSelector } from '_modules/car/selectors'
import BMW from '_assets/images/bmw328i.jpg'
import { getPerfectBMW } from '_modules/car/actions'

import styles from './styles.css'

const App = () => {
  const car = useSelector(getCarSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPerfectBMW())
  }, [dispatch])

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={BMW} alt="BMW" className={styles['App-logo']} />
        <Typography variant="h1" component="h1">
          Jungle Devs Boilerplate
        </Typography>
      </header>
      <Typography variant="h3" component="p">
        {car.marca
          ? `The ${car.marca} ${car.modelo} ${car.anoModelo} - ${car.combustivel} (FIPE ${car.codigofipe}) was evaluated at ${car.valor}`
          : 'Loading...'}
      </Typography>
    </div>
  )
}

export default React.memo(App)
