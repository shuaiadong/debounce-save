import autoSave from '../autoSave'

function fetchData(call) {
  setTimeout(() => {
    call('peanut butter')
  }, 200)
}

test('cancel-debouncedSave', done => {
  let num = 0
  const mockCallback = jest.fn(function(data) {
    done()
  })

  const save = autoSave({
    wait: 200,
    onSave: () => fetchData(mockCallback)
  })
  for (let i = 0; i < 5; i++) {
    save.debouncedSave()
    console.log('cancel')
  }

  save.cancel()

  setTimeout(() => {
    num === 0 && done()
  }, 4000)
})

test('flush-debouncedSave', done => {
  let num = 0
  const mockCallback = jest.fn(function(data) {
    done()
  })

  const save = autoSave({
    wait: 200,
    onSave: () => fetchData(mockCallback)
  })
  for (let i = 0; i < 5; i++) {
    save.debouncedSave()
    console.log('flush')
  }

  save.flush()

  setTimeout(() => {
    num === 0 && done()
  }, 4000)
})

test('exit-debouncedSave', done => {
  let num = 0
  const mockCallback = jest.fn(function(data) {
    done()
  })

  const save = autoSave({
    wait: 200,
    onSave: () => fetchData(mockCallback)
  })
  for (let i = 0; i < 5; i++) {
    save.debouncedSave()
    console.log('anexitcel')
  }

  save.exit()

  setTimeout(() => {
    num === 0 && done()
  }, 4000)
})
