import { formatAmount, formatBalance, useAugurConstants } from '@masknet/web3-shared'
import BigNumber from 'bignumber.js'
import { useAsyncRetry } from 'react-use'
import { FALLBACK_SWAP_FEE, SWAP_FEE_DECIMALS } from '../constants'
import { useAmmFactory } from '../contracts/useAmmFactory'
import { useMmaLinkMarketFactory } from '../contracts/useMmaLinkMarketFactory'
import { useNFLMarketFactory } from '../contracts/useNFLMarketFactory'
import { useSportsLinkMarketFactory } from '../contracts/useSportsLinkMarketFactory'
import { PluginAugurRPC } from '../messages'
import { Market, MarketType, SportType } from '../types'
import { getFullTeamName, getSport, getTeam } from '../utils'
import { deriveMmaMarketInfo } from '../utils/mmaMarket'
import { deriveSportMarketInfo } from '../utils/sportMarket'

export function useFetchMarket(address: string, id: string, link: string, cache: RequestCache = 'default') {
    const { AMM_FACTORY_ADDRESS, GRAPH_URL } = useAugurConstants()
    const ammMarekFactoryContract = useAmmFactory(AMM_FACTORY_ADDRESS ?? '')
    const sportLinkMarketFactoryContract = useSportsLinkMarketFactory(address)
    const mmaMarketFactoryContract = useMmaLinkMarketFactory(address)
    const nflMarketFactoryContract = useNFLMarketFactory(address)

    return useAsyncRetry(async () => {
        if (
            !sportLinkMarketFactoryContract ||
            !ammMarekFactoryContract ||
            !mmaMarketFactoryContract ||
            !nflMarketFactoryContract ||
            !GRAPH_URL
        )
            return

        let rawSwapFee
        try {
            rawSwapFee = await ammMarekFactoryContract.methods.getSwapFee(address, id).call()
        } catch {
            rawSwapFee = formatAmount(FALLBACK_SWAP_FEE / 100, SWAP_FEE_DECIMALS)
        }

        const swapFee = formatBalance(new BigNumber(rawSwapFee).multipliedBy(100).toFixed(2), SWAP_FEE_DECIMALS)
        const ammExchange = await PluginAugurRPC.fetchAmmExchange(address, id, GRAPH_URL, cache)
        const marketInfo = await PluginAugurRPC.fetchMarketInfo(address, id, GRAPH_URL)

        if (!swapFee || !marketInfo) return

        if (marketInfo.teamSportsMarket && marketInfo.teamSportsMarket.length !== 0) {
            const teamSportsMarket = marketInfo.teamSportsMarket[0]
            const collateral = await sportLinkMarketFactoryContract.methods.collateral().call()
            const sportId = await sportLinkMarketFactoryContract.methods.sportId().call()
            const sport = getSport(sportId)
            const homeTeam = getTeam(teamSportsMarket.homeTeamId, sportId)
            const awayTeam = getTeam(teamSportsMarket.awayTeamId, sportId)
            const homeTeamName = getFullTeamName(homeTeam)
            const awayTeamName = getFullTeamName(awayTeam)
            const marketType = teamSportsMarket.marketType
            const overUnderTotal = teamSportsMarket.overUnderTotal
            const winner = teamSportsMarket.winner ?? ''
            const hasWinner = !!winner && !new BigNumber(winner).isZero()
            const endDate = new Date(Number.parseInt(teamSportsMarket.endTime, 10) * 1000)
            const [, shareTokens, , , , , , , initialOdds] = await sportLinkMarketFactoryContract.methods
                .getMarket(id)
                .call()

            const market = deriveSportMarketInfo(
                address,
                id,
                endDate,
                teamSportsMarket.awayTeamId,
                awayTeamName,
                teamSportsMarket.homeTeamId,
                homeTeamName,
                sport,
                marketType,
                shareTokens,
                overUnderTotal,
                winner,
                hasWinner,
            )
            return {
                ...market,
                marketType: MarketType.Sport,
                initialOdds,
                swapFee,
                collateral,
                link,
                ammExchange: { ...ammExchange, address: AMM_FACTORY_ADDRESS },
            } as Market
        } else if (marketInfo.mmaMarket && marketInfo.mmaMarket.length !== 0) {
            const mmaMarket = marketInfo.mmaMarket[0]
            const collateral = await mmaMarketFactoryContract.methods.collateral().call()
            const sportId = SportType.MMA
            const sport = getSport(sportId)
            const marketType = mmaMarket.marketType
            const winner = mmaMarket.winner ?? ''
            const hasWinner = !!winner && !new BigNumber(winner).isZero()
            const endDate = new Date(Number.parseInt(mmaMarket.endTime, 10) * 1000)
            const [, shareTokens, , , , , , , initialOdds] = await mmaMarketFactoryContract.methods.getMarket(id).call()

            const market = deriveMmaMarketInfo(
                address,
                id,
                endDate,
                mmaMarket.awayFighterId,
                mmaMarket.awayFighterName,
                mmaMarket.homeFighterId,
                mmaMarket.homeFighterName,
                sport,
                marketType,
                shareTokens,
                winner,
                hasWinner,
            )
            return {
                ...market,
                marketType: MarketType.Mma,
                initialOdds,
                swapFee,
                collateral,
                link,
                ammExchange: { ...ammExchange, address: AMM_FACTORY_ADDRESS },
            } as Market
        } else if (marketInfo.nflMarket && marketInfo.nflMarket.length !== 0) {
            const nflMarket = marketInfo.nflMarket[0]
            const collateral = await nflMarketFactoryContract.methods.collateral().call()
            const sportEvent = await nflMarketFactoryContract.methods.getSportsEventByIndex(id).call()
            const [, , , estimatedStartTime, homeTeamId, awayTeamId, homeTeamName, awayTeamName] = sportEvent._event
            const [, shareTokens, winner, , , , , , initialOdds] = await nflMarketFactoryContract.methods
                .getMarket(id)
                .call()
            const sportId = SportType.NFL
            const sport = getSport(sportId)
            const marketType = nflMarket.marketType
            console.log(ammExchange)
            const hasWinner = !!winner && !new BigNumber(winner).isZero()
            const endDate = new Date(Number.parseInt(estimatedStartTime, 10) * 1000)

            const market = deriveSportMarketInfo(
                address,
                id,
                endDate,
                awayTeamId,
                awayTeamName,
                homeTeamId,
                homeTeamName,
                sport,
                marketType,
                shareTokens,
                nflMarket.overUnderTotal,
                winner,
                hasWinner,
            )

            return {
                ...market,
                marketType: MarketType.Mma,
                initialOdds,
                swapFee,
                collateral,
                link,
                ammExchange: { ...ammExchange, address: AMM_FACTORY_ADDRESS },
            } as Market
        } else if (marketInfo.cryptoMarket) {
        }
        return
    }, [address, id])
}
