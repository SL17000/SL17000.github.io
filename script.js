document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inicializar el mapa
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    // Guardamos el mapa en una ventana global para que los botones lo encuentren
    window.miMapa = map;

    // 2. Definir dimensiones y cargar imagen
    var bounds = [[0, 0], [1000, 1500]]; 
    var image = L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

    // --- BASE DE DATOS DE PUNTOS ---
    var puntos = [
        {
            nombre: "Paragüita",
            especie: "Cyperus alternifolius",
            coords: [161.8, 1217.1], // <--- AQUÍ PUSE TUS NÚMEROS
            suelo: "Zona Húmeda / Arcillosa",
            descripcion: "Planta ideal para fitorremediación y control de erosión.",
            link: "fauna/paraguita.html"
        },
        // Cuando quieras agregar otro árbol, pon una COMA aquí arriba y copia esto:
        /*
        {
            nombre: "Nombre del Árbol 2",
            especie: "Nombre Científico",
            coords: [obten_las_coordenadas_haciendo_clic],
            suelo: "Tipo de suelo",
            descripcion: "Breve descripción",
            link: "fauna/archivo_nuevo.html"
        }
        */
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

    // --- DETECTOR DE COORDENADAS (Para que tú las veas en la consola) ---
    map.on('click', function(e) {
        console.log("Coordenadas detectadas: [" + e.latlng.lat.toFixed(1) + ", " + e.latlng.lng.toFixed(1) + "]");
    });

});

// --- FUNCIÓN PARA LOS BOTONES DE SECTOR (Fuera del DOMContentLoaded) ---
window.irASector = function(lat, lng, zoom, info) {
    window.miMapa.flyTo([lat, lng], zoom);
    document.getElementById('info-suelo').innerHTML = `
        <div style="animation: fadeIn 0.5s;">
            <h3 style="color: #3498db;">Sector: ${info}</h3>
            <p>Información técnica sobre la composición del suelo en esta zona.</p>
        </div>
    `;
};