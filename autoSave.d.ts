type AutoSaveOptions = {
  wait?: number
  onSave: () => {}
  onBeforeSave?: () => boolean
  saveMessage?: string
  leading?: boolean
  maxWait?: number
  trailing?: boolean
}

export = (opts: AutoSaveOptions) => ({
  debouncedSave: () => {},
  save: () => {},
  cancel: () => {},
  flush: () => {},
  exit: () => {}
})
