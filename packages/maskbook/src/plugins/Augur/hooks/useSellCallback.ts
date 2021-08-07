import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import {
    FungibleTokenDetailed,
    EthereumTokenType,
    useAccount,
    useTransactionState,
    TransactionStateType,
    useNonce,
    useGasPrice,
    addGasMargin,
    TransactionEventType,
    useAugurConstants,
} from '@masknet/web3-shared'
import { useAMMFactory } from '../contracts/useAMMFactory'
import type { AMMOutcome, Market } from '../types'

export function useSellCallback(
    amount: string,
    market?: Market,
    outcome?: AMMOutcome,
    token?: FungibleTokenDetailed,
    shareTokensIn?: string[],
) {
    const { AMM_FACTORY_ADDRESS } = useAugurConstants()
    const ammContract = useAMMFactory(AMM_FACTORY_ADDRESS)

    const account = useAccount()
    const nonce = useNonce()
    const gasPrice = useGasPrice()
    const [sellState, setSellState] = useTransactionState()

    const sellCallback = useCallback(async () => {
        if (!token || !ammContract || !market || !outcome || !shareTokensIn) {
            setSellState({
                type: TransactionStateType.UNKNOWN,
            })
            return
        }

        // pre-step: start waiting for provider to confirm tx
        setSellState({
            type: TransactionStateType.WAIT_FOR_CONFIRMING,
        })

        // step 1: estimate gas
        const config = {
            from: account,
            value: new BigNumber(token.type === EthereumTokenType.Native ? amount : 0).toFixed(),
            gasPrice,
            nonce,
        }
        const estimatedGas = await ammContract.methods
            .sellForCollateral(market.address, market.id, outcome.id, shareTokensIn, '0')
            .estimateGas(config)
            .catch((error) => {
                setSellState({
                    type: TransactionStateType.FAILED,
                    error,
                })
                throw error
            })

        // step 2: blocking
        return new Promise<string>((resolve, reject) => {
            const promiEvent = ammContract.methods
                .sellForCollateral(market.address, market.id, outcome.id, shareTokensIn, '0')
                .send({
                    gas: addGasMargin(estimatedGas).toFixed(),
                    ...config,
                })
            promiEvent
                .on(TransactionEventType.TRANSACTION_HASH, (hash) => {
                    setSellState({
                        type: TransactionStateType.HASH,
                        hash,
                    })
                    resolve(hash)
                })
                .on(TransactionEventType.ERROR, (error) => {
                    setSellState({
                        type: TransactionStateType.FAILED,
                        error,
                    })
                    reject(error)
                })
        })
    }, [gasPrice, nonce, AMM_FACTORY_ADDRESS, account, amount, token, shareTokensIn, market, outcome])

    const resetCallback = useCallback(() => {
        setSellState({
            type: TransactionStateType.UNKNOWN,
        })
    }, [])

    return [sellState, sellCallback, resetCallback] as const
}
