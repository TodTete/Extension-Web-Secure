# 🔒 Secure Web Site — Extensión de Chrome

> Extensión de seguridad que analiza la URL de los sitios web para verificar su legitimidad y ayudarte a prevenir fraudes, phishing o páginas engañosas.

[![Manifest](https://img.shields.io/badge/Chrome%20Extension-MV3-informational)](#)
[![Status](https://img.shields.io/badge/status-beta-orange)](#estado)
[![Repo](https://img.shields.io/badge/repo-GitHub-blue)](https://github.com/TodTete/Extension-Web-Secure/tree/main)
[![Author](https://img.shields.io/badge/author-Ricardo%20Vallejo-green)](#autor)

---

## 📂 Estructura del proyecto

```
Extension-Web-Secure/
├─ icons/
│  ├─ icon128.png
│  └─ icono.png
├─ background.js
├─ chrome.runtime.on...
├─ config.js
├─ content.js
├─ manifest.json
├─ popup.html
├─ popup.js
└─ styles.css
```

---

## 🚀 Instalación (modo desarrollador)

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TodTete/Extension-Web-Secure.git
   cd Extension-Web-Secure
   ```
2. Abre **Chrome** y entra a:
   `chrome://extensions/`
3. Activa el **Modo desarrollador**.
4. Haz clic en **Cargar descomprimida** y selecciona la carpeta del proyecto.
5. Listo ✅ ya podrás ver el ícono de la extensión.

---

## ✨ Características

* Analiza el **URL** de la pestaña activa.
* Detecta uso de **HTTP** en lugar de **HTTPS**.
* Identifica **dominios sospechosos**, punycode o redirecciones.
* Muestra un popup con la evaluación del sitio.
* Interfaz ligera y sencilla.

---

## 📖 Uso

1. Entra a cualquier sitio web.
2. Haz clic en el ícono de la extensión.
3. Se mostrará un análisis con recomendaciones:

   * **Seguro** ✅
   * **Precaución** ⚠️
   * **Riesgo** ❌

---

## 🛠️ Desarrollo futuro

* [ ] Lista blanca/negra de dominios.
* [ ] Sistema de puntaje más detallado.
* [ ] Página de configuración de opciones.
* [ ] Internacionalización (multi-idioma).
* [ ] Publicación en Chrome Web Store.

---

## 👤 Autor

**Ricardo Vallejo**
🔗 [Repositorio oficial](https://github.com/TodTete/Extension-Web-Secure/tree/main)

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**.
Consulta el archivo [`LICENSE`](LICENSE) para más información.

---
