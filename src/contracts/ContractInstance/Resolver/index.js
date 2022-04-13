import has from 'lodash/has'
import { Contract, utils } from 'ethers'
import {
  getWeb3,
  getNetworkId,
  getProvider,
  getAccount,
  getSigner
} from '../../web3'
import { formatsByName } from '@ensdomains/address-encoder'

import { decryptHashes } from '../../preimage'

import {
  uniq,
  getEnsStartBlock,
  checkLabels,
  mergeLabels,
  emptyAddress,
  isDecrypted,
  namehash,
  labelhash
} from 'utils'
import { encodeLabelhash } from 'utils/labelhash'

import { getSNSContract, getSNSResolverContract } from '../../contracts'
import { nameRemoveSuffix } from 'utils/namehash'

/* Utils */

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
    registry: '0x08f4372e1CdBDcD958cF5ad6ECcb5637E64A9Ac7'
  },
  80001: {
    registry: '0xB2018C7Aa4FA17eF23f902B47E153c853B93F015'
  }
}

export class SNSResolver {
  constructor({ networkId, resolverAddress, provider }) {
    this.contracts = contracts
    const hasRegistry = has(this.contracts[networkId], 'registry')

    if (!hasRegistry && !resolverAddress) {
      throw new Error(`Unsupported network ${networkId}`)
    } else if (this.contracts[networkId] && !resolverAddress) {
      resolverAddress = contracts[networkId].registry
    }

    this.resolverAddress = resolverAddress

    const SNSResolverContract = getSNSResolverContract({
      address: resolverAddress,
      provider
    })
    this.SNSResolver = SNSResolverContract
  }

  /* Get the raw Ethers contract object */
  getSNSResolverContractInstance() {
    return this.SNSResolver
  }

  /* Main methods */

  // async getOwner(name) {
  //   const namehash = getNamehash(name)
  //   const owner = await this.SNS.owner(namehash)
  //   return owner
  // }

  /* non-constant functions */

  // async setOwner(name, newOwner) {
  //   const SNSWithoutSigner = this.SNS
  //   const signer = await getSigner()
  //   const SNS = SNSWithoutSigner.connect(signer)
  //   const namehash = getNamehash(name)
  //   return SNS.setOwner(namehash, newOwner)
  // }

  //ETH
  async getEthAddress(name) {
    return await this.SNSResolver.getEthAddress(name)
  }

  //BTC
  async getBtcAddress(name) {
    return await this.SNSResolver.getBtcAddress(name)
  }

  //LTC
  async getLtcAddress(name) {
    return await this.SNSResolver.getLtcAddress(name)
  }

  //DOGE
  async getDogeAddress(name) {
    return await this.SNSResolver.getDogeAddress(name)
  }

  //ipfs
  async getIpfs(name) {
    return await this.SNSResolver.getIpfs(name)
  }

  //url
  async getUrl(name) {
    return await this.SNSResolver.getUrl(name)
  }

  //email
  async getEmail(name) {
    return await this.SNSResolver.getEmail(name)
  }

  //avator
  async getAvator(name) {
    return await this.SNSResolver.getAvator(name)
  }

  //description
  async getDescription(name) {
    return await this.SNSResolver.getDescription(name)
  }

  //notice
  async getNotice(name) {
    return await this.SNSResolver.getNotice(name)
  }

  //keywords
  async getKeywords(name) {
    return await this.SNSResolver.getKeywords(name)
  }

  //comGithub
  async getComGithub(name) {
    return await this.SNSResolver.getComGithub(name)
  }

  //comReddit
  async getComReddit(name) {
    return await this.SNSResolver.getComReddit(name)
  }

  //comTwitter
  async getComTwitter(name) {
    return await this.SNSResolver.getComTwitter(name)
  }

  //orgTelegram
  async getOrgTelegram(name) {
    return await this.SNSResolver.getOrgTelegram(name)
  }

  async getAllProperties(name) {
    return await this.SNSResolver.getAllProperties(name)
  }

  //exp: 0+1-2-3-4-5-6-7-8-9-10-11-12-13-14
  //0:ethAddress ~ 14:orgTelegram
  //use "+" gap
  async setAllProperties(name, recordsStr) {
    return await this.SNSResolver.setAllProperties(
      nameRemoveSuffix(name),
      recordsStr
    )
  }

  /**
   event ContentChanged(string indexed name_, string type_, string newContent);
   event OwnerChanged(string indexed name_, address newOwner);
   */
  async getSNSResolverEvent(event, { topics, fromBlock }) {
    const provider = await getWeb3()
    const { SNSResolver } = this
    const ensInterface = new utils.Interface(ensContract)
    let Event = SNSResolver.filters[event]()

    const filter = {
      fromBlock,
      toBlock: 'latest',
      address: Event.address,
      topics: [...Event.topics, ...topics]
    }

    const logs = await provider.getLogs(filter)

    const parsed = logs.map(log => {
      const parsedLog = ensInterface.parseLog(log)
      return parsedLog
    })

    return parsed
  }
}

// export async function setupSNSResolver({ provider, networkId, sns, name }) {
//   // const snsName = await sns.getSNSName(getAccount())
//   if (name) {
//     const resolverAddress = await sns.getResolverAddress(name)
//     return new SNSResolver({ networkId, resolverAddress, provider })
//   }
//   return {}
// }
