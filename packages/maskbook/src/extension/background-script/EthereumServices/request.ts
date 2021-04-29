import type { RequestArguments } from 'web3-core'
import { send } from './send'

let id = 0

export async function request(requestArguments: RequestArguments) {
    return new Promise((resolve, reject) => {
        send(
            {
                jsonrpc: '2.0',
                id,
                ...{
                    params: [],
                    ...requestArguments,
                },
            },
            (err, response) => {
                if (err) reject(err)
                else resolve(response?.result)
            },
        )
        id++
    })
}
