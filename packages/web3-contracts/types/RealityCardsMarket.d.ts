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

export type LogContractLocked = ContractEventLog<{
    didTheEventFinish: boolean
    0: boolean
}>
export type LogLongestOwner = ContractEventLog<{
    cardId: string
    longestOwner: string
    0: string
    1: string
}>
export type LogNewOwner = ContractEventLog<{
    cardId: string
    newOwner: string
    0: string
    1: string
}>
export type LogPayoutDetails = ContractEventLog<{
    artistAddress: string
    marketCreatorAddress: string
    affiliateAddress: string
    cardAffiliateAddresses: string[]
    artistCut: string
    winnerCut: string
    creatorCut: string
    affiliateCut: string
    cardAffiliateCut: string
    0: string
    1: string
    2: string
    3: string[]
    4: string
    5: string
    6: string
    7: string
    8: string
}>
export type LogQuestionPostedToOracle = ContractEventLog<{
    marketAddress: string
    questionId: string
    0: string
    1: string
}>
export type LogRentCollection = ContractEventLog<{
    rentCollected: string
    newTimeHeld: string
    cardId: string
    owner: string
    0: string
    1: string
    2: string
    3: string
}>
export type LogRentReturned = ContractEventLog<{
    returnedTo: string
    amountReturned: string
    0: string
    1: string
}>
export type LogSettings = ContractEventLog<{
    minRentalDayDivisor: string
    minimumPriceIncreasePercent: string
    nftsToAward: string
    nftsToWinningOutcomeOnly: boolean
    0: string
    1: string
    2: string
    3: boolean
}>
export type LogSponsor = ContractEventLog<{
    sponsor: string
    amount: string
    0: string
    1: string
}>
export type LogStakeholderPaid = ContractEventLog<{
    paidTo: string
    amountPaid: string
    0: string
    1: string
}>
export type LogStateChange = ContractEventLog<{
    newState: string
    0: string
}>
export type LogUpdateTimeHeldLimit = ContractEventLog<{
    owner: string
    newLimit: string
    cardId: string
    0: string
    1: string
    2: string
}>
export type LogWinnerKnown = ContractEventLog<{
    winningOutcome: string
    0: string
}>
export type LogWinningsPaid = ContractEventLog<{
    paidTo: string
    amountPaid: string
    0: string
    1: string
}>
export type MetaTransactionExecuted = ContractEventLog<{
    userAddress: string
    relayerAddress: string
    functionSignature: string
    0: string
    1: string
    2: string
}>

