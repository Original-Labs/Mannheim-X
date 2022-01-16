// import http from './axios'
// import messageMention from '../utils/messageMention'
// import { Trans, useTranslation } from 'react-i18next'
//
// /**
//  * Get airdrop token data
//  */
// function getAirdropData(params) {
//   return new Promise((resolve, reject) => {
//     http(
//       'get',
//       `/api/v1/accountService/account/queryAccount?KeyName=${
//         params.label
//       }&address=${params.owner}`
//     )
//       .then(resp => {
//         debugger
//         if (resp && resp.data && resp.data.code === 200) {
//           resolve(resp.data.data)
//         } else if (resp && resp.data && resp.data.code === 500) {
//           messageMention({
//             type: 'error',
//             content: <Trans i18nKey={'serviceMsg.servErr'} />
//           })
//         } else if (resp && resp.data && resp.data.code === 10001) {
//           messageMention({
//             type: 'warn',
//             content: <Trans i18nKey={'serviceMsg.paramsIsNull'} />
//           })
//         } else {
//           messageMention({
//             type: 'error',
//             content: <Trans i18nKey={'serviceMsg.unkonwErr'} />
//           })
//         }
//       })
//       .catch(() => {
//         messageMention({
//           type: 'error',
//           content: <Trans i18nKey={'serviceMsg.unkonwErr'} />
//         })
//       })
//   })
// }
//
// export { getAirdropData }
