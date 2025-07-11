// sta c/script.js 
// Global state variables 
let inventory = []; 
let totalProfit = 0; 
let totalLoss = 0; 
let editingItemId = null; // To keep track of the item being edited 
 
// DOM Elements 
// Naviga on 
const navAddItemBtn = document.getElementById('navAddItem'); 
const navInventoryViewBtn = document.getElementById('navInventoryView'); 
const navStockModifica onBtn = document.getElementById('navStockModification'); 
const navBu ons = document.querySelectorAll('.nav-button'); 
// Screens 
const addItemScreen = document.getElementById('addItemScreen'); 
const inventoryViewScreen = document.getElementById('inventoryViewScreen'); 
const stockModificationScreen = document.getElementById('stockModificationScreen'); 
// Add Item Screen Elements 
const itemForm = document.getElementById('itemForm'); 
const itemIdInput = document.getElementById('itemId'); 
const itemNameInput = document.getElementById('itemName'); 
const itemQuan tyInput = document.getElementById('itemQuantity'); 
const itemPriceInput = document.getElementById('itemPrice'); // Now "Cost Price" 
const saveItemBtn = document.getElementById('saveItemBtn'); 
const clearFormBtn = document.getElementById('clearFormBtn'); 
// Inventory View Screen Elements 
const totalUniqueItemsDisplay = document.getElementById('totalUniqueItems'); 
const totalQuantityDisplay = document.getElementById('totalQuantity'); 
const totalValuationDisplay = document.getElementById('totalValuation'); 
const inventorySearchBar = document.getElementById('inventorySearchBar'); 
const inventoryList = document.getElementById('inventoryList'); 
const noItemsMessage = document.getElementById('noItemsMessage'); 
// Stock Modifica on Screen Elements 
const stockModificationForm = document.getElementById('stockModificationForm'); 
const modifyItemIdSelect = document.getElementById('modifyItemId'); 
const modifyQuantityInput = document.getElementById('modifyQuantity'); 
const reasonSaleRadio = document.getElementById('reasonSale'); 
const reasonDamageRadio = document.getElementById('reasonDamage'); 
const salePriceContainer = document.getElementById('salePriceContainer'); 
const salePriceInput = document.getElementById('salePrice'); 
const totalProfitDisplay = document.getElementById('totalProfitDisplay'); 
const totalLossDisplay = document.getElementById('totalLossDisplay'); 
// Global Message Box 
const globalMessageBox = document.getElementById('globalMessageBox'); 
/** 
* Shows a message in the global message box. 
* @param {string} message - The message to display. 
* @param {string} type - 'success', 'error', or 'info' to determine styling. 
*/ 
function showMessage(message, type) { 
globalMessageBox.textContent = message; 
globalMessageBox.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red
100', 'text-red-800', 'bg-blue-100', 'text-blue-800'); 
if (type === 'success') { 
globalMessageBox.classList.add('bg-green-100', 'text-green-800'); 
} else if (type === 'error') { 
globalMessageBox.classList.add('bg-red-100', 'text-red-800'); 
} else if (type === 'info') { 
         globalMessageBox.classList.add('bg-blue-100', 'text-blue-800'); 
    } 
    globalMessageBox.classList.remove('hidden'); 
    setTimeout(() => { 
        globalMessageBox.classList.add('hidden'); 
    }, 3000); // Hide a er 3 seconds 
} 
 
/** 
 * Saves the current inventory, total profit, and total loss to local storage. 
 */ 
function saveState() { 
    try { 
        localStorage.setItem('inventory', JSON.stringify(inventory)); 
        localStorage.setItem('totalProfit', totalProfit.toFixed(2)); 
        localStorage.setItem('totalLoss', totalLoss.toFixed(2)); 
    } catch (e) { 
        console.error("Error saving to local storage:", e); 
        showMessage("Error saving data locally.", 'error'); 
    } 
} 
 
/** 
 * Loads inventory, total profit, and total loss data from local storage. 
 */ 
function loadState() { 
    try { 
        const storedInventory = localStorage.getItem('inventory'); 
        if (storedInventory) { 
            inventory = JSON.parse(storedInventory); 
        } 
        const storedProfit = localStorage.getItem('totalProfit'); 
        if (storedProfit) { 
            totalProfit = parseFloat(storedProfit); 
        } 
        const storedLoss = localStorage.getItem('totalLoss'); 
        if (storedLoss) { 
            totalLoss = parseFloat(storedLoss); 
        } 
    } catch (e) { 
        console.error("Error loading from local storage:", e); 
        showMessage("Error loading data from local storage.", 'error'); 
    } 
} 
 
/** 
 * Renders the inventory items to the table on the Inventory View screen. 
 * @param {Array} itemsToDisplay - The array of items to render (can be filtered). 
 */ 
