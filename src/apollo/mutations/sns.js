import {
  setupSNS,
  setupIERC20,
  setupERC20Exchange,
  setupERC20
} from 'contracts'
import { isENSReadyReactive } from '../reactiveVars'

const INFURA_ID =
  window.location.host === 'sns.chat'
    ? '5a380f9dfbb44b2abf9f681d39ddc382' // High performance version
    : '5a380f9dfbb44b2abf9f681d39ddc382' // Free version

let sns = {},
  snsResolver = {},
  snsAddress = undefined,
  snsWithdraw = {},
  provider

export async function setup({
  reloadOnAccountsChange,
  enforceReadOnly,
  enforceReload,
  customProvider,
  snsAddress
}) {
  let option = {
    reloadOnAccountsChange: false,
    enforceReadOnly,
    enforceReload,
    customProvider,
    snsAddress
  }
  option.infura = INFURA_ID
  if (enforceReadOnly) {
    option.infura = INFURA_ID
  }
  const {
    sns: snsInstance,
    snsResolver: snsResolverInstance,
    snsWithdraw: snsWithdrawInstance,
    providerObject
  } = await setupSNS(option)

  sns = snsInstance
  snsResolver = snsResolverInstance
  snsWithdraw = snsWithdrawInstance

  provider = providerObject

  isENSReadyReactive(true)
  return { sns, snsResolver, providerObject, snsWithdraw }
}

export function getSnsResolver() {
  return snsResolver
}

export default function getSNS() {
  return sns
}

export function getSNSAddress() {
  return sns.registryAddress
}

export function getSNSWithdraw() {
  return snsWithdraw
}

export async function getSNSIERC20(address) {
  const snsIERC20Instance = await setupIERC20({ snsAddress: address, provider })
  return snsIERC20Instance
}

export async function getSNSERC20Exchange(address) {
  const snsIERC20Instance = await setupERC20Exchange({
    snsAddress: address,
    provider
  })
  return snsIERC20Instance
}

export async function getSNSERC20(address) {
  const snsIERC20Instance = await setupERC20({ snsAddress: address, provider })
  return snsIERC20Instance
}
