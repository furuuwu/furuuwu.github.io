function addCloseButton() {

    // Close button event listener
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-btn';
    closeButton.addEventListener('click', () => {
        window.location.href = '../../?show=blog';
    });
    document.body.appendChild(closeButton);
}
addCloseButton();