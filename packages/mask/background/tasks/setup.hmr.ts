import * as NewInstalled from './Cancellable/NewInstalled'
import * as InjectContentScript from './Cancellable/InjectContentScripts'
import * as InjectContentScriptMV3 from './Cancellable/InjectContentScripts-mv3'
import * as IsolatedDashboardBridge from './Cancellable/IsolatedDashboardBridge'
import * as CleanupProfileDatabase from './Cancellable/CleanProfileAndAvatar'

type CancelableJob = { default: (signal: AbortSignal) => void }
const CancelableJobs: CancelableJob[] = [
    NewInstalled,
    process.env.manifest === '2' ? InjectContentScript : InjectContentScriptMV3,
    IsolatedDashboardBridge,
    CleanupProfileDatabase,
]

const abort = new AbortController()
CancelableJobs.forEach((task) => task.default(abort.signal))
if (import.meta.webpackHot) {
    import.meta.webpackHot.dispose(() => abort.abort())
    import.meta.webpackHot.accept()
}
