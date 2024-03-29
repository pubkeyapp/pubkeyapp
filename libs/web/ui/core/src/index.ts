export * from './lib/solana.logo'
export * from './lib/ui-accordion'
export * from './lib/ui-action-icon'
export * from './lib/ui-back-button'
export * from './lib/ui-button'
export * from './lib/ui-copy'
export * from './lib/ui-copy.button'
export * from './lib/ui-dashboard-grid'
export * from './lib/ui-debug'
export * from './lib/ui-error'
export * from './lib/ui-error-loader'
export * from './lib/ui-full-page'
export * from './lib/ui-loader'
export * from './lib/ui-not-found'
export * from './lib/ui-tab-routes'
export * from './lib/ui-timestamp'
export * from './lib/ui-button'
export * from './lib/ui-link.explorers'
export * from './lib/ui-user.link'

export function getAvatarUrl(name: string) {
  return `https://source.boringavatars.com/pixel/400/${name}?colors=FEED5B,6260FF,29DBD1,C061F7,FF6F5B`
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}
