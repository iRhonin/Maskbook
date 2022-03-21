import { useCallback } from 'react'
import {
    useAccount,
    useTransactionState,
    TransactionStateType,
    TransactionEventType,
    ZERO_ADDRESS,
} from '@masknet/web3-shared-evm'
import { useMarketContract } from '../contracts/useMarketContract'
import type { Card, Market } from '../types'
import { isAddress } from 'web3-utils'
import { ZERO } from '@masknet/web3-shared-base'

export function useRentCallback(market: Market, price: string, card: Card, duration = 0) {
    const account = useAccount()
    const contract = useMarketContract(market.id)
    const [state, setState] = useTransactionState()

    const callback = useCallback(async () => {
        if (!contract || !isAddress(account)) {
            setState({
                type: TransactionStateType.UNKNOWN,
            })
            return
        }

        // pre-step: start waiting for provider to confirm tx
        setState({
            type: TransactionStateType.WAIT_FOR_CONFIRMING,
        })

        // step 1: estimate gas
        const config = {
            from: account,
            value: ZERO.toFixed(),
        }
        const estimatedGas = await contract.methods
            .newRental(price, duration, ZERO_ADDRESS, card.marketCardIndex)
            .estimateGas(config)
            .catch((error) => {
                setState({
                    type: TransactionStateType.FAILED,
                    error,
                })
                throw error
            })

        // step 2: blocking
        return new Promise<string>((resolve, reject) => {
            contract.methods
                .newRental(price, duration, ZERO_ADDRESS, card.marketCardIndex)
                .send({
                    ...config,
                    gas: estimatedGas,
                })
                .on(TransactionEventType.TRANSACTION_HASH, (hash) => {
                    setState({
                        type: TransactionStateType.HASH,
                        hash,
                    })
                    resolve(hash)
                })
                .on(TransactionEventType.ERROR, (error) => {
                    setState({
                        type: TransactionStateType.FAILED,
                        error,
                    })
                    reject(error)
                })
        })
    }, [contract, account, price, card, duration])

    const resetCallback = useCallback(() => {
        setState({
            type: TransactionStateType.UNKNOWN,
        })
    }, [])

    return [state, callback, resetCallback] as const
}