function renderInventory(itemsToDisplay = inventory) { 
    inventoryList.innerHTML = ''; // Clear exis ng list 
    if (itemsToDisplay.length === 0) { 
        noItemsMessage.classList.remove('hidden'); 
        return; 
    } else { 
        noItemsMessage.classList.add('hidden'); 
    } 
 
    itemsToDisplay.forEach(item => { 
        const row = document.createElement('tr'); 
        row.className = 'hover:bg-gray-50 transi on dura on-150 ease-in-out'; 
        row.innerHTML = ` 
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray
900">${item.id}</td> 
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.name}</td> 
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray
700">${item.quan ty}</td> 
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray
700">₹${item.price.toFixed(2)}</td> 
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"> 
                <button onclick="editItem('${item.id}')" 
                        class="text-blue-600 hover:text-blue-900 mr-3 px-3 py-1 rounded-md bg-blue
100 hover:bg-blue-200 transi on dura on-150 ease-in-out"> 
                    Edit 
                </button> 
                <button onclick="deleteItem('${item.id}')" 
                        class="text-red-600 hover:text-red-900 px-3 py-1 rounded-md bg-red-100 
hover:bg-red-200 transi on dura on-150 ease-in-out"> 
                    Delete 
                </button> 
            </td> 
        `; 
        inventoryList.appendChild(row); 
    }); 
} 
 
/** 
 * Calculates and displays overall inventory metrics. 
 */ 
function updateInventoryMetrics() { 
    const totalUnique = inventory.length; 
    const totalQty = inventory.reduce((sum, item) => sum + item.quantity, 0); 
    const totalVal = inventory.reduce((sum, item) => sum + (item.quan ty * item.price), 0); 
 
    totalUniqueItemsDisplay.textContent = totalUnique; 
    totalQuantityDisplay.textContent = totalQty; 
    totalValuationDisplay.textContent = `₹${totalVal.toFixed(2)}`; 
} 
 
/** 
 * Populates the item selec on dropdown on the Stock Modifica on screen. 
 */ 
function populateModifyItemSelect() { 
    modifyItemIdSelect.innerHTML = '<op on value="">-- Select an item --</op on>'; // Clear 
exis ng op ons 
    inventory.forEach(item => { 
        const option = document.createElement('option'); 
        option.value = item.id; 
        option.textContent = `${item.name} (ID: ${item.id}, Qty: ${item.quan ty}, Cost: 
₹${item.price.toFixed(2)})`; 
        modifyItemIdSelect.appendChild(option); 
    }); 
} 
 
/** 
 * Updates the profit and loss displays. 
 */ 
function updateFinancialSummary() { 
    totalProfitDisplay.textContent = `₹${totalProfit.toFixed(2)}`; 
    totalLossDisplay.textContent = `₹${totalLoss.toFixed(2)}`; 
} 
 
/** 
 * Handles screen switching logic. 
 * @param {string} screenId - The ID of the screen to show. 
 */ 
function showScreen(screenId) { 
    // Hide all screens 
    document.querySelectorAll('.screen').forEach(screen => { 
        screen.classList.remove('ac ve'); 
    }); 
 
    // Deac vate all nav bu ons 
    navButtons.forEach(buttonon => { 
        button.classList.remove('active'); 
    }); 
 
    // Show the selected screen and ac vate its nav bu on 
    document.getElementById(screenId).classList.add('active'); 
    if (screenId === 'addItemScreen') navAddItemBtn.classList.add('active'); 
    if (screenId === 'inventoryViewScreen') { 
        navInventoryViewBtn.classList.add('active'); 
        renderInventory(); // Re-render inventory when this screen is ac ve 
        updateInventoryMetrics(); // Update metrics when this screen is ac ve 
        inventorySearchBar.value = ''; // Clear search bar on screen switch 
    } 
    if (screenId === 'stockModifica onScreen') { 
        navStockModifica onBtn.classList.add('active'); 
        populateModifyItemSelect(); // Populate dropdown when this screen is ac ve 
        updateFinancialSummary(); // Update financial summary 
        modifyQuantityInput.value = ''; // Clear quan ty input 
        reasonSaleRadio.checked = true; // Default to sale 
        toggleSalePriceInput(); // Show/hide sale price input 
    } 
    clearForm(); // Clear the add/edit form when switching screens 
} 
 
// Event Listeners for Naviga on 
navAddItemBtn.addEventListener('click', () => showScreen('addItemScreen')); 
navInventoryViewBtn.addEventListener('click', () => showScreen('inventoryViewScreen')); 
navStockModifica onBtn.addEventListener('click', () => 
showScreen('stockModifica onScreen')); 
 
/** 
 * Handles the submission of the item form (add or edit). 
 * @param {Event} event - The form submission event. 
 */ 
