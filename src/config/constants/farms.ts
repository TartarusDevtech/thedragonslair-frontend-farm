import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'DREGG',
    lpAddresses: {
      97: '',
      43113: '0xb246CadDfe9471c3560fd9CE3Afd3584F55fe9a6', // DREGG-USDT LP
    },
    tokenSymbol: 'DREGG',
    tokenAddresses: {
      97: '',
      43113: '0x250F45b88Fc8B2fDC207Fc4fa7921811e3a5a6c6',
    },
    quoteTokenSymbol: QuoteToken.USDTe,
    quoteTokenAdresses: contracts.usdte,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'DREGG-USDT.e LP',
    lpAddresses: {
      97: '',
      43113: '0xb246CadDfe9471c3560fd9CE3Afd3584F55fe9a6',
    },
    tokenSymbol: 'DREGG',
    tokenAddresses: {
      97: '',
      43113: '0x250F45b88Fc8B2fDC207Fc4fa7921811e3a5a6c6',
    },
    quoteTokenSymbol: QuoteToken.USDTe,
    quoteTokenAdresses: contracts.usdte,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'WAVAX-USDT.e LP',
    lpAddresses: {
      97: '',
      43113: '0x32e99C4B59316F285eaa9bA202A109421f9b87d0',
    },
    tokenSymbol: 'WAVAX',
    tokenAddresses: {
      97: '',
      43113: '0xd00ae08403b9bbb9124bb305c09058e32c39a48c',
    },
    quoteTokenSymbol: QuoteToken.USDTe,
    quoteTokenAdresses: contracts.usdte,
  },
]

export default farms
