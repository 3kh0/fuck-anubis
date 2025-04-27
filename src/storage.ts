export const KNOWN_ANUBIS_ORIGINS = storage.defineItem<string[]>('local:known-anubis-origins', {
  fallback: [],
})
