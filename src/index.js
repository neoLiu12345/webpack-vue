// import 'bootstrap'
import calc from './calc'
import './home.scss'
import './public-a'
import './public-b'

console.log('DEV: ', DEV)
if(DEV === 'dev') {
    console.log(DEV)
}

console.log('home sad asda1231f')

import logo from './logo.png'
let image = new Image()
image.src = logo
let bodyDom = document.getElementsByTagName('body')[0]
bodyDom.appendChild(image)

console.log(calc.sum(2, 3))


