
// import './public-a'
// import './public-b'

require('./scss.scss')

// let xhr = new XMLHttpRequest()
// xhr.open('GET', '/api/user', true)
// xhr.onload = () => {
//     console.log(xhr.response)
// }
// xhr.send()

let button = document.createElement('button')
button.innerHTML = '懒加s载js'
button.addEventListener('click', function() {
    import(/* webpackChunkName: 'ys' */ './ys.js').then(data => {
        console.log(data.default)
    })
    console.log(8989)
})

document.body.appendChild(button)