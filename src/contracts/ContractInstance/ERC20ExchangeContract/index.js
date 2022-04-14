import has from 'lodash/has'
import { getERC20ExchangeContract } from '../../contracts'
import { getSigner } from '../../web3'

const contracts = {
  1: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  },
  3: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  },
  4: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  },
  5: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  },
  137: {
    registry: '0x797301747e21C10356547e27FA8D358e5Bd71bbC'
  },
  80001: {
    registry: '0x4710b11a1a636b1b6b7bbb8c08b2758c1993aba2'
  }
}

export class ERC20Exchange {
  constructor({ networkId, registryAddress, provider }) {
    this.contracts = contracts
    const hasRegistry = has(this.contracts[networkId], 'registry')

    if (!hasRegistry && !registryAddress) {
      throw new Error(`Unsupported network ${networkId}`)
    } else if (this.contracts[networkId] && !registryAddress) {
      registryAddress = contracts[networkId].registry
    }

    this.registryAddress = registryAddress

    const ERC20TransContract = getERC20ExchangeContract({
      address: registryAddress,
      provider
    })
    this.ERC20Trans = ERC20TransContract
  }

  /* Get the raw Ethers contract object */
  getERC20TransContractInstance() {
    return this.ERC20Trans
  }

  /* Main methods */

  // binding subscription pool
  async subscribe() {
    const singner = await getSigner()
    const ERC20Instance = this.ERC20Trans.connect(singner)
    return await ERC20Instance.subscribe()
  }

  // get burn address
  async fromTokenAddress() {
    return await this.ERC20Trans.fromTokenAddress()
  }

  // subscription address
  async feeTokenAddress() {
    return await this.ERC20Trans.feeTokenAddress()
  }

  // subscription
  async exchange(amount) {
    return await this.ERC20Trans.exchange(amount)
  }

  // burn old coins
  async userBurn(amount) {
    const singner = await getSigner()
    const ERC20Instance = this.ERC20Trans.connect(singner)
    return await ERC20Instance.userBurn(amount)
  }

  // 查询用户可兑换的余额
  async userExchangeAvailable(account) {
    return await this.ERC20Trans.userExchangeAvailable(account)
  }

  // 查询兑换池已兑换的数量
  async poolExchangeAmount(poolId) {
    return await this.ERC20Trans.poolExchangeAmount(poolId)
  }

  // 查询兑换池剩余可兑换的数量
  async poolBalance(poolId) {
    return await this.ERC20Trans.poolBalance(poolId)
  }

  // 查询兑换池的元数据
  async poolURI(poolId) {
    return await this.ERC20Trans.poolURI(poolId)
  }
}
