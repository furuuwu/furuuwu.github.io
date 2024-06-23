
function loadHeader() {
    fetch('../parts/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            const imgElement = document.querySelector('.profile-pic');
            if (imgElement) {
                imgElement.src = '../stuff/anime-girl.jpeg';
            }
        }
        ).catch(error => console.error('Error loading header:', error));
}
loadHeader();