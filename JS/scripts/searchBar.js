document.addEventListener("DOMContentLoaded", function() {
    function search() {
        querySelector= document.querySelector("#searchBar")
        const searchBar = document.getElementById('searchBar');
        console.log(searchBar);
        const listItems = document.querySelectorAll('.gallery');

        const entré = searchBar.value.toLowerCase();

        for (let i = 0; i < listItems.length; i++) {
            const texte = listItems[i].querySelector('.desc').textContent;
            if (texte.toLowerCase().indexOf(entré) == -1) {
                listItems[i].style.display = 'none';
            } else {
                listItems[i].style.display = 'block';
            }
        }
    }

    // Call the function
    search();
});