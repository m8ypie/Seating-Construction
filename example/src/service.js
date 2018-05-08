var axios = require("axios")

const host = "http://localhost:1337"

export async function save(tableMap){
  const result = await axios.post(`${host}/seating`, tableMap)
  return {success:true}
}

export async function load(){
  const result = await axios.get(`${host}/seating`)
  console.log(result.data)
  return result.data
}