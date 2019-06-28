import autoSave from '../autoSave'

function fetchData(call) {
  setTimeout(() => {
    call('peanut butter')
  }, 200)
}

test('before-return true', done => {
  let num = 0
  const mockCallback = jest.fn(function(data) {
    num++
    num === 1 && done()
  })

  const save = autoSave({
    wait: 200,
    onBeforeSave: () => {
      return true
    },
    onSave: () => fetchData(mockCallback)
  })
  for (let i = 0; i < 10; i++) {
    save.debouncedSave()
  }
})

test('before-return false', done => {
  let num = 0
  const mockCallback = jest.fn(function(data) {
    num++
    num === 1 && done()
  })

  const save = autoSave({
    wait: 200,
    onBeforeSave: () => {
      return false
    },
    onSave: () => fetchData(mockCallback)
  })

  for (let i = 0; i < 10; i++) {
    save.debouncedSave()
  }

  setTimeout(() => {
    num === 0 && done()
  }, 4000)
})
