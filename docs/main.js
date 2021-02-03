/** @type {ConstructorParameters<typeof import('../src/index')>[0]} */
const config = {

}

const pre = document.querySelector('pre')

const updatePre = () => pre.innerText = `require(5685499094).new(game:GetService('HttpService'):JSONDecode[[${JSON.stringify(config, null, '\t')}]])`

document.querySelector('#prefix').addEventListener('input', event => {
  if (event.target.value && event.target.value !== 't!') {
    config.prefix = event.target.value
  } else {
    delete config.prefix
  }
  updatePre()
})

document.querySelector('#permission').addEventListener('input', event => {
  if (event.target.value && parseInt(event.target.value) !== 0) {
    config.permission = parseInt(event.target.value)
  } else {
    delete config.permission
  }
  updatePre()
})
