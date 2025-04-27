import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: [
      'storage',
      'declarativeNetRequest',
      ...(process.env.DEV ? ['declarativeNetRequestFeedback'] : []),
    ],
    browser_specific_settings: {
      gecko: {
        id: 'fuck-anubis@tei.su',
        strict_min_version: '102.0',
      },
    }
  },
})
