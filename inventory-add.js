 import { items } from "./inventory-items.js"

const inventoryName =  document.getElementById('inventory-name')
const inventoryPrice =  document.getElementById('inventory-price')
const inventoryQuantity =  document.getElementById('inventory-quantity')
const selectedCategory = document.getElementById('select-category')
const addComment = document.getElementById('add-comment')


function showMistake() {
    addComment.classList.add('wrong')
    addComment.textContent = 'Fill spaces correctly!!!'

    setTimeout(() => {
        addComment.style.display = 'none'
    }, 3000)
}

function showSuccessfulInput() {
    addComment.classList.add('right')
    addComment.textContent = 'Added'

    setTimeout(() => {
        addComment.style.display = 'none'
    }, 3000)
}

document.getElementById('add-button').addEventListener('click', () => {
    let addName = inventoryName.value
    let addPrice = Number(inventoryPrice.value)
    let addQuantity = Number(inventoryQuantity.value)
    let category = selectedCategory.value
    let matchingItem

    if(addName && addPrice && addQuantity) {
        //checking for matching item
        items.forEach(item => {
            if(item.name.toLowerCase() === addName.toLowerCase() && item.price.toFixed(2) === addPrice.toFixed(2)) {
                matchingItem = item
            } 
        })

        if(matchingItem) {
            matchingItem.quantity += addQuantity
        } else  {
            items.push({
                name: addName, 
                price: addPrice,
                quantity: addQuantity,
                category
            })
        }

        inventoryName.value = ''
        inventoryPrice.value = ''
        inventoryQuantity.value = ''
        localStorage.setItem('items', JSON.stringify(items))

        showSuccessfulInput()
    } else {
        showMistake()
    }
})


