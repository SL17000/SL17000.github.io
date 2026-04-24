document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inicializar Mapa
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    window.miMapa = map; // Referencia global

    // 2. Cargar Imagen (Asegura que la ruta sea correcta)
    var bounds = [[0, 0], [1000, 1500]]; 
    var image = L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

    // --- BASE DE DATOS ---
    var puntos = [
        {
            nombre: "Paragüita",
            especie: "Cyperus alternifolius",
            coords: [161.8, 1217.1],
            suelo: "Zona Húmeda / Arcillosa",
            descripcion: "Planta ideal para fitorremediación y control de erosión. Ayuda a limpiar aguas de metales pesados.",
            link: "fauna/paraguita.html"
        }
    ];

    // --- ACTUALIZAR INFORMACIÓN ---
    function actualizarSidebar(data) {
        var sidebar = document.getElementById('info-suelo');
        sidebar.innerHTML = `
            <div style="animation: fadeIn 0.5s;">
                <h3 style="color: #81c784; margin-bottom: 5px;">${data.nombre}</h3>
                <p style="margin-top: 0; font-style: italic; opacity: 0.8;">${data.especie}</p>
                <p><b>Tipo de Suelo:</b> ${data.suelo}</p>
                <p>${data.descripcion}</p>
                <a href="${data.link}" class="btn-ficha">Abrir Ficha Técnica Completa</a>
            </div>
        `;
        
        // En móviles, hace scroll automático hacia la info cuando tocas un árbol
        if(window.innerWidth <= 768) {
            document.getElementById('sidebar').scrollTo({ top: 200, behavior: 'smooth' });
        }
    }

    // --- MARCADORES ---
    puntos.forEach(function(punto) {
        var marker = L.marker(punto.coords).addTo(map);
        marker.on('click', function() {
            actualizarSidebar(punto);
        });
        marker.bindPopup(`<b>${punto.nombre}</b><br>Toca para ver detalles.`);
    });

    // --- CONSOLA PARA NUEVAS COORDENADAS ---
    map.on('click', function(e) {
        console.log("Coordenadas: [" + e.latlng.lat.toFixed(1) + ", " + e.latlng.lng.toFixed(1) + "]");
    });

    window.addEventListener('resize', function() { map.invalidateSize(); });
});

// --- BOTONES DE SECTOR ---
window.irASector = function(lat, lng, zoom, info) {
    window.miMapa.flyTo([lat, lng], zoom);
    document.getElementById('info-suelo').innerHTML = `
        <div style="animation: fadeIn 0.5s;">
            <h3 style="color: #3498db;">${info}</h3>
            <p>Información técnica sobre el sustrato y las condiciones de esta zona del campus.</p>
        </div>
    `;
};