import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vcnt7muc',
    dataset: 'production'
  },
  deployment: {
    appId: 'zfxsexabgp2xju167qligp8x',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
