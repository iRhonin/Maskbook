import { FungibleTokenDetailed, isNative, useBlockNumber, useTokenConstants } from '@masknet/web3-shared-evm'
import { useAsyncRetry } from 'react-use'
import { BALANCER_SWAP_TYPE } from '../../constants'
import { PluginTraderRPC } from '../../messages'
import { SwapResponse, TradeStrategy } from '../../types'

export function useTrade(
    strategy: TradeStrategy,
    inputAmount: string,
    outputAmount: string,
    inputToken?: FungibleTokenDetailed,
    outputToken?: FungibleTokenDetailed,
) {
    const blockNumber = useBlockNumber()
    const { WNATIVE_ADDRESS } = useTokenConstants()

    return useAsyncRetry(async () => {
        if (!WNATIVE_ADDRESS) return null
        if (!inputToken || !outputToken) return null
        const isExactIn = strategy === TradeStrategy.ExactIn
        if (inputAmount === '0' && isExactIn) return null
        if (outputAmount === '0' && !isExactIn) return null
        // the WETH address is used for looking for available pools
        const sellToken = isNative(inputToken.address) ? WNATIVE_ADDRESS : inputToken.address
        const buyToken = isNative(outputToken.address) ? WNATIVE_ADDRESS : outputToken.address
        const { swaps, routes } = await PluginTraderRPC.getSwaps(
            sellToken,
            buyToken,
            isExactIn ? BALANCER_SWAP_TYPE.EXACT_IN : BALANCER_SWAP_TYPE.EXACT_OUT,
            isExactIn ? inputAmount : outputAmount,
        )
        // no pool found
        if (!swaps[0].length) return null
        return { swaps, routes } as SwapResponse
    }, [
        WNATIVE_ADDRESS,
        strategy,
        inputAmount,
        outputAmount,
        inputToken?.address,
        outputToken?.address,
        blockNumber, // refresh api each block
    ])
}
