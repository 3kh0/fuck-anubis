import { KNOWN_ANUBIS_ORIGINS } from '../src/storage.js'

export default defineContentScript({
  matches: [
    'http://*/*',
    'https://*/*',
  ],
  async main() {
    const anubisVersion = document.querySelector('#anubis_version')
    if (!anubisVersion) return

    // eslint-disable-next-line no-console
    console.log('fuck anubis!!')

    const old = await KNOWN_ANUBIS_ORIGINS.getValue()
    if (!old.includes(location.hostname)) {
      KNOWN_ANUBIS_ORIGINS.setValue([...old, location.hostname])
      location.reload()
    }

    if (location.pathname === '/.within.website/x/cmd/anubis/api/pass-challenge') {
      const redir = new URL(location.href).searchParams.get('redir')
      location.href = redir ? new URL(redir, location.origin).href : '/'
    }
  },
})
