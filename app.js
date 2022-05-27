const $ = document;
const nameInput = $.getElementById('nameInput')
const authorInput = $.getElementById('authorInput')
const yearInput = $.getElementById('yearInput')
const categInput = $.getElementById('categInput')
const addBtn = $.getElementById('addBtn')
const booksTable = $.querySelector('.table_container table')
const showModalBtn = $.querySelector('.show_favorites')
const favoritesModal = $.querySelector('.favoriteModal')
const closeModalBtn = $.querySelector('.close_btn')
const modalOverlay = $.querySelector('.overlay')

function showModal() {
    favoritesModal.style.top = '30%'
    modalOverlay.style.display = 'block'
}
function hideModal() {
    favoritesModal.style.top = '-100%'
    modalOverlay.style.display = 'none'
}
showModalBtn.addEventListener('click',showModal)
closeModalBtn.addEventListener('click',hideModal)
modalOverlay.addEventListener('click',hideModal)
$.addEventListener('keydown',function(e) {
    if (e.key === 'Escape') {
        hideModal()
    }
})