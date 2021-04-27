import Web3 from 'web3'
import { assertEnvironment, Environment } from '@dimensiondev/holoflows-kit'
import Services from '../extension/service'

function createExternalProvider() {
    return {
        isMetaMask: false,
        isStatus: true,
        host: '',
        path: '',
        sendAsync: Services.Ethereum.send,
        send: Services.Ethereum.send,
        request() {
            throw new Error('The request method is not implemented.')
        },
    }
}

assertEnvironment(Environment.HasBrowserAPI)
// This is a none-provider client for constructing & deconstructing transactions in the content and options page.
// In the future, we can replace it by other libraries (maybe ethers.js)
export const nonFunctionalWeb3 = new Web3(createExternalProvider())
