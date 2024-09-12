import { items } from "./inventory-items.js"

const allItems = document.getElementById('all-items')
const searchInput = document.getElementById('search')


items.forEach(item => {
    allItems.innerHTML += `
        <tr>
            <td id="items-listed-name">${item.name}</td>
            <td>${Number(item.price).toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.category}</td>
        </tr>
    `
})

//searching for item in inventory
document.addEventListener('keyup', searchInventory)
const itemsListedNames = document.querySelectorAll('#items-listed-name')

function searchInventory() {
    const input = searchInput.value.toLowerCase()
    console.log(input);
    
   itemsListedNames.forEach(itemListedName => {
        if(itemListedName.textContent.toLowerCase().includes(input)) {
            itemListedName.parentNode.style.display = ''
            
        } else {
            itemListedName.parentNode.style.display = 'none'
        }
     
   })
}





