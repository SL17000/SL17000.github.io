document.addEventListener('DOMContentLoaded', function() {
    
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    var bounds = [[0, 0], [1000, 1500]]; 
    L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

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

    function actualizarSidebar(data) {
        document.getElementById('info-suelo').innerHTML = `
            <div style="animation: fadeIn 0.4s ease-out;">
                <h2 style="color: #81c784; margin-bottom: 5px;">${data.nombre}</h2>
                <p style="margin-top: 0; font-style: italic; opacity: 0.8;">${data.especie}</p>
                <p><b>Suelo:</b> ${data.suelo}</p>
                <p>${data.descripcion}</p>
                <a href="${data.link}" class="btn-ficha">VER FICHA TÉCNICA</a>
            </div>
        `;
    }

    puntos.forEach(function(punto) {
        var marker = L.marker(punto.coords).addTo(map);
        marker.on('click', function() {
            actualizarSidebar(punto);
        });
        marker.bindPopup(`<b>${punto.nombre}</b>`);
    });

    // Herramienta para obtener coordenadas (se ve en la consola F12)
    map.on('click', function(e) {
        console.log("[" + e.latlng.lat.toFixed(1) + ", " + e.latlng.lng.toFixed(1) + "]");
    });

    window.addEventListener('resize', function() { map.invalidateSize(); });
});