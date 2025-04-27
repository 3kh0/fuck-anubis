import { IS_FIREFOX } from './env.js'
import { KNOWN_ANUBIS_ORIGINS } from './storage.js'

const ALL_RESOURCE_TYPES = [
  'main_frame',
  'sub_frame',
  'stylesheet',
  'script',
  'image',
  'font',
  'object',
  'xmlhttprequest',
  'ping',
  'csp_report',
  'media',
  'websocket',
  'other',
] as Browser.declarativeNetRequest.ResourceType[]

if (!IS_FIREFOX) {
  ALL_RESOURCE_TYPES.push('webtransport' as Browser.declarativeNetRequest.ResourceType)
  ALL_RESOURCE_TYPES.push('webbundle' as Browser.declarativeNetRequest.ResourceType)
}

export async function updateNetRules() {
  const anubisOrigins = await KNOWN_ANUBIS_ORIGINS.getValue()

  const rules: Browser.declarativeNetRequest.Rule[] = []

  if (anubisOrigins.length > 0) {
    rules.push({
      id: 1,
      priority: 1,
      action: {
        type: 'modifyHeaders' as Browser.declarativeNetRequest.RuleActionType,
        requestHeaders: [
          { header: 'User-Agent', operation: 'set' as Browser.declarativeNetRequest.HeaderOperation, value: 'fuck anubis lol' },
        ],
      },
      condition: {
        requestDomains: anubisOrigins,
        resourceTypes: ALL_RESOURCE_TYPES,
        excludedResourceTypes: [],
      },
    })
  }

  await browser.declarativeNetRequest.updateDynamicRules({ removeRuleIds: rules.map(rule => rule.id) })
  await browser.declarativeNetRequest.updateDynamicRules({ addRules: rules })
}
