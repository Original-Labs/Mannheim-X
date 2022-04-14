import {
  getProvider,
  setupWeb3,
  getNetworkId,
  getNetwork,
  getAccount
} from './web3'
import { ENS } from './ens.js'
import { setupRegistrar } from './registrar'
export { utils, ethers } from 'ethers'
import { SNS } from './ContractInstance/SNS/index.js'
import { SNSResolver } from './ContractInstance/Resolver/index.js'
import { SNSWithdraw } from './ContractInstance/Withdraw/index.js'
import { SNSIERC20 } from './ContractInstance/IERC20/index.js'
import { ERC20Exchange } from './ContractInstance/ERC20ExchangeContract/index.js'
import { SNSERC20 } from './ContractInstance/ERC20/index.js'

export async function setupENS({
  customProvider,
  ensAddress,
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  infura
} = {}) {
  const { provider } = await setupWeb3({
    customProvider,
    reloadOnAccountsChange,
    enforceReadOnly,
    enforceReload,
    infura
  })
  const networkId = await getNetworkId()
  const ens = new ENS({ provider, networkId, registryAddress: ensAddress })
  const registrar = await setupRegistrar(ens.registryAddress)
  const network = await getNetwork()
  return {
    ens,
    registrar,
    provider: customProvider,
    network,
    providerObject: provider
  }
}

export async function setupSNS({
  customProvider,
  ensAddress,
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  infura
} = {}) {
  const { provider } = await setupWeb3({
    customProvider,
    reloadOnAccountsChange,
    enforceReadOnly,
    enforceReload,
    infura
  })
  const networkId = await getNetworkId()
  console.log('[networkId]', networkId)
  // get sns and resolver instance
  // const sns = new SNS({ provider, networkId, registryAddress: ensAddress })
  // // Get the address of the parser
  // // const name = await sns.getSNSName(getAccount())
  // const snsResolver = new SNSResolver({ networkId, provider })
  // // get widthdraw instance
  // const snsWithdraw = new SNSWithdraw({
  //   provider,
  //   networkId,
  //   registryAddress: ensAddress
  // })

  const network = await getNetwork()

  // return {
  //   sns,
  //   snsWithdraw,
  //   snsResolver,
  //   provider: customProvider,
  //   network,
  //   providerObject: provider
  // }
  const sns = {}
  const snsWithdraw = {}
  const snsResolver = {}

  return {
    sns,
    snsWithdraw,
    snsResolver,
    provider: customProvider,
    network,
    providerObject: provider
  }
}

export async function setupHeim({
  customProvider,
  ensAddress,
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  infura,
  name,
  sns
} = {}) {
  const { provider } = await setupWeb3({
    customProvider,
    reloadOnAccountsChange,
    enforceReadOnly,
    enforceReload,
    infura
  })
  const networkId = await getNetworkId()
  let newVar = await sns.isOverDeadline()
  // Get the address of the parser
  if (name) {
    const resolverAddress = await sns.getResolverAddress(name)
    return new SNSResolver({ networkId, resolverAddress, provider })
  }
  return {}
}

// withdraw coins Instance
export async function callWithdraw({
  customProvider,
  ensAddress,
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  infura
} = {}) {
  const { provider } = await setupWeb3({
    customProvider,
    reloadOnAccountsChange,
    enforceReadOnly,
    enforceReload,
    infura
  })
  const networkId = await getNetworkId()
  // get sns and resolver instance
  const snsWithdraw = new SNSWithdraw({
    provider,
    networkId,
    registryAddress: ensAddress
  })

  const network = await getNetwork()

  return {
    snsWithdraw,
    provider: customProvider,
    network,
    providerObject: provider
  }
}

// ERC20 Instance
export async function setupIERC20({ snsAddress, provider } = {}) {
  // get IERC20 instance
  const snsIERC20 = new SNSIERC20({ registryAddress: snsAddress, provider })
  return snsIERC20
}

// ERC20 Instance
export async function setupERC20Exchange({ snsAddress, provider } = {}) {
  console.log('setupERC20ExchangeAddress:', snsAddress)
  const networkId = await getNetworkId()
  // get ERC20Exchange instance
  const snsERC20Exchange = new ERC20Exchange({
    networkId,
    registryAddress: snsAddress,
    provider
  })
  return snsERC20Exchange
}

// ERC20 Instance
export async function setupERC20({ snsAddress, provider } = {}) {
  const networkId = await getNetworkId()
  // get ERC20Exchange instance
  const snsERC20 = new SNSERC20({
    networkId,
    registryAddress: snsAddress,
    provider
  })
  return snsERC20
}

export * from './ens'
export * from './registrar'
export * from './web3'
export * from './constants/interfaces'
export * from 'utils'
export * from './contracts'
export * from './ContractInstance/SNS'
export * from './ContractInstance/Resolver'
