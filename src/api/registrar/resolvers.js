import { isShortName } from '../../utils/utils'

import getENS, { getRegistrar } from 'apollo/mutations/ens'
import getSNS, { getSNSIERC20 } from 'apollo/mutations/sns'

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
        console.log('ownerAddress:', ownerAddress)
        const keyAddress = await sns.getKeyCoinsAddress()
        const keyCoins = await sns.getKeyCoinsPrice()
        console.log('keyAddress:', keyAddress)
        console.log('keyCoins:', keyCoins)

        const snsIERC20 = await getSNSIERC20(keyAddress)

        console.log('snsIERC20:', snsIERC20)

        const approveValue = await snsIERC20.approve(keyAddress, keyCoins)
        console.log('approveValue:', approveValue)

        setTimeout(() => {
          let timer,
            count = 0
          timer = setInterval(async () => {
            try {
              count += 1
              const isAllowance = await snsIERC20.allowance(
                ownerAddress,
                keyAddress
              )
              console.log('isAllowance:', isAllowance)
            } catch (e) {
              console.log('allowanceError:', e)
            }
            if (count === 6) {
              console.log('count:', count)
              clearInterval(timer)
            }
          }, 1000)
        }, 1000)
      }
      const tx = await sns.registry(label)
      return sendHelper(tx)
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
