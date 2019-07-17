import autoSave from '../autoSave'

function fetchData(call) {
  setTimeout(() => {
    call('peanut butter')
  }, 200)
}

test('直接保存 save 10 次', done => {
  let num = 0
  function callback(data) {
    num++
    if (num === 10) {
      done()
    }
  }
  const save = autoSave({
    wait: 2000,
    onSave: () => fetchData(callback)
  })
  for (let i = 0; i < 10; i++) {
    save.save()
  }
  const x = jest.fn(() => {})
  expect(x).toBeCalledTimes(1231)
})
