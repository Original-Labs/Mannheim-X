import http from './axios'
import messageMention from '../utils/messageMention'
import { useTranslation } from 'react-i18next'

/**
 * Get airdrop token data
 */
function getAirdropData(params) {
  let { t } = useTranslation()

  return new Promise((resolve, reject) => {
    http(
      'get',
      `/api/v1/accountService/account/queryAccount?KeyName=${
        params.label
      }&address=${params.owner}`
    )
      .then(resp => {
        if (resp && resp.data && resp.data.code === 200) {
          resolve(resp.data.data)
        } else if (resp && resp.data && resp.data.code === 500) {
          messageMention({
            type: 'error',
            content: `${t('serviceMsg.servErr')}`
          })
        } else if (resp && resp.data && resp.data.code === 10001) {
          messageMention({
            type: 'warn',
            content: `${t('serviceMsg.paramsIsNull')}`
          })
        } else {
          messageMention({
            type: 'error',
            content: `${t('serviceMsg.unkonwErr')}`
          })
        }
      })
      .catch(() => {
        messageMention({
          type: 'error',
          content: `${t('serviceMsg.unkonwErr')}`
        })
      })
  })
}

export { getAirdropData }
