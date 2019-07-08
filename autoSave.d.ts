declare const autoSave: {
  wait?: number
  onSave: () => {}
  onBeforeSave?: () => boolean
  saveMessage?: string
  leading?: boolean
  maxWait?: number
  trailing?: boolean
}

export = autoSave
