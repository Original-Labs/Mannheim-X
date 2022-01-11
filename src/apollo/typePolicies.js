import {
  networkIdReactive,
  networkReactive,
  reverseRecordReactive,
  accountsReactive,
  isReadOnlyReactive,
  isRunningAsSafeAppReactive,
  isENSReadyReactive,
  favouritesReactive,
  globalErrorReactive,
  transactionHistoryReactive,
  namesReactive,
  snsNameReactive
} from './reactiveVars'
import { hasValidReverseRecord } from '../utils/utils'

export default {
  Query: {
    fields: {
      names: {
        read() {
          return namesReactive()
        }
      },
      transactionHistory: {
        read() {
          return transactionHistoryReactive()?.transactionHistory
        }
      },
      networkId: {
        read() {
          return networkIdReactive()
        }
      },
      network: {
        read() {
          const network = networkReactive()
          const networkName = network?.name
          if (!networkName) return 'Loading'
          return networkName === 'homestead' ? 'Main' : networkName
        }
      },
      accounts: {
        read() {
          return accountsReactive()
        }
      },
      displayName: {
        read() {
          let tempName
          const addresss = accountsReactive()?.[0]
          if (!addresss) {
            tempName = ''
          } else {
            tempName = hasValidReverseRecord(reverseRecordReactive())
              ? reverseRecordReactive().name
              : `${addresss?.slice(0, 10)}...`
          }

          const displayName = snsNameReactive() ? snsNameReactive() : tempName

          return displayName
        }
      },
      avatar: {
        read() {
          return reverseRecordReactive()?.avatar || ''
        }
      },
      isReadOnly: {
        read() {
          return isReadOnlyReactive()
        }
      },
      isSafeApp: {
        read() {
          return isRunningAsSafeAppReactive()
        }
      },
      isENSReady: {
        read() {
          return isENSReadyReactive()
        }
      },
      favourites: {
        read() {
          return favouritesReactive()
        }
      },
      globalError: {
        read() {
          return globalErrorReactive() || false
        }
      }
    }
  }
}
