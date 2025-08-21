async function verificarSitioConGoogleSafeBrowsing(url) {
    const apiKey = "AIzaSyBDxjcMNrl3_EzpGQwFi1q2H5p22T9B2zo"; // Ponga su API key real
    const endpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    const body = {
        client: {
            clientId: "safeweb-guard-extension",
            clientVersion: "1.0"
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
        }
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        console.log("Análisis Google Safe Browsing:", result);

        return result && result.matches ? true : false;
    } catch (error) {
        console.error("Error al conectar con Safe Browsing:", error);
        return false;
    }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
        const url = tab.url;
        console.log("URL detectada:", url);

        const esPeligroso = await verificarSitioConGoogleSafeBrowsing(url);

        const result = {
            url,
            score: esPeligroso ? 5 : 1,
            message: esPeligroso
                ? "Detectado como sitio peligroso por Google Safe Browsing"
                : "Sitio seguro según Google Safe Browsing"
        };

        if (chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ safewebResult: result });
        }

        if (result.score >= 4) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: '⚠️ Sitio Peligroso Detectado',
                message: 'Google ha marcado este sitio como riesgoso. No ingrese datos sensibles.',
                priority: 2,
                buttons: [{ title: "Entendido" }]
            });
        }
    }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, async (tab) => {
        if (tab && tab.url && tab.url.startsWith('http')) {
            console.log("Cambio de pestaña activa:", tab.url);

            const esPeligroso = await verificarSitioConGoogleSafeBrowsing(tab.url);

            const result = {
                url: tab.url,
                score: esPeligroso ? 5 : 1,
                message: esPeligroso
                    ? "Detectado como sitio peligroso por Google Safe Browsing"
                    : "Sitio seguro según Google Safe Browsing"
            };

            if (chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ safewebResult: result });
            }

            if (result.score >= 4) {
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon128.png',
                    title: '⚠️ Sitio Peligroso Detectado',
                    message: 'Google ha marcado este sitio como riesgoso. No ingrese datos sensibles.',
                    priority: 2,
                    buttons: [{ title: "Entendido" }]
                });
            }
        }
    });
});
