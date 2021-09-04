import type { MarketInfo } from '../types'

export async function fetchMarketInfo(address: string, id: string, url: string) {
    const body = {
        query: `{
            market(id: "${address + '-' + id}") {
                teamSportsMarket {
                    homeTeamId
                    awayTeamId
                    endTime
                    winner
                    overUnderTotal
                    marketType
                }
                mmaMarket {
                    homeFighterId
                    awayFighterId
                    awayFighterName
                    homeFighterName
                    endTime
                    winner
                    marketType
                }
                cryptoMarket{
                    endTime
                    winner
                    marketType
                }
            }
            nflMarket(id: "${address.toLowerCase() + '-' + id}"){
                homeTeamId
                awayTeamId
                homeTeamName
                awayTeamName
                endTime
                winner
                overUnderTotal
                marketType
            }
        }`,
    }
    const response = await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
    })
    const result = (await response.json())?.data
    return { ...result.market, nflMarket: result.nflMarket } as MarketInfo
}