itemForm.addEventListener('submit', function(event) { 
    event.preventDefault(); // Prevent default form submission 
 
    const id = itemIdInput.value.trim(); 
    const name = itemNameInput.value.trim(); 
    const quan ty = parseInt(itemQuantityInput.value); 
    const price = parseFloat(itemPriceInput.value); 
 
    // Basic valida on 
    if (!id || !name || isNaN(quan ty) || quan ty < 0 || isNaN(price) || price < 0) { 
        showMessage('Please fill in all fields with valid posi ve values.', 'error'); 
        return; 
    } 
 
    if (editingItemId) { 
        // Edi ng exis ng item 
        const itemIndex = inventory.findIndex(item => item.id === edi ngItemId); 
        if (itemIndex !== -1) { 
            // Check if ID was changed and if new ID is unique 
            if (edi ngItemId !== id && inventory.some(item => item.id === id)) { 
                showMessage('Item ID already exists. Please use a unique ID.', 'error'); 
                return; 
            } 
            inventory[itemIndex].id = id; // Update ID if changed 
            inventory[itemIndex].name = name; 
            inventory[itemIndex].quan ty = quan ty; 
            inventory[itemIndex].price = price; 
            showMessage('Item updated successfully!', 'success'); 
        } 
        editingItemId = null; // Reset edi ng state 
        saveItemBtn.textContent = 'Add Item'; // Change bu on back 
        itemIdInput.removeA ribute('readonly'); // Make ID editable again 
    } else { 
        // Adding new item 
        // Check for unique ID when adding a new item 
        if (inventory.some(item => item.id === id)) { 
            showMessage('Item ID already exists. Please use a unique ID.', 'error'); 
            return; 
        } 
 
        const newItem = { 
            id: id, 
            name: name, 
            quan ty: quan ty, 
            price: price // This is the cost price 
        }; 
        inventory.push(newItem); 
        showMessage('Item added successfully!', 'success'); 
    } 
 
    clearForm(); 
    saveState(); 
    renderInventory(); // Re-render the full inventory (in case we switch back) 
    updateInventoryMetrics(); // Update metrics 
    populateModifyItemSelect(); // Update dropdown 
}); 
 
/** 
 * Clears the form fields on the Add Item screen and resets edi ng state. 
 */ 
function clearForm() { 
    itemIdInput.value = ''; 
    itemNameInput.value = ''; 
    itemQuantityInput.value = ''; 
    itemPriceInput.value = ''; 
    editingItemId = null; 
    saveItemBtn.textContent = 'Add Item'; 
    itemIdInput.removeA ribute('readonly'); // Ensure ID is editable for new entries 
    itemNameInput.focus(); // Focus on the first input field 
} 
 
// Event listener for the clear form bu on 
clearFormBtn.addEventListener('click', clearForm); 
 
/** 
 * Populates the form with data of an item to be edited. 
 * @param {string} id - The ID of the item to edit. 
 */ 
function editItem(id) { 
    const itemToEdit = inventory.find(item => item.id === id); 
    if (itemToEdit) { 
        itemIdInput.value = itemToEdit.id; 
        itemNameInput.value = itemToEdit.name; 
        itemQuan tyInput.value = itemToEdit.quan ty; 
        itemPriceInput.value = itemToEdit.price; 
        editingItemId = id; 
        saveItemBtn.textContent = 'Update Item'; 
        itemIdInput.setAttribute('readonly', 'true'); // Make ID read-only during edit 
        showScreen('addItemScreen'); // Switch to add item screen 
        itemNameInput.focus(); // Focus on the name input for quick edi ng 
        showMessage(`Editing item: ${itemToEdit.name}`, 'info'); 
    } 
} 
 
/** 
 * Deletes an item from the inventory. 
 * @param {string} id - The ID of the item to delete. 
 */ 
function deleteItem(id) { 
    const initialLength = inventory.length; 
    const deletedItem = inventory.find(item => item.id === id); 
    inventory = inventory.filter(item => item.id !== id); 
    if (inventory.length < ini alLength) { 
        showMessage(`Item "${deletedItem ? deletedItem.name : id}" deleted successfully!`, 
'success'); 
    } else { 
        showMessage('Item not found!', 'error'); 
    } 
    saveState(); 
    renderInventory(); // Re-render the full inventory 
    updateInventoryMetrics(); // Update metrics 
    populateModifyItemSelect(); // Update dropdown 
    clearForm(); // Clear the form if the deleted item was being edited 
} 
 
/** 
 * Filters inventory items based on search input on the Inventory View screen. 
 */ 
inventorySearchBar.addEventListener('input', function() { 
    const searchTerm = inventorySearchBar.value.toLowerCase().trim(); 
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.id.toLowerCase().includes(searchTerm) 
    ); 
    renderInventory(filteredItems); 
}); 
 
