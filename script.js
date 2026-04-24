document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar Mapa
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    var bounds = [[0, 0], [1000, 1500]]; 
    L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

    // Obligar al mapa a recalcular su tamaño (Fix para pantalla blanca)
    setTimeout(() => { map.invalidateSize(); }, 200);

    var puntos = [
        {
            nombre: "Paragüita",
            especie: "Cyperus alternifolius",
            coords: [161.8, 1217.1],
            suelo: "Zona Húmeda / Arcillosa",
            descripcion: "Planta ideal para fitorremediación y control de erosión. Actúa como un filtro natural para el agua.",
            link: "fauna/paraguita.html"
        }
    ];

    function actualizarSidebar(data) {
        const contenedor = document.getElementById('info-suelo');
        
        contenedor.innerHTML = `
            <div class="animado">
                <h2 style="color: #81c784; margin-bottom: 5px; font-size: 1.8rem;">${data.nombre}</h2>
                <p style="margin-top: 0; font-style: italic; color: #bdc3c7;">${data.especie}</p>
                <p style="margin-top: 20px;"><b>Suelo:</b> ${data.suelo}</p>
                <p style="line-height: 1.6;">${data.descripcion}</p>
                <a href="${data.link}" class="btn-ficha">VER FICHA TÉCNICA</a>
            </div>
        `;

        // Pequeño desplazamiento automático en móvil
        if(window.innerWidth <= 768) {
            document.getElementById('sidebar-scroll').scrollBy({ top: 120, behavior: 'smooth' });
        }
    }

    puntos.forEach(function(punto) {
        var marker = L.marker(punto.coords).addTo(map);
        marker.on('click', function() {
            actualizarSidebar(punto);
        });
        marker.bindPopup(`<b>${punto.nombre}</b>`);
    });

    window.addEventListener('resize', function() { map.invalidateSize(); });
});