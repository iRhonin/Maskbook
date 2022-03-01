import { createERC20Tokens } from '@masknet/web3-shared-evm'

export const REALITYCARDS_PLUGIN_ID = 'org.realitycards'
export const BASE_URL = 'realitycards.io'

export const MINIMUM_ACCEPTED_PRICE = 1 * 10 ** 6 // 1 USDC

export const USDC = createERC20Tokens('USDC_ADDRESS', 'USD Coin', 'USDC', 6)
export const SIGNIFICANT_DIGITS = 2
