import {
    AppBar,
    Box,
    Drawer,
    Grid,
    IconButton,
    paperClasses,
    styled,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { makeStyles, MaskColorVar } from '@masknet/theme'
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import Color from 'color'
import { ErrorBoundary } from '@masknet/shared'
import { memo, Suspense, useContext, useMemo, useState } from 'react'
import { DashboardContext } from './context'
import { Navigation } from './Navigation'
import { MaskBannerIcon, MaskNotSquareIcon } from '@masknet/icons'
import { FeaturePromotions } from './FeaturePromotions'
import { useLocation } from 'react-router-dom'
import { RoutePaths } from '../../type'

const featurePromotionsEnabled = [RoutePaths.Wallets, RoutePaths.WalletsTransfer, RoutePaths.WalletsHistory]

const Root = styled(Grid)(({ theme }) => ({
    backgroundColor: MaskColorVar.primaryBackground,
}))

const LeftContainer = styled(Grid)(({ theme }) => ({
    height: '100vh',
    [theme.breakpoints.up('lg')]: {
        // Just meet the design size
        minWidth: 232,
    },
}))

export interface DashboardFrameProps extends React.PropsWithChildren<{}> {}

export const DashboardFrame = memo((props: DashboardFrameProps) => {
    const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'))
    const [navigationExpanded, setNavigationExpanded] = useState(true)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const context = useMemo(
        () => ({
            drawerOpen,
            expanded: navigationExpanded,
            toggleNavigationExpand: () => setNavigationExpanded((e) => !e),
            toggleDrawer: () => setDrawerOpen((e) => !e),
        }),
        [drawerOpen, navigationExpanded],
    )
    return (
        <DashboardContext.Provider value={context}>
            <Root container>
                {isLargeScreen && (
                    <LeftContainer item xs={2}>
                        <Navigation />
                    </LeftContainer>
                )}
                <Grid container direction="column" item xs={isLargeScreen ? 10 : 12}>
                    <Suspense fallback={null}>
                        <ErrorBoundary>{props.children}</ErrorBoundary>
                    </Suspense>
                </Grid>
            </Root>
        </DashboardContext.Provider>
    )
})

const MaskLogo = styled(Grid)`
    flex-basis: 212px;
    max-width: 212px;
    & > svg {
        flex: 1;
    }
`

const MenuButton = styled(IconButton)(({ theme }) => ({
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
}))

const PageTitle = styled(Grid)(({ theme }) => ({
    minHeight: 40,
    alignItems: 'center',
    paddingLeft: theme.spacing(4.25),
    '& > h6': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.down('lg')]: {
        flex: 1,
    },
}))

const Containment = styled(Grid)(({ theme }) => ({
    maxWidth: '100%',
    display: 'flex',
    height: `calc(100vh - 64px)`,
    overflow: 'hidden',
}))

const NavigationDrawer = styled(Drawer)(({ theme }) => ({
    top: `${theme.mixins.toolbar.minHeight}px !important`,
    // https://github.com/mui-org/material-ui/issues/20012#issuecomment-770654893
    [`& > .${paperClasses.root}`]: {
        width: 232,
        top: theme.mixins.toolbar.minHeight,
        paddingTop: theme.spacing(7.5),
        background: new Color(theme.palette.background.paper).alpha(0.8).toString(),
        backdropFilter: 'blur(4px)',
    },
}))

const ShapeHelper = styled('div')(({ theme }) => ({
    padding: theme.spacing(3),
    paddingBottom: 0,
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 5,
    borderTopRightRadius: Number(theme.shape.borderRadius) * 5,
    backgroundColor: theme.palette.mode === 'dark' ? '#1B1E38' : MaskColorVar.secondaryBackground,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto',
}))

const ContentContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: Number(theme.shape.borderRadius) * 5,
    backgroundColor: 'transparent',
    minHeight: '100%',
    position: 'relative',
    '&:after': {
        content: '""',
        display: 'block',
        paddingTop: theme.spacing(3),
    },
}))

const useStyle = makeStyles()((theme) => ({
    toolbarGutters: {
        backgroundColor: MaskColorVar.primaryBackground,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(0),
        },
        [theme.breakpoints.down('lg')]: {
            paddingLeft: theme.spacing(1),
        },
    },
    shapeContainerWithBackground: {
        backgroundColor: theme.palette.background.paper,
    },
}))

export interface PageFrameProps extends React.PropsWithChildren<{}> {
    title: React.ReactNode | string
    primaryAction?: React.ReactNode
    noBackgroundFill?: boolean
}

export const PageFrame = memo((props: PageFrameProps) => {
    const location = useLocation()
    const left = typeof props.title === 'string' ? <Typography variant="h6">{props.title}</Typography> : props.title
    const right = props.primaryAction
    const isLargeScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'))
    const { drawerOpen, toggleDrawer } = useContext(DashboardContext)
    const showFeaturePromotions = featurePromotionsEnabled.some((path: string) => path === location.pathname)
    const mode = useTheme().palette.mode
    const { classes } = useStyle()

    return (
        <>
            <AppBar position="relative" color="inherit" elevation={0}>
                <Toolbar classes={{ gutters: classes.toolbarGutters }}>
                    {!isLargeScreen && (
                        <MaskLogo item container alignItems="center">
                            <MenuButton size="large" onClick={toggleDrawer}>
                                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
                            </MenuButton>
                            {mode === 'dark' ? <MaskBannerIcon /> : <MaskNotSquareIcon />}
                        </MaskLogo>
                    )}
                    <PageTitle item xs={isLargeScreen ? 12 : 10} container>
                        {left}
                        <Box sx={{ flex: 1 }} />
                        {right}
                    </PageTitle>
                </Toolbar>
            </AppBar>
            <Containment>
                {!isLargeScreen && (
                    <NavigationDrawer
                        open={drawerOpen}
                        onClose={toggleDrawer}
                        ModalProps={{
                            BackdropProps: {
                                sx: { background: 'transparent' },
                            },
                        }}
                        transitionDuration={300}
                        variant="temporary"
                        elevation={0}>
                        <Navigation onClose={toggleDrawer} />
                    </NavigationDrawer>
                )}
                <ShapeHelper>
                    <ContentContainer>
                        <ErrorBoundary>{props.children}</ErrorBoundary>
                    </ContentContainer>
                </ShapeHelper>
                {showFeaturePromotions ? <FeaturePromotions /> : null}
            </Containment>
        </>
    )
})
