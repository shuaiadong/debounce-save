import autoSave from '../autoSave'

function fetchData(call) {
  setTimeout(() => {
    call('peanut butter')
  }, 200)
}

test('debouncedSave', done => {
  function callback(data) {
    done()
  }
  const save = autoSave({
    wait: 2000,
    onSave: () => fetchData(callback)
  })
  save.debouncedSave()
  save.debouncedSave()
  save.debouncedSave()
  save.debouncedSave()
  save.debouncedSave()
  save.debouncedSave()
  save.debouncedSave()
})
