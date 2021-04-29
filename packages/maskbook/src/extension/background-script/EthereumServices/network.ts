import type { TransactionConfig } from 'web3-core'
import { createWeb3 } from './web3'

// TODO:
// send transaction by using request

export async function getGasPrice() {
    return (await createWeb3()).eth.getGasPrice()
}

export async function getBlockNumber() {
    return (await createWeb3()).eth.getBlockNumber()
}

export async function getBalance(address: string) {
    return (await createWeb3()).eth.getBalance(address)
}

export async function getTransaction(id: string) {
    return (await createWeb3()).eth.getTransaction(id)
}

export async function getTransactionReceipt(id: string) {
    return (await createWeb3()).eth.getTransactionReceipt(id)
}

export async function getTransactionCount(address: string) {
    return (await createWeb3()).eth.getTransactionCount(address)
}

export async function estimateGas(config: TransactionConfig) {
    return (await createWeb3()).eth.estimateGas(config)
}
