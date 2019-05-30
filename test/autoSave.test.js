// import {fetchData}  from './api/user.js';

import autoSave from '../autoSave'
import { testNameToKey } from 'jest-snapshot/build/utils'

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}
function fetchData(call) {
  setTimeout(() => {
    console.log('111111')
    call('peanut butter')
  }, 1000)
}

//   test('the data is peanut butter', (done) => {
//     function callback(data) {
//       expect(data).toBe('peanut butter');
//       done()
//     }
//     fetchData(callback);
//   });

test('自动保存', () => {
  function callback(data) {
    expect(data).toBe('peanut butter')
    done()
  }
  const save = autoSave({
    wait: 2000,
    onSave: () => fetchData(callback)
  })
  save.debouncedSave()
})
