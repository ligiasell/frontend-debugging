import React from 'react'
// <i18n>
import { useTranslation } from 'react-i18next'
// </i18n>

const NotFoundPage = () => {
  // <i18n>
  const { t } = useTranslation()
  // </i18n>
  return (
    <h1>
      {/* <i18n> */}
      {t('pageNotFound')}
      {/* </i18n> */}
      {/* <no-i18n> */}
      404 - Page Not Found
      {/* </no-i18n> */}
    </h1>
  )
}

export default NotFoundPage
