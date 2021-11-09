import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    Button,
    Grid,
    Tooltip,
    CircularProgress,
    Link,
} from '@mui/material'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import { makeStyles } from '@masknet/theme'
import { useI18N } from '../../../utils'
import { useState } from 'react'
import { useMarketBySlug } from '../hooks/useMarket'
import { Card as RCCard, Market, MarketState } from '../types'
import { CardDialog } from './cardDialog'
import {
    formatBalance,
    formatPercentage,
    isSameAddress,
    resolveAddressLinkOnExplorer,
    useChainId,
} from '@masknet/web3-shared-evm'
import { useBaseToken } from '../hooks/useBaseToken'
import BigNumber from 'bignumber.js'
import { FormattedAddress } from '@masknet/shared'
import { GiveawayPopup } from './giveaway'
import { MarketDescriptionIcon, MarketDescreptionPopup } from './marketDescription'
import { ExplorerIcon, TokenGiveawayIcon } from './icons'

const useStyles = makeStyles()((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    content: {
        width: '100%',
        height: 'var(--contentHeight)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 !important',
    },
    cards: {
        margin: '10px 0',
        border: `solid 2px ${theme.palette.divider}`,
    },
    cardMedia: {
        width: 140,
    },
    winnerCard: {
        borderColor: theme.palette.success.main,
    },
    loserCard: {
        borderColor: theme.palette.error.main,
    },
    cardContent: {
        width: '100%',
        padding: 8,
        '&:last-child': {
            paddingBottom: 8,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    background: {
        backgroundColor: theme.palette.action.disabled,
    },
    flexBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}))

const toLocale = (no: number) => {
    return no.toLocaleString()
}

interface MarketProps {
    link: string
    slug: string
}

interface MarketDetailsProps {
    market: Market
}

export function MarketView(props: MarketProps) {
    const { t } = useI18N()
    const { classes } = useStyles()

    const { value: market, error, loading, retry } = useMarketBySlug(props.slug)

    if (loading)
        return (
            <Typography color="textPrimary" textAlign="center">
                {t('loading')}
                <CircularProgress sx={{ mx: 1 }} color="primary" size={13} />
            </Typography>
        )

    if (error)
        return (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography color="textPrimary">{t('plugin_realitycards_error_something_went_wrong')}</Typography>
                <Button sx={{ marginTop: 1 }} size="small" onClick={retry}>
                    {t('retry')}
                </Button>
            </Box>
        )

    if (!market) return null
    return (
        <Card variant="outlined" className={classes.root} elevation={0}>
            <CardHeader
                title={market.name}
                titleTypographyProps={{ variant: 'h5', color: 'textPrimary' }}
                href={props.link}
                subheader={<MarketDetails market={market} />}
                subheaderTypographyProps={{ variant: 'body2' }}
            />

            <CardContent className={classes.content}>
                <Grid container direction="column">
                    {market.cards.map((card: RCCard) => (
                        <Grid item key={card.id}>
                            <CardView card={card} market={market} />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

function MarketDetails(props: MarketDetailsProps) {
    const { market } = props
    const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false)
    const [giveawayDialogOpen, setGiveawayDialogOpen] = useState(false)
    const chainId = useChainId()

    return (
        <Grid container wrap="nowrap" justifyContent="space-between" alignItems="center">
            <Grid item container justifyContent="space-between" alignItems="center" flex="1" wrap="nowrap">
                <Grid item container direction="column">
                    <Grid
                        item
                        onClick={() => {
                            setDescriptionDialogOpen(true)
                        }}>
                        <Link>
                            <MarketDescriptionIcon />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link
                            href={resolveAddressLinkOnExplorer(chainId, market.id)}
                            rel="noopener noreferrer"
                            target="_blank">
                            <ExplorerIcon />
                        </Link>
                    </Grid>
                    {!!market.giveawayText ? (
                        <Grid
                            item
                            onClick={() => {
                                setGiveawayDialogOpen(true)
                            }}>
                            <Link rel="noopener noreferrer" target="_blank">
                                <TokenGiveawayIcon />
                            </Link>
                        </Grid>
                    ) : null}
                    <Grid item>pot size</Grid>
                    <Grid item>
                        <Typography variant="body1" color="text.primary" component="span">
                            {toLocale(2554)}
                        </Typography>{' '}
                        USDC
                    </Grid>
                </Grid>
                <Grid item container direction="column">
                    <Grid item>average rentals</Grid>
                    <Grid item>12545</Grid>
                </Grid>
                <Grid item container direction="column">
                    <Grid item>closes in</Grid>
                    <Grid item>12545</Grid>
                </Grid>
            </Grid>
            <Grid item sx={{ textAlign: 'right' }}>
                open/ended
            </Grid>
            <MarketDescreptionPopup
                open={descriptionDialogOpen}
                market={market}
                onClose={() => setDescriptionDialogOpen(false)}
            />
            <GiveawayPopup open={giveawayDialogOpen} market={market} onClose={() => setGiveawayDialogOpen(false)} />
        </Grid>
    )
}

interface CardViewProps {
    card: RCCard
    market: Market
}

function CardView(props: CardViewProps) {
    const { card, market } = props
    const { t } = useI18N()
    const { classes } = useStyles()

    const [cardDialogOpen, setCardDialogOpen] = useState(false)
    const isWinner = isSameAddress(card.id, market.winningOutcome?.id ?? '')
    const token = useBaseToken()
    const priceHourly = new BigNumber(card.price).div(24).toFixed(2)
    const share = new BigNumber(card.price).div(market.sumOfAllPrices).toFixed(2)
    const ownerAddress = market.state === MarketState.Open ? card.originalNft.owner.id : card.longestOwner.id

    return (
        <Card
            className={`${classes.cards} ${
                isWinner ? classes.winnerCard : market.state === MarketState.Withdraw ? classes.loserCard : ''
            }`}>
            <CardActionArea
                sx={{ display: 'flex' }}
                onClick={() => (market.state === MarketState.Open ? setCardDialogOpen(true) : null)}>
                <CardMedia component="img" className={classes.cardMedia} image={card.image} alt={card.outcomeName} />
                <CardContent className={classes.cardContent}>
                    <Box>
                        <Typography variant="h6">{card.outcomeName}</Typography>
                        <Typography variant="body1" component="strong" sx={{ fontSize: '1.2rem' }} gutterBottom>
                            {formatBalance(priceHourly, token.decimals)}
                        </Typography>
                        <Typography variant="caption" component="span" gutterBottom>
                            {' '}
                            /{t('plugin_realitycards_hour')}
                        </Typography>
                    </Box>

                    <Grid container flexWrap="nowrap">
                        <Grid item container direction="column" flex={3}>
                            <Grid item>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
                                    {market.state === MarketState.Open
                                        ? t('plugin_realitycards_currently_owned_by')
                                        : t('plugin_realitycards_owned_by')}
                                </Typography>
                            </Grid>
                            <Grid item container direction="column">
                                <Grid item>
                                    <Typography variant="body1">
                                        <FormattedAddress address={ownerAddress} size={4} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {market.state !== MarketState.Withdraw ? (
                            <Grid item container direction="column" flex={2} alignItems="flex-end">
                                <Grid item container alignItems="center" justifyContent="flex-end" flexWrap="nowrap">
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
                                        {t('plugin_realitycards_winning_odds')}
                                    </Typography>
                                    <Tooltip
                                        title={t('plugin_realitycards_winning_odds_message')}
                                        arrow
                                        placement="top"
                                        PopperProps={{
                                            disablePortal: true,
                                        }}>
                                        <HelpRoundedIcon sx={{ p: 0, ml: 0.5, fontSize: '1rem' }} color="info" />
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" component="strong" sx={{ fontSize: '1.2rem' }}>
                                        {formatPercentage(share)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardDialog open={cardDialogOpen} market={market} card={card} onClose={() => setCardDialogOpen(false)} />
        </Card>
    )
}
