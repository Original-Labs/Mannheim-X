import has from 'lodash/has'
import { getERC20Contract } from '../../contracts'
import { getSigner, getAccount } from '../../web3'

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

export class SNSERC20 {
  constructor({ networkId, registryAddress, provider }) {
    this.contracts = contracts
    const hasRegistry = has(this.contracts[networkId], 'registry')

    if (!hasRegistry && !registryAddress) {
      throw new Error(`Unsupported network ${networkId}`)
    } else if (this.contracts[networkId] && !registryAddress) {
      registryAddress = contracts[networkId].registry
    }

    this.registryAddress = registryAddress

    const SNSERC20Contract = getERC20Contract({
      address: registryAddress,
      provider
    })
    this.SNSERC20 = SNSERC20Contract
  }

  /* Get the raw Ethers contract object */
  getSNSERC20ContractInstance() {
    return this.SNSERC20
  }

  /* Main methods */

  // ERC20 approve
  async approve(address, amount) {
    const singner = await getSigner()
    const ERC20Instance = this.SNSERC20.connect(singner)
    return await ERC20Instance.approve(address, amount)
  }

  async allowance(spender) {
    const ownerAccount = await getAccount()
    return await this.SNSERC20.allowance(ownerAccount, spender)
  }

  async balanceOf() {
    const ownerAccount = await getAccount()
    return await this.SNSERC20.balanceOf(ownerAccount)
  }
}
