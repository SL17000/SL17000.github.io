document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    var bounds = [[0, 0], [1000, 1500]]; 
    L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

    // Los datos de tus plantas
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

    puntos.forEach(function(p) {
        var marker = L.marker(p.coords).addTo(map);
        marker.on('click', function() {
            document.getElementById('info-suelo').innerHTML = `
                <div style="animation: fadeIn 0.5s">
                    <h3>${p.nombre}</h3>
                    <p><i>${p.especie}</i></p>
                    <p><b>Suelo:</b> ${p.suelo}</p>
                    <p>${p.descripcion}</p>
                    <a href="${p.link}" class="btn-ficha">VER FICHA TÉCNICA</a>
                </div>
            `;
        });
    });

    // Pequeño arreglo para que el mapa no salga blanco
    setTimeout(function(){ map.invalidateSize(); }, 500);
});