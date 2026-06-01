/** User-facing hint when Atlas rejects a local connection (IP whitelist, timeout, etc.). */
export function getMongoConnectionHint(error: unknown): string | null {
  const message = error instanceof Error ? error.message : String(error)

  if (/whitelist|server selection|ReplicaSetNoPrimary|ENOTFOUND|ETIMEDOUT/i.test(message)) {
    return (
      'Cannot reach MongoDB Atlas from this network. In MongoDB Atlas → Network Access, click ' +
      '"Add IP Address" → "Add Current IP Address" (or allow 0.0.0.0/0 for local dev only), then restart npm run dev.'
    )
  }

  return null
}