/** 
 * Toggles the visibility of the sale price input based on the selected reason. 
 */ 
function toggleSalePriceInput() { 
    if (reasonSaleRadio.checked) { 
        salePriceContainer.classList.remove('hidden'); 
        salePriceInput.setAttribute('required', 'true'); 
        // Set default sale price to item's cost price when selected item changes 
        const selectedItem = inventory.find(item => item.id === modifyItemIdSelect.value); 
        if (selectedItem) { 
            salePriceInput.value = selectedItem.price.toFixed(2); 
        } else { 
            salePriceInput.value = ''; 
        } 
    } else { 
        salePriceContainer.classList.add('hidden'); 
        salePriceInput.removeAttribute('required'); 
        salePriceInput.value = ''; 
    } 
} 
 
// Event listeners for reason radio bu ons 
reasonSaleRadio.addEventListener('change', toggleSalePriceInput); 
reasonDamageRadio.addEventListener('change', toggleSalePriceInput); 
 
// Event listener for item selec on change to update default sale price 
modifyItemIdSelect.addEventListener('change', toggleSalePriceInput); 
 
 
/** 
 * Handles the submission of the stock modifica on form. 
 * @param {Event} event - The form submission event. 
 */ 
stockModificationForm.addEventListener('submit', function(event) { 
    event.preventDefault(); 
 
    const selectedItemId = modifyItemIdSelect.value; 
    const quantityChange = parseInt(modifyQuan tyInput.value); 
    const changeReason = 
document.querySelector('input[name="changeReason"]:checked').value; 
    const salePrice = parseFloat(salePriceInput.value); 
 
    if (!selectedItemId) { 
        showMessage('Please select an item.', 'error'); 
        return; 
    } 
    if (isNaN(quan tyChange) || quan tyChange <= 0) { 
        showMessage('Please enter a valid posi ve quantity.', 'error'); 
        return; 
    } 
    if (changeReason === 'sale' && (isNaN(salePrice) || salePrice < 0)) { 
        showMessage('Please enter a valid sale price.', 'error'); 
        return; 
    } 
 
 
    const itemToModify = inventory.find(item => item.id === selectedItemId); 
 
    if (!itemToModify) { 
        showMessage('Selected item not found.', 'error'); 
        return; 
    } 
 
    if (quantityChange > itemToModify.quantity) { 
        showMessage('Cannot change more than available quantity.', 'error'); 
        return; 
    } 
 
    // Perform stock modifica on 
    itemToModify.quan ty -= quantityChange; 
 
    if (changeReason === 'sale') { 
        // Profit/Loss = (Sale Price - Cost Price) * Quan ty 
        const itemCostPrice = itemToModify.price; 
        const profitLossPerUnit = salePrice - itemCostPrice; 
        const transactionProfitLoss = profitLossPerUnit * quantityChange; 
 
        if (transac onProfitLoss >= 0) { 
            totalProfit += transactionProfitLoss; 
            showMessage(`Sold ${quan tyChange} of ${itemToModify.name} for 
₹${salePrice.toFixed(2)} each. Profit: ₹${transac onProfitLoss.toFixed(2)}`, 'success'); 
        } else { 
            totalLoss += Math.abs(transactionProfitLoss); 
            showMessage(`Sold ${quantityChange} of ${itemToModify.name} for 
₹${salePrice.toFixed(2)} each. Loss: ₹${Math.abs(transactionProfitLoss).toFixed(2)}`, 'info'); 
        } 
 
    } else if (changeReason === 'damage') { 
        totalLoss += (quantityChange * itemToModify.price); // Loss is based on cost price 
        showMessage(`Logged ${quantityChange} of ${itemToModify.name} as damaged. Loss: 
₹${(quan tyChange * itemToModify.price).toFixed(2)}`, 'info'); 
    } 
 
    // Remove item if quan ty drops to 0 or below 
    if (itemToModify.quan ty <= 0) { 
        inventory = inventory.filter(item => item.id !== selectedItemId); 
        showMessage(`${itemToModify.name} quantity reached zero and was removed from 
inventory.`, 'info'); 
    } 
 
    saveState(); 
populateModifyItemSelect(); // Re-populate dropdown to reflect new quan es or removed items 
updateFinancialSummary(); // Update profit/loss display 
updateInventoryMetrics(); // Update overall inventory metrics 
renderInventory(); // Re-render inventory table if ac ve 
modifyQuantityInput.value = ''; // Clear the quan ty input a er successful modifica on 
salePriceInput.value = ''; // Clear sale price input 
}); 
// Ini al load and render when the page loads 
document.addEventListener('DOMContentLoaded', () => { 
loadState(); 
showScreen('addItemScreen'); // Show the Add Item screen by default 
});
