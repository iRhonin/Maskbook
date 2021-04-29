import { ValueRef } from '@dimensiondev/holoflows-kit'
import * as Maskbook from './providers/Maskbook'
import * as MetaMask from './providers/MetaMask'
import * as WalletConnect from './providers/WalletConnect'
import { ProviderType } from '../../../web3/types'
import { currentSelectedWalletProviderSettings } from '../../../plugins/Wallet/settings'
import { unreachable } from '../../../utils/utils'
import type { WalletRecord } from '../../../plugins/Wallet/database/types'
import { WalletComparer } from '../../../plugins/Wallet/helpers'
import { WalletMessages, WalletRPC } from '../../../plugins/Wallet/messages'

//#region tracking wallets
const walletRef = new ValueRef<WalletRecord | null>(null, WalletComparer)
async function revalidate() {
    walletRef.value = (await WalletRPC.getWallet()) ?? null
}
WalletMessages.events.walletsUpdated.on(revalidate)
revalidate()
//#endregion

export async function createWeb3() {
    const providerType = currentSelectedWalletProviderSettings.value
    switch (providerType) {
        case ProviderType.Maskbook:
            const _private_key_ = walletRef.value?._private_key_
            return Maskbook.createWeb3({
                privKeys: _private_key_ ? [_private_key_] : [],
            })
        case ProviderType.MetaMask:
            return await MetaMask.createWeb3()
        case ProviderType.WalletConnect:
            return WalletConnect.createWeb3()
        default:
            unreachable(providerType)
    }
}
