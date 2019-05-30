import axios from 'axios'

export default {
  fetchUser() {
    return axios
      .get('http://jsonplaceholder.typicode.com/users/1')
      .then(res => {
        console.log(11111)
        return res.data
      })
      .catch(error => console.log(error))
  }
}