export interface RealityCardsMarket extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): RealityCardsMarket
    clone(): RealityCardsMarket
    methods: {
        MIN_RENTAL_VALUE(): NonPayableTransactionObject<string>

        PER_MILLE(): NonPayableTransactionObject<string>

        accountingComplete(): NonPayableTransactionObject<boolean>

        affiliateAddress(): NonPayableTransactionObject<string>

        affiliateCut(): NonPayableTransactionObject<string>

        affiliatePaid(): NonPayableTransactionObject<boolean>

        arbitrator(): NonPayableTransactionObject<string>

        artistAddress(): NonPayableTransactionObject<string>

        artistCut(): NonPayableTransactionObject<string>

        artistPaid(): NonPayableTransactionObject<boolean>

        card(arg0: number | string | BN): NonPayableTransactionObject<{
            totalTimeHeld: string
            timeLastCollected: string
            longestOwner: string
            cardTimeLimit: string
            cardPrice: string
            rentCollectedPerCard: string
            cardAffiliatePaid: boolean
            0: string
            1: string
            2: string
            3: string
            4: string
            5: string
            6: boolean
        }>

        cardAccountingIndex(): NonPayableTransactionObject<string>

        cardAffiliateAddresses(arg0: number | string | BN): NonPayableTransactionObject<string>

        cardAffiliateCut(): NonPayableTransactionObject<string>

        claimCard(_card: number | string | BN): NonPayableTransactionObject<void>

        collectRent(_cardId: number | string | BN): NonPayableTransactionObject<boolean>

        creatorCut(): NonPayableTransactionObject<string>

        creatorPaid(): NonPayableTransactionObject<boolean>

        executeMetaTransaction(
            userAddress: string,
            functionSignature: string | number[],
            sigR: string | number[],
            sigS: string | number[],
            sigV: number | string | BN,
        ): PayableTransactionObject<string>

        exit(_card: number | string | BN): NonPayableTransactionObject<void>

        exitAll(): NonPayableTransactionObject<void>

        exitedTimestamp(arg0: string): NonPayableTransactionObject<string>

        factory(): NonPayableTransactionObject<string>

        getChainId(): NonPayableTransactionObject<string>

        getDomainSeperator(): NonPayableTransactionObject<string>

        getMarketInfo(): NonPayableTransactionObject<{
            0: string
            1: string
            2: string
            3: string
            4: string[]
            5: string[]
        }>

        getNonce(user: string): NonPayableTransactionObject<string>

        getTokenId(_card: number | string | BN): NonPayableTransactionObject<string>

        getWinnerFromOracle(): NonPayableTransactionObject<void>

        initialize(
            _mode: number | string | BN,
            _timestamps: (number | string | BN)[],
            _numberOfCards: number | string | BN,
            _artistAddress: string,
            _affiliateAddress: string,
            _cardAffiliateAddresses: string[],
            _marketCreatorAddress: string,
            _realitioQuestion: string,
            _nftsToAward: number | string | BN,
        ): NonPayableTransactionObject<void>

        isFinalized(): NonPayableTransactionObject<boolean>

        isMarket(): NonPayableTransactionObject<boolean>

        leaderboard(): NonPayableTransactionObject<string>

        lockMarket(): NonPayableTransactionObject<void>

        longestOwner(_card: number | string | BN): NonPayableTransactionObject<string>

        marketCreatorAddress(): NonPayableTransactionObject<string>

        marketLockingTime(): NonPayableTransactionObject<string>

        marketOpeningTime(): NonPayableTransactionObject<string>

        maxRentIterations(): NonPayableTransactionObject<string>

        maxRentIterationsToLockMarket(): NonPayableTransactionObject<string>

        minRentalDayDivisor(): NonPayableTransactionObject<string>

        minimumPriceIncreasePercent(): NonPayableTransactionObject<string>

        mode(): NonPayableTransactionObject<string>

        newRental(
            _newPrice: number | string | BN,
            _timeHeldLimit: number | string | BN,
            _startingPosition: string,
            _card: number | string | BN,
        ): NonPayableTransactionObject<void>

        nfthub(): NonPayableTransactionObject<string>

        nftsToAward(): NonPayableTransactionObject<string>

        numberOfCards(): NonPayableTransactionObject<string>

        oracleResolutionTime(): NonPayableTransactionObject<string>

        orderbook(): NonPayableTransactionObject<string>

        ownerOf(_cardId: number | string | BN): NonPayableTransactionObject<string>

        payAffiliate(): NonPayableTransactionObject<void>

        payArtist(): NonPayableTransactionObject<void>

        payCardAffiliate(_card: number | string | BN): NonPayableTransactionObject<void>

        payMarketCreator(): NonPayableTransactionObject<void>

        questionId(): NonPayableTransactionObject<string>

        realitio(): NonPayableTransactionObject<string>

        rentAllCards(_maxSumOfPrices: number | string | BN): NonPayableTransactionObject<void>

        rentCollectedPerUser(arg0: string): NonPayableTransactionObject<string>

        rentCollectedPerUserPerCard(arg0: string, arg1: number | string | BN): NonPayableTransactionObject<string>

        setAmicableResolution(_winningOutcome: number | string | BN): NonPayableTransactionObject<void>

        'sponsor(address,uint256)'(
            _sponsorAddress: string,
            _amount: number | string | BN,
        ): NonPayableTransactionObject<void>

        'sponsor(uint256)'(_amount: number | string | BN): NonPayableTransactionObject<void>

        state(): NonPayableTransactionObject<string>

        timeHeld(_card: number | string | BN, _user: string): NonPayableTransactionObject<string>

        timeLastCollected(_card: number | string | BN): NonPayableTransactionObject<string>

        timeout(): NonPayableTransactionObject<string>

        tokenIds(arg0: number | string | BN): NonPayableTransactionObject<string>

        totalRentCollected(): NonPayableTransactionObject<string>

        transferCard(
            _from: string,
            _to: string,
            _cardId: number | string | BN,
            _price: number | string | BN,
            _timeLimit: number | string | BN,
        ): NonPayableTransactionObject<void>

        treasury(): NonPayableTransactionObject<string>

        updateTimeHeldLimit(
            _timeHeldLimit: number | string | BN,
            _card: number | string | BN,
        ): NonPayableTransactionObject<void>

        userAlreadyWithdrawn(arg0: string): NonPayableTransactionObject<boolean>

        winnerCut(): NonPayableTransactionObject<string>

        winningOutcome(): NonPayableTransactionObject<string>

        withdraw(): NonPayableTransactionObject<void>
    }
    events: {
        LogContractLocked(cb?: Callback<LogContractLocked>): EventEmitter
        LogContractLocked(options?: EventOptions, cb?: Callback<LogContractLocked>): EventEmitter

        LogLongestOwner(cb?: Callback<LogLongestOwner>): EventEmitter
        LogLongestOwner(options?: EventOptions, cb?: Callback<LogLongestOwner>): EventEmitter

        LogNewOwner(cb?: Callback<LogNewOwner>): EventEmitter
        LogNewOwner(options?: EventOptions, cb?: Callback<LogNewOwner>): EventEmitter

        LogPayoutDetails(cb?: Callback<LogPayoutDetails>): EventEmitter
        LogPayoutDetails(options?: EventOptions, cb?: Callback<LogPayoutDetails>): EventEmitter

        LogQuestionPostedToOracle(cb?: Callback<LogQuestionPostedToOracle>): EventEmitter
        LogQuestionPostedToOracle(options?: EventOptions, cb?: Callback<LogQuestionPostedToOracle>): EventEmitter

        LogRentCollection(cb?: Callback<LogRentCollection>): EventEmitter
        LogRentCollection(options?: EventOptions, cb?: Callback<LogRentCollection>): EventEmitter

        LogRentReturned(cb?: Callback<LogRentReturned>): EventEmitter
        LogRentReturned(options?: EventOptions, cb?: Callback<LogRentReturned>): EventEmitter

        LogSettings(cb?: Callback<LogSettings>): EventEmitter
        LogSettings(options?: EventOptions, cb?: Callback<LogSettings>): EventEmitter

        LogSponsor(cb?: Callback<LogSponsor>): EventEmitter
        LogSponsor(options?: EventOptions, cb?: Callback<LogSponsor>): EventEmitter

        LogStakeholderPaid(cb?: Callback<LogStakeholderPaid>): EventEmitter
        LogStakeholderPaid(options?: EventOptions, cb?: Callback<LogStakeholderPaid>): EventEmitter

        LogStateChange(cb?: Callback<LogStateChange>): EventEmitter
        LogStateChange(options?: EventOptions, cb?: Callback<LogStateChange>): EventEmitter

        LogUpdateTimeHeldLimit(cb?: Callback<LogUpdateTimeHeldLimit>): EventEmitter
        LogUpdateTimeHeldLimit(options?: EventOptions, cb?: Callback<LogUpdateTimeHeldLimit>): EventEmitter

        LogWinnerKnown(cb?: Callback<LogWinnerKnown>): EventEmitter
        LogWinnerKnown(options?: EventOptions, cb?: Callback<LogWinnerKnown>): EventEmitter

        LogWinningsPaid(cb?: Callback<LogWinningsPaid>): EventEmitter
        LogWinningsPaid(options?: EventOptions, cb?: Callback<LogWinningsPaid>): EventEmitter

        MetaTransactionExecuted(cb?: Callback<MetaTransactionExecuted>): EventEmitter
        MetaTransactionExecuted(options?: EventOptions, cb?: Callback<MetaTransactionExecuted>): EventEmitter

        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter
    }

    once(event: 'LogContractLocked', cb: Callback<LogContractLocked>): void
    once(event: 'LogContractLocked', options: EventOptions, cb: Callback<LogContractLocked>): void

    once(event: 'LogLongestOwner', cb: Callback<LogLongestOwner>): void
    once(event: 'LogLongestOwner', options: EventOptions, cb: Callback<LogLongestOwner>): void

    once(event: 'LogNewOwner', cb: Callback<LogNewOwner>): void
    once(event: 'LogNewOwner', options: EventOptions, cb: Callback<LogNewOwner>): void

    once(event: 'LogPayoutDetails', cb: Callback<LogPayoutDetails>): void
    once(event: 'LogPayoutDetails', options: EventOptions, cb: Callback<LogPayoutDetails>): void

    once(event: 'LogQuestionPostedToOracle', cb: Callback<LogQuestionPostedToOracle>): void
    once(event: 'LogQuestionPostedToOracle', options: EventOptions, cb: Callback<LogQuestionPostedToOracle>): void

    once(event: 'LogRentCollection', cb: Callback<LogRentCollection>): void
    once(event: 'LogRentCollection', options: EventOptions, cb: Callback<LogRentCollection>): void

    once(event: 'LogRentReturned', cb: Callback<LogRentReturned>): void
    once(event: 'LogRentReturned', options: EventOptions, cb: Callback<LogRentReturned>): void

    once(event: 'LogSettings', cb: Callback<LogSettings>): void
    once(event: 'LogSettings', options: EventOptions, cb: Callback<LogSettings>): void

    once(event: 'LogSponsor', cb: Callback<LogSponsor>): void
    once(event: 'LogSponsor', options: EventOptions, cb: Callback<LogSponsor>): void

    once(event: 'LogStakeholderPaid', cb: Callback<LogStakeholderPaid>): void
    once(event: 'LogStakeholderPaid', options: EventOptions, cb: Callback<LogStakeholderPaid>): void

    once(event: 'LogStateChange', cb: Callback<LogStateChange>): void
    once(event: 'LogStateChange', options: EventOptions, cb: Callback<LogStateChange>): void

    once(event: 'LogUpdateTimeHeldLimit', cb: Callback<LogUpdateTimeHeldLimit>): void
    once(event: 'LogUpdateTimeHeldLimit', options: EventOptions, cb: Callback<LogUpdateTimeHeldLimit>): void

    once(event: 'LogWinnerKnown', cb: Callback<LogWinnerKnown>): void
    once(event: 'LogWinnerKnown', options: EventOptions, cb: Callback<LogWinnerKnown>): void

    once(event: 'LogWinningsPaid', cb: Callback<LogWinningsPaid>): void
    once(event: 'LogWinningsPaid', options: EventOptions, cb: Callback<LogWinningsPaid>): void

    once(event: 'MetaTransactionExecuted', cb: Callback<MetaTransactionExecuted>): void
    once(event: 'MetaTransactionExecuted', options: EventOptions, cb: Callback<MetaTransactionExecuted>): void
}
