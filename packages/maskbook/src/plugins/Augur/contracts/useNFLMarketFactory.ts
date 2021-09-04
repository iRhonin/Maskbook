import type { AbiItem } from 'web3-utils'
import NFLMarketFactoryABI from '@masknet/web3-contracts/abis/AugurNFLMarketFactory.json'
import type { AugurNFLMarketFactory } from '@masknet/web3-contracts/types/AugurNFLMarketFactory'
import { useContract } from '@masknet/web3-shared'

export function useNFLMarketFactory(address: string) {
    return useContract<AugurNFLMarketFactory>(address, NFLMarketFactoryABI as AbiItem[])
}
