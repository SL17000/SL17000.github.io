document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inicializar el mapa
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    // Guardamos el mapa en una ventana global para los botones
    window.miMapa = map;

    // 2. Cargar imagen del mapa
    var bounds = [[0, 0], [1000, 1500]]; 
    var image = L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

    // --- BASE DE DATOS DE PUNTOS ---
    var puntos = [
        {
            nombre: "Paragüita",
            especie: "Cyperus alternifolius",
            coords: [161.8, 1217.1],
            suelo: "Zona Húmeda / Arcillosa",
            descripcion: "Planta ideal para fitorremediación y control de erosión.",
            link: "fauna/paraguita.html"
        }
    ];

    // --- FUNCIÓN PARA ACTUALIZAR EL MENÚ LATERAL ---
    function actualizarSidebar(data) {
        var sidebar = document.getElementById('info-suelo');
        sidebar.innerHTML = `
            <div style="animation: fadeIn 0.5s;">
                <h3 style="color: #81c784; margin-top:0;">${data.nombre}</h3>
                <p style="font-size: 0.9rem; margin-top:-10px;"><i>${data.especie}</i></p>
                <p><b>Suelo:</b> ${data.suelo}</p>
                <p>${data.descripcion}</p>
                <a href="${data.link}" class="btn-ficha">Abrir Ficha Técnica</a>
            </div>
        `;
    }

    // --- COLOCAR MARCADORES ---
    puntos.forEach(function(punto) {
        var marker = L.marker(punto.coords).addTo(map);
        marker.on('click', function() {
            actualizarSidebar(punto);
        });
        marker.bindPopup(`<b>${punto.nombre}</b><br>Haz clic para ver detalles.`);
    });

    // --- DETECTOR DE COORDENADAS PARA LA CONSOLA ---
    map.on('click', function(e) {
        console.log("Coordenadas detectadas: [" + e.latlng.lat.toFixed(1) + ", " + e.latlng.lng.toFixed(1) + "]");
    });

    // --- ESTO ES LO NUEVO: Reajusta el mapa si cambias el tamaño de pantalla ---
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });

}); // Aquí termina el DOMContentLoaded

// --- FUNCIÓN PARA LOS BOTONES DE SECTOR ---
window.irASector = function(lat, lng, zoom, info) {
    window.miMapa.flyTo([lat, lng], zoom);
    document.getElementById('info-suelo').innerHTML = `
        <div style="animation: fadeIn 0.5s;">
            <h3 style="color: #3498db;">Sector: ${info}</h3>
            <p>Composición técnica del suelo en esta área.</p>
        </div>
    `;
};