// ==UserScript==
// @name         YTDL.JS!
// @namespace    http://qweren.neocities.org/
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png
// @version      Release
// @description  Adds a download button (That actually looks good) that shows a popup menu with download options and redirects to yt1s.com.
// @author       Level Five
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// @run-at       document-body
// @license      CC-BY-NC-SA
// ==/UserScript==

(function() {
    // Function to create and show the download options popup
    function showDownloadOptionsPopup() {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = '#1e1e1e';
        popup.style.padding = '20px';
        popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        popup.style.borderRadius = '10px';
        popup.style.zIndex = '9999';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = 'red';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            popup.remove();
        });

        const videoButton = document.createElement('button');
        videoButton.textContent = 'Download Video';
        videoButton.style.margin = '5px';
        videoButton.style.backgroundColor = '#d32f2f';
        videoButton.style.color = 'white';
        videoButton.style.border = 'none';
        videoButton.style.padding = '5px 10px';
        videoButton.style.borderRadius = '5px';
        videoButton.addEventListener('click', () => {
            const currentLink = encodeURIComponent(window.location.href);
            const redirectURL = `https://yt1s.com/en/youtube-to-mp4?q=${currentLink}`;
            window.open(redirectURL, '_blank');
            popup.remove();
        });

        const audioButton = document.createElement('button');
        audioButton.textContent = 'Download Audio';
        audioButton.style.margin = '5px';
        audioButton.style.backgroundColor = '#d32f2f';
        audioButton.style.color = 'white';
        audioButton.style.border = 'none';
        audioButton.style.padding = '5px 10px';
        audioButton.style.borderRadius = '5px';
        audioButton.addEventListener('click', () => {
            const currentLink = encodeURIComponent(window.location.href);
            const redirectURL = `https://yt1s.com/en/youtube-to-mp3?q=${currentLink}`;
            window.open(redirectURL, '_blank');
            popup.remove();
        });

        popup.appendChild(closeButton);
        popup.appendChild(videoButton);
        popup.appendChild(audioButton);
        document.body.appendChild(popup);
    }

    // Function to append the button and tooltip
    function appendButtonAndTooltip() {
        const menu = document.getElementById("top-level-buttons-computed");

        // Remove existing download button
        const existingDownloadButton = document.querySelector('.style-scope.ytd-download-button-renderer');
        if (existingDownloadButton) existingDownloadButton.remove();

        const containerDiv = document.createElement('div');
        containerDiv.className = 'tooltip-container';

        const newButton = document.createElement('button');
        newButton.style.marginLeft = "8px";
        newButton.innerHTML = `<svg height='24' viewBox='0 0 24 24' width='24' focusable='false'><path fill='white' d='M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z'></path></svg>`;
        newButton.setAttribute("id", "download-button");

        const tooltip = document.createElement('tp-yt-paper-tooltip');
        tooltip.setAttribute('fit-to-visible-bounds', '');
        tooltip.setAttribute('offset', '8');
        tooltip.style = 'inset: 44px auto auto 187.258px;';
        tooltip.textContent = 'Download';
        tooltip.classList.remove('hidden');
        containerDiv.appendChild(tooltip);

        newButton.addEventListener('click', () => showDownloadOptionsPopup());
        newButton.className = 'yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading ';

        containerDiv.appendChild(newButton);
        menu.appendChild(containerDiv);
    }

    // Append the button and tooltip when the page loads
    setTimeout(appendButtonAndTooltip, 5000);

    setInterval(function () {
        if(document.getElementById("container")){
            if(!document.getElementById("download-button")){
                appendButtonAndTooltip();
            }
        }
    }, 6000);
})();

