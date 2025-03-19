let currentMode = null;

function injectButtons() {
    const controls = document.querySelector('#movie_player .ytp-chrome-bottom .ytp-chrome-controls');
    if (!controls || document.querySelector('#custom-buttons')) return;

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'custom-buttons';
    buttonContainer.style.cssText = 'display: inline-block;';

    const modes = [
        { name: 'cover', label: '', icon: '<svg width="100%" height="100%" viewBox="-4.8 -4.8 33.60 33.60" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 15L12 20L17 15M7 9L12 4L17 9" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' },
        { name: 'fill', label: '', icon: '<svg width="100%" height="100%" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 7L4 12L9 17M15 7L20 12L15 17" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' }
    ];

    modes.forEach(mode => {
        const button = document.createElement('button');
        button.innerHTML = `${mode.icon} ${mode.label}`; // Иконка + текст
        button.className = 'ytp-button custom-btn';
        button.addEventListener('click', () => toggleVideoMode(mode.name));
        buttonContainer.appendChild(button);
    });

    controls.appendChild(buttonContainer);
}

function toggleVideoMode(mode) {
    const video = document.querySelector('#movie_player video');
    if (!video || !isFullScreen()) return;

    if (currentMode) {
        resetVideo(video);
        if (currentMode === mode) return;
    }

    video.style.transition = 'all 0.3s ease';
    const isWide = isUltrawide();

    if (mode === 'cover') {
        Object.assign(video.style, {
            objectFit: 'cover',
            width: isWide ? '100%' : '100%',
            height: '100%',
            position: 'relative'
        });
        currentMode = 'cover';
    } else if (mode === 'fill') {
        Object.assign(video.style, {
            objectFit: 'fill',
            width: '100%',
            height: '100vh',
            left: '0',
            position: 'relative'
        });
        currentMode = 'fill';
    }
}

function resetVideo(video) {
    if (!video) return;
    Object.assign(video.style, {
        transition: 'all 0.3s ease',
        objectFit: '',
        width: '',
        height: '',
        left: '',
        position: '',
        display: 'block'
    });
    currentMode = null;
    video.offsetHeight; // Триггер reflow
}

function isUltrawide() {
    return Math.abs(window.screen.width / window.screen.height - 21 / 9) < 0.1;
}

function isFullScreen() {
    return document.fullscreenElement || document.webkitFullscreenElement;
}

function initialize() {
    const checkPlayer = () => {
        const player = document.querySelector('#movie_player');
        if (player) injectButtons();
        else setTimeout(checkPlayer, 500);
    };

    window.addEventListener('load', checkPlayer);
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(event => {
        document.addEventListener(event, () => {
            if (!isFullScreen()) resetVideo(document.querySelector('#movie_player video'));
        });
    });
}

initialize();
