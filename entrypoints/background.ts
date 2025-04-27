import { KNOWN_ANUBIS_ORIGINS } from '../src/storage.js'
import { updateNetRules } from '../src/update-net-rules.js'

export default defineBackground(() => {
  KNOWN_ANUBIS_ORIGINS.watch(() => {
    updateNetRules().catch(console.error)
  })
  updateNetRules().catch(console.error)

  if (import.meta.env.DEV) {
    browser.declarativeNetRequest.onRuleMatchedDebug?.addListener((event) => {
      // eslint-disable-next-line no-console
      console.log('Rule matched', event)
    })
  }
})
