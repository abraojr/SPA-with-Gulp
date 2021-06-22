(function () {
    function markLinkAsSelected(hash) {
        const links = document.querySelectorAll(`[wm-link]`);
        links.forEach(link => link.classList.remove('selected'));

        const link = document.querySelector(`[wm-link='${hash}']`);
        link.classList.add('selected');
    }

    function browseViaAjax(hash) {
        if (!hash) return

        const link = document.querySelector(`[wm-link='${hash}']`);
        const destination = document.querySelector('[wm-link-destination]');

        const url = hash.substring(1);
        fetch(url)
            .then(resp => resp.text())
            .then(html => {
                destination.innerHTML = html;
                markLinkAsSelected(hash);
            });
    }

    function configLinks() {
        document.querySelectorAll('[wm-link]')
            .forEach(link => {
                link.href = link.attributes['wm-link'].value;
            });
    }

    function initialBrowsing() {
        if (location.hash) {
            browseViaAjax(location.hash);
        } else {
            const firstLink = document.querySelector('[wm-link]');
            browseViaAjax(firstLink.hash);
        }
    }

    window.onhashchange = e => browseViaAjax(location.hash);

    configLinks();
    initialBrowsing();
})()