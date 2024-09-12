import { items } from "./inventory-items.js"

const allEditItems = document.getElementById('all-edit-items')


function renderEditPage() {
//displaying all items 
items.forEach(item => {
    allEditItems.innerHTML += `
        <tr id="${item.name}">
            <td>${item.name}</td>
            <td>${Number(item.price).toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.category} <button id="update-button">Update</button> <button id="delete-button">Delete</button></td>
        </tr>
    `
})


    //update buttons and their functions
    const updateButtons = document.querySelectorAll('#update-button')

    updateButtons.forEach(updateButton => {
        updateButton.addEventListener('click', () => {
        const updateButtonElement = updateButton.parentElement.parentElement

            let itemToUpdate
            let itemToUpdateId
            items.forEach((item,index) => {
                if(item.name === updateButtonElement.id) {
                    itemToUpdate = item  
                    itemToUpdateId = index              
                }
            })
        
            updateButtonElement.innerHTML = `
                <tr class="update-item">
                    <td><input id="update-item-name" type="text"></td>
                    <td><input id="update-item-price" type="text"</td>
                    <td><input id="update-item-quantity" type="text"</td>
                    <td>
                        <select id="update-item-category">
                            <option value="beverage">beverage</option>
                            <option value="cooking">cooking</option>
                            <option value="bathing">bathing </option>
                            <option value="washing">washing</option>
                            <option value="brushing">brushing</option>
                            <option value="provision">provision</option>
                            <option value="sweeping">sweeping</option>
                            <option value="rubber">rubber</option>
                        </select>
                        <button id="save-button" >Save</button>
                    </td>
                </tr>
            `
            document.getElementById('update-item-name').value = itemToUpdate.name
            document.getElementById('update-item-price').value = itemToUpdate.price
            document.getElementById('update-item-quantity').value = itemToUpdate.quantity
            document.getElementById('update-item-category').value = itemToUpdate.category

            const saveButtons = document.querySelectorAll('#save-button')

            saveButtons.forEach(saveButton => {
                saveButton.addEventListener('click', () => {
                    const newName = document.getElementById('update-item-name').value
                    const newPrice = document.getElementById('update-item-price').value
                    const newQuantity = document.getElementById('update-item-quantity').value
                    const newCategory = document.getElementById('update-item-category').value
                    
                    items[itemToUpdateId] = {
                        name: newName, 
                        price: newPrice,
                        quantity: newQuantity, 
                        category: newCategory
                    }
                    localStorage.setItem('items', JSON.stringify(items))
                    
                    allEditItems.innerHTML = `
                        <tr>
                            <th>Name</th>
                            <th>Price($)</th>
                            <th>Quantity</th>
                            <th>Category</th>
                        </tr>
                    `
                    renderEditPage()
                })
            })
        })
    })


    //delete buttons and their functions 
    const deleteButtons = document.querySelectorAll('#delete-button')

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const deleteButtonElement = deleteButton.parentNode.parentNode

            items.forEach((item,index) => {
                if(item.name === deleteButtonElement.id) {
                    items.splice(index, 1)
                    localStorage.setItem('items', JSON.stringify(items))
                }
            })
            deleteButtonElement.remove()
        })
    })
}


renderEditPage()
