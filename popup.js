// Función para análisis automático al abrir el popup
async function analizarURLActiva() {
  const urlText = document.getElementById('url');
  const statusText = document.getElementById('status');
  const scoreText = document.getElementById('score');
  const indicator = document.getElementById('status-indicator');

  urlText.textContent = "Cargando...";
  statusText.textContent = "Analizando...";
  scoreText.textContent = "-";

  chrome.storage.local.get("safewebResult", (data) => {
    const result = data.safewebResult;
    if (result) {
      urlText.textContent = result.url;
      statusText.textContent = result.message;
      scoreText.textContent = result.score;

      if (result.score >= 4) {
        indicator.textContent = "Peligroso";
        indicator.className = "indicator danger";
      } else if (result.score <= 2) {
        indicator.textContent = "Seguro";
        indicator.className = "indicator safe";
      } else {
        indicator.textContent = "Moderado";
        indicator.className = "indicator warning";
      }
    } else {
      urlText.textContent = "No disponible";
      statusText.textContent = "No se pudo analizar";
      scoreText.textContent = "-";
      indicator.textContent = "Desconocido";
      indicator.className = "indicator neutral";
    }
  });
}

// Función de análisis manual ya existente
document.getElementById('analyze-btn').addEventListener('click', async () => {
  const input = document.getElementById('manual-url');
  const url = input.value.trim();
  const resultText = document.getElementById('manual-result');

  if (!url || !url.startsWith("http")) {
    resultText.textContent = "Por favor, ingrese una URL válida.";
    resultText.style.color = "red";
    return;
  }

  resultText.textContent = "Analizando...";
  resultText.style.color = "#333";

  const apiKey = "AIzaSyBDxjcMNrl3_EzpGQwFi1q2H5p22T9B2zo";
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
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    if (data && data.matches) {
      resultText.textContent = "❌ Sitio marcado como peligroso por Google.";
      resultText.style.color = "darkred";
    } else {
      resultText.textContent = "✅ Sitio seguro según Google Safe Browsing.";
      resultText.style.color = "green";
    }
  } catch (error) {
    resultText.textContent = "Error al analizar la URL.";
    resultText.style.color = "red";
    console.error("Error al verificar URL manual:", error);
  }
});

// Ejecutar análisis automático al cargar el popup
document.addEventListener('DOMContentLoaded', analizarURLActiva);
