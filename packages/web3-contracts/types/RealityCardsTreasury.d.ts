/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from 'bn.js'
import { ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import {
    Callback,
    PayableTransactionObject,
    NonPayableTransactionObject,
    BlockType,
    ContractEventLog,
    BaseContract,
} from './types'

interface EventOptions {
    filter?: object
    fromBlock?: BlockType
    topics?: string[]
}

export type LogAdjustDeposit = ContractEventLog<{
    user: string
    amount: string
    increase: boolean
    0: string
    1: string
    2: boolean
}>
export type LogGlobalPause = ContractEventLog<{
    paused: boolean
    0: boolean
}>
export type LogMarketPaused = ContractEventLog<{
    market: string
    paused: boolean
    0: string
    1: boolean
}>
export type LogMarketWhitelist = ContractEventLog<{
    _market: string
    role: string
    0: string
    1: string
}>
export type LogUserForeclosed = ContractEventLog<{
    user: string
    foreclosed: boolean
    0: string
    1: boolean
}>
export type MetaTransactionExecuted = ContractEventLog<{
    userAddress: string
    relayerAddress: string
    functionSignature: string
    0: string
    1: string
    2: string
}>
export type RoleAdminChanged = ContractEventLog<{
    role: string
    previousAdminRole: string
    newAdminRole: string
    0: string
    1: string
    2: string
}>
export type RoleGranted = ContractEventLog<{
    role: string
    account: string
    sender: string
    0: string
    1: string
    2: string
}>
export type RoleRevoked = ContractEventLog<{
    role: string
    account: string
    sender: string
    0: string
    1: string
    2: string
}>

export interface RealityCardsTreasury extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): RealityCardsTreasury
    clone(): RealityCardsTreasury
    methods: {
        AFFILIATE(): NonPayableTransactionObject<string>

        ARTIST(): NonPayableTransactionObject<string>

        CARD_AFFILIATE(): NonPayableTransactionObject<string>

        DEFAULT_ADMIN_ROLE(): NonPayableTransactionObject<string>

        FACTORY(): NonPayableTransactionObject<string>

        GOVERNOR(): NonPayableTransactionObject<string>

        MARKET(): NonPayableTransactionObject<string>

        ORDERBOOK(): NonPayableTransactionObject<string>

        OWNER(): NonPayableTransactionObject<string>

        TREASURY(): NonPayableTransactionObject<string>

        UBER_OWNER(): NonPayableTransactionObject<string>

        WHITELIST(): NonPayableTransactionObject<string>

        addMarket(_market: string, _paused: boolean): NonPayableTransactionObject<void>

        assessForeclosure(_user: string): NonPayableTransactionObject<void>

        batchWhitelist(_users: string[], add: boolean): NonPayableTransactionObject<void>

        bridgeAddress(): NonPayableTransactionObject<string>

        changeGlobalPause(): NonPayableTransactionObject<void>

        changePauseMarket(_market: string, _paused: boolean): NonPayableTransactionObject<void>

        checkPermission(role: string | number[], account: string): NonPayableTransactionObject<boolean>

        checkRole(role: string, account: string): NonPayableTransactionObject<boolean>

        checkSponsorship(sender: string, _amount: number | string | BN): NonPayableTransactionObject<void>

        collectRentUser(_user: string, _timeToCollectTo: number | string | BN): NonPayableTransactionObject<string>

        decreaseBidRate(_user: string, _price: number | string | BN): NonPayableTransactionObject<void>

        deposit(_amount: number | string | BN, _user: string): NonPayableTransactionObject<boolean>

        erc20(): NonPayableTransactionObject<string>

        executeMetaTransaction(
            userAddress: string,
            functionSignature: string | number[],
            sigR: string | number[],
            sigS: string | number[],
            sigV: number | string | BN,
        ): PayableTransactionObject<string>

        factory(): NonPayableTransactionObject<string>

        foreclosureTimeUser(
            _user: string,
            _newBid: number | string | BN,
            _timeOfNewBid: number | string | BN,
        ): NonPayableTransactionObject<string>

        getChainId(): NonPayableTransactionObject<string>

        getDomainSeperator(): NonPayableTransactionObject<string>

        getNonce(user: string): NonPayableTransactionObject<string>

        getRoleAdmin(role: string | number[]): NonPayableTransactionObject<string>

        globalExit(): NonPayableTransactionObject<void>

        globalPause(): NonPayableTransactionObject<boolean>

        grantRole(role: string | number[], account: string): NonPayableTransactionObject<void>

        grantRoleString(role: string, account: string): NonPayableTransactionObject<void>

        hasRole(role: string | number[], account: string): NonPayableTransactionObject<boolean>

        increaseBidRate(_user: string, _price: number | string | BN): NonPayableTransactionObject<void>

        isAllowed(arg0: string): NonPayableTransactionObject<boolean>

        isForeclosed(arg0: string): NonPayableTransactionObject<boolean>

        leaderboard(): NonPayableTransactionObject<string>

        lockMarketPaused(arg0: string): NonPayableTransactionObject<boolean>

        marketBalance(): NonPayableTransactionObject<string>

        marketBalanceTopup(): NonPayableTransactionObject<string>

        marketPaused(arg0: string): NonPayableTransactionObject<boolean>

        marketPot(arg0: string): NonPayableTransactionObject<string>

        marketWhitelist(arg0: string): NonPayableTransactionObject<string>

        marketWhitelistCheck(_user: string): NonPayableTransactionObject<boolean>

        maxContractBalance(): NonPayableTransactionObject<string>

        minRentalDayDivisor(): NonPayableTransactionObject<string>

        orderbook(): NonPayableTransactionObject<string>

        payRent(_amount: number | string | BN): NonPayableTransactionObject<string>

        payout(_user: string, _amount: number | string | BN): NonPayableTransactionObject<boolean>

        refundUser(_user: string, _refund: number | string | BN): NonPayableTransactionObject<void>

        renounceRole(role: string | number[], account: string): NonPayableTransactionObject<void>

        revokeRole(role: string | number[], account: string): NonPayableTransactionObject<void>

        revokeRoleString(role: string, account: string): NonPayableTransactionObject<void>

        setBridgeAddress(_newBridge: string): NonPayableTransactionObject<void>

        setFactoryAddress(_newFactory: string): NonPayableTransactionObject<void>

        setLeaderboardAddress(_newLeaderboard: string): NonPayableTransactionObject<void>

        setMaxContractBalance(_newBalanceLimit: number | string | BN): NonPayableTransactionObject<void>

        setMinRental(_newDivisor: number | string | BN): NonPayableTransactionObject<void>

        setOrderbookAddress(_newOrderbook: string): NonPayableTransactionObject<void>

        setTokenAddress(_newToken: string): NonPayableTransactionObject<void>

        sponsor(_sponsor: string, _amount: number | string | BN): NonPayableTransactionObject<void>

        supportsInterface(interfaceId: string | number[]): NonPayableTransactionObject<boolean>

        toggleWhitelist(): NonPayableTransactionObject<void>

        topupMarketBalance(_amount: number | string | BN): NonPayableTransactionObject<void>

        totalDeposits(): NonPayableTransactionObject<string>

        totalMarketPots(): NonPayableTransactionObject<string>

        uberOwnerCheckTime(): NonPayableTransactionObject<string>

        uberOwnerTest(): NonPayableTransactionObject<void>

        unPauseMarket(_market: string): NonPayableTransactionObject<void>

        updateLastRentalTime(_user: string): NonPayableTransactionObject<void>

        updateMarketWhitelist(_market: string, _role: string | number[]): NonPayableTransactionObject<void>

        updateRentalRate(
            _oldOwner: string,
            _newOwner: string,
            _oldPrice: number | string | BN,
            _newPrice: number | string | BN,
            _timeOwnershipChanged: number | string | BN,
        ): NonPayableTransactionObject<void>

        user(arg0: string): NonPayableTransactionObject<{
            deposit: string
            rentalRate: string
            bidRate: string
            lastRentCalc: string
            lastRentalTime: string
            0: string
            1: string
            2: string
            3: string
            4: string
        }>

        userDeposit(_user: string): NonPayableTransactionObject<string>

        userTotalBids(_user: string): NonPayableTransactionObject<string>

        whitelistEnabled(): NonPayableTransactionObject<boolean>

        withdrawDeposit(_amount: number | string | BN, _localWithdrawal: boolean): NonPayableTransactionObject<void>
    }
    events: {
        LogAdjustDeposit(cb?: Callback<LogAdjustDeposit>): EventEmitter
        LogAdjustDeposit(options?: EventOptions, cb?: Callback<LogAdjustDeposit>): EventEmitter

        LogGlobalPause(cb?: Callback<LogGlobalPause>): EventEmitter
        LogGlobalPause(options?: EventOptions, cb?: Callback<LogGlobalPause>): EventEmitter

        LogMarketPaused(cb?: Callback<LogMarketPaused>): EventEmitter
        LogMarketPaused(options?: EventOptions, cb?: Callback<LogMarketPaused>): EventEmitter

        LogMarketWhitelist(cb?: Callback<LogMarketWhitelist>): EventEmitter
        LogMarketWhitelist(options?: EventOptions, cb?: Callback<LogMarketWhitelist>): EventEmitter

        LogUserForeclosed(cb?: Callback<LogUserForeclosed>): EventEmitter
        LogUserForeclosed(options?: EventOptions, cb?: Callback<LogUserForeclosed>): EventEmitter

        MetaTransactionExecuted(cb?: Callback<MetaTransactionExecuted>): EventEmitter
        MetaTransactionExecuted(options?: EventOptions, cb?: Callback<MetaTransactionExecuted>): EventEmitter

        RoleAdminChanged(cb?: Callback<RoleAdminChanged>): EventEmitter
        RoleAdminChanged(options?: EventOptions, cb?: Callback<RoleAdminChanged>): EventEmitter

        RoleGranted(cb?: Callback<RoleGranted>): EventEmitter
        RoleGranted(options?: EventOptions, cb?: Callback<RoleGranted>): EventEmitter

        RoleRevoked(cb?: Callback<RoleRevoked>): EventEmitter
        RoleRevoked(options?: EventOptions, cb?: Callback<RoleRevoked>): EventEmitter

        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter
    }

    once(event: 'LogAdjustDeposit', cb: Callback<LogAdjustDeposit>): void
    once(event: 'LogAdjustDeposit', options: EventOptions, cb: Callback<LogAdjustDeposit>): void

    once(event: 'LogGlobalPause', cb: Callback<LogGlobalPause>): void
    once(event: 'LogGlobalPause', options: EventOptions, cb: Callback<LogGlobalPause>): void

    once(event: 'LogMarketPaused', cb: Callback<LogMarketPaused>): void
    once(event: 'LogMarketPaused', options: EventOptions, cb: Callback<LogMarketPaused>): void

    once(event: 'LogMarketWhitelist', cb: Callback<LogMarketWhitelist>): void
    once(event: 'LogMarketWhitelist', options: EventOptions, cb: Callback<LogMarketWhitelist>): void

    once(event: 'LogUserForeclosed', cb: Callback<LogUserForeclosed>): void
    once(event: 'LogUserForeclosed', options: EventOptions, cb: Callback<LogUserForeclosed>): void

    once(event: 'MetaTransactionExecuted', cb: Callback<MetaTransactionExecuted>): void
    once(event: 'MetaTransactionExecuted', options: EventOptions, cb: Callback<MetaTransactionExecuted>): void

    once(event: 'RoleAdminChanged', cb: Callback<RoleAdminChanged>): void
    once(event: 'RoleAdminChanged', options: EventOptions, cb: Callback<RoleAdminChanged>): void

    once(event: 'RoleGranted', cb: Callback<RoleGranted>): void
    once(event: 'RoleGranted', options: EventOptions, cb: Callback<RoleGranted>): void

    once(event: 'RoleRevoked', cb: Callback<RoleRevoked>): void
    once(event: 'RoleRevoked', options: EventOptions, cb: Callback<RoleRevoked>): void
}
