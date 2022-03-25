import { isShortName } from '../../utils/utils'

import getENS, { getRegistrar } from 'apollo/mutations/ens'
import getSNS, { getSNSIERC20 } from 'apollo/mutations/sns'
import EthVal from 'ethval'

import modeNames from '../modes'
import { sendHelper } from '../resolverUtils'

const defaults = {}

const resolvers = {
  Query: {
    async getRentPrice(_) {
      const sns = getSNS()
      return sns.getRegisteredPrice()
    },
    async getRentPrices(_, { labels, duration }) {
      const registrar = getRegistrar()
      return labels.length && registrar.getRentPrices(labels, duration)
    },
    async getPremium(_, { name, expires, duration }) {
      const registrar = getRegistrar()
      return registrar.getPremium(name, expires, duration)
    },
    async getTimeUntilPremium(_, { expires, amount }) {
      const registrar = getRegistrar()
      return registrar.getTimeUntilPremium(expires, amount)
    },

    async getMinimumCommitmentAge() {
      try {
        const registrar = getRegistrar()
        const minCommitmentAge = await registrar.getMinimumCommitmentAge()
        return parseInt(minCommitmentAge)
      } catch (e) {
        console.log(e)
      }
    },
    async getMaximumCommitmentAge() {
      try {
        const registrar = getRegistrar()
        const maximumCommitmentAge = await registrar.getMaximumCommitmentAge()
        return parseInt(maximumCommitmentAge)
      } catch (e) {
        console.log(e)
      }
    },
    async checkCommitment(_, { label, secret }) {
      try {
        const registrar = getRegistrar()
        const commitment = await registrar.checkCommitment(label, secret)
        return parseInt(commitment)
      } catch (e) {
        console.log(e)
      }
    }
  },
  Mutation: {
    async commit(_, { label, coinsType, ownerAddress }) {
      const sns = getSNS()
      if (coinsType === 'key') {
        const keyAddress = await sns.getKeyCoinsAddress()
        const keyCoins = await sns.getKeyCoinsPrice()

        const snsIERC20 = await getSNSIERC20(keyAddress)

        await snsIERC20.approve(keyAddress, keyCoins)

        setTimeout(async () => {
          let timer,
            count = 0,
            allowancePrice
          timer = setInterval(async () => {
            try {
              count += 1
              allowancePrice = await snsIERC20.allowance(
                ownerAddress,
                keyAddress
              )
              console.log('allowancePrice:', allowancePrice)
            } catch (e) {
              console.log('allowance:', e)
              clearInterval(timer)
            }
            try {
              const price = new EthVal(`${allowancePrice || 0}`)
                .toEth()
                .toFixed(3)
              console.log('type', typeof price)
              if (price !== '0.00') {
                console.log('price:', price)
                const tx = await sns.mintByMoreCoins(label, 1)
                clearInterval(timer)
              }
            } catch (e) {
              console.log('mintByMoreCoins:', e)
              clearInterval(timer)
            }
            //
            if (count === 10) {
              clearInterval(timer)
            }
          }, 3000)
        }, 0)
      } else {
        const tx = await sns.registry(label)
        return sendHelper(tx)
      }
    },
    async register(_, { label, duration, secret }) {
      const registrar = getRegistrar()
      const tx = await registrar.register(label, duration, secret)

      return sendHelper(tx)
    },
    async reclaim(_, { name, address }) {
      const registrar = getRegistrar()
      const tx = await registrar.reclaim(name, address)
      return sendHelper(tx)
    },
    async renew(_, { label, duration }) {
      const registrar = getRegistrar()
      const tx = await registrar.renew(label, duration)
      return sendHelper(tx)
    },
    async getDomainAvailability(_, { name }) {
      const registrar = getRegistrar()
      const ens = getENS()
      try {
        const {
          state,
          registrationDate,
          revealDate,
          value,
          highestBid
        } = await registrar.getEntry(name)
        let owner = null
        if (isShortName(name)) {
          cache.writeData({
            data: defaults
          })
          return null
        }

        if (modeNames[state] === 'Owned') {
          owner = await ens.getOwner(`${name}.eth`)
        }

        const data = {
          domainState: {
            name: `${name}.eth`,
            state: modeNames[state],
            registrationDate,
            revealDate,
            value,
            highestBid,
            owner,
            __typename: 'DomainState'
          }
        }

        cache.writeData({ data })

        return data.domainState
      } catch (e) {
        console.log('Error in getDomainAvailability', e)
      }
    },
    async setRegistrant(_, { name, address }) {
      // NFT transfer
      const sns = getSNS()
      // console.log('sns------', sns)
      const tx = await sns.transfer(address, name)
      // console.log('txinfo------', tx)
      return sendHelper(tx)
    },
    async submitProof(_, { name, parentOwner }) {
      const registrar = getRegistrar()
      const tx = await registrar.submitProof(name, parentOwner)
      return sendHelper(tx)
    },
    async renewDomains(_, { labels, duration }) {
      const registrar = getRegistrar()
      const tx = await registrar.renewAll(labels, duration)
      return sendHelper(tx)
    }
  }
}

export default resolvers

export { defaults }
