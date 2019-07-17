// // 简单的
// test('1 + 1', () => {
//   expect(1 + 1).toBe(2)
// })
// // 对象
// test('1 + 1', () => {
//   const data = {a: 1, b: 2}
//   expect(data).toEqual({a:1, b:2})
// })

// // 回调
// test('async', (done) => {
//   const callback = function () {
//     done()
//   }
//   callback()
// })
// no test

// const forEach = async (items, callback) => {
//   for (let index = 0; index < items.length; index++) {
//     console.log(callback, 'callback')
//     callback(items[index]);
//   }
// }

// test('a', () => {
//     const mockCallback = jest.fn(x => 42 + x);
//     forEach([0, 1], mockCallback);

//     // 此 mock 函数被调用了两次
//     expect(mockCallback.mock.calls.length).toBe(2);

//     // 第一次调用函数时的第一个参数是 0
//     expect(mockCallback.mock.calls[0][0]).toBe(0);

//     // 第二次调用函数时的第一个参数是 1
//     expect(mockCallback.mock.calls[1][0]).toBe(1);

//     // 第一次函数调用的返回值是 42
//     expect(mockCallback.mock.results[0].value).toBe(42);
// })

// test('auto save', async () => {
//     // const mockCallback = jest.fn(x => setTimeout(()=>  console.log('执行了'), 2000));
//     const mockCallback = jest.fn(new Promise((res, req)=> {
//       setTimeout(() => {
//         console.log('完成')
//         res('done')
//       }, 2000);
//     }));
//     await forEach([0, 1], mockCallback);

//     // 此 mock 函数被调用了两次
//     expect(mockCallback.mock.calls.length).toBe(2);
// })
// import {debounce} from 'lodash'

// test('the data is peanut butter', done => {
//   function callback(data) {
//     expect(data).toBe('peanut butter');
//     done();
//   }

//   fetchData(callback);
// });
