document.addEventListener('DOMContentLoaded', function() {
    
    var map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -1
    });

    var bounds = [[0, 0], [1000, 1500]]; 
    L.imageOverlay('fotomapa/mapa.png', bounds).addTo(map);
    map.fitBounds(bounds);

    var puntos = [
        { n: "Paragüita", s: "Cyperus alternifolius", c: [161.8, 1217.1], suelo: "Húmedo / Arcillosa", desc: "Ideal para fitorremediación.", link: "fauna/paraguita.html" },
        { n: "Trinitaria", s: "Bougainvillea spectabilis", c: [392.5, 1178.0], suelo: "Materia orgánica / Retención humedad", desc: "Arbusto espinoso y refugio de aves.", link: "fauna/trinitaria.html" },
        { n: "Palma Jardinera", s: "Chamaedorea elegans", c: [429.1, 958.5], suelo: "Regulación térmica", desc: "Filtro biológico contra virus y bacterias.", link: "fauna/palma_jardinera.html" },
        { n: "Algodón de seda", s: "Calotropis procera", c: [395.1, 960.0], suelo: "Suelos degradados / Salinos", desc: "Hogar de la mariposa Monarca.", link: "fauna/algodon_seda.html" },
        { n: "Naranjillo", s: "Swinglea glutinosa", c: [621.5, 1095.5], suelo: "Cerca viva defensiva", desc: "Rutácea para delimitación y control físico.", link: "fauna/naranjillo.html" },
        { n: "Matarratón", s: "Gliricidia sepium", c: [635.5, 1055.0], suelo: "Fijador de nitrógeno", desc: "Leguminosa para recuperación de suelos.", link: "fauna/matarraton.html" },
        { n: "Cotoperí", s: "Talisia oliviformis", c: [584.0, 716.0], suelo: "Protección superficial", desc: "Árbol frutal nativo con sombra densa.", link: "fauna/cotoperi.html" },
        { n: "Neem (Nin)", s: "Azadirachta indica", c: [439.2, 551.0], suelo: "Desinfectante de patógenos", desc: "Insecticida natural potente.", link: "fauna/neem.html" },
        { n: "Limoncillo", s: "Murraya paniculata", c: [425.2, 382.0], suelo: "Barrera sanitaria", desc: "Arbusto ornamental muy fragante.", link: "fauna/limoncillo.html" },
        { n: "Limonero", s: "Citrus limon", c: [411.2, 338.0], suelo: "Acidificador ligero", desc: "Repelente natural por aceites esenciales.", link: "fauna/limonero.html" },

        { 
            n: "Sábila y Cotoperí joven", 
            s: "Aloe vera / T. oliviformis", 
            c: [426.1, 138.5], 
            suelo: "Protección del horizonte orgánico", 
            desc: "Combinación de planta medicinal y árbol joven protector que conviven en el mismo espacio.",
            links: [
                { nombre: "FICHA: SÁBILA", url: "fauna/sabila.html" },
                { nombre: "FICHA: COTOPERÍ JOVEN", url: "fauna/cotoperi_joven.html" }
            ]
        },

        { n: "Noni", s: "Morinda citrifolia", c: [317.6, 92.5], suelo: "Drenaje / Tolerancia salina", desc: "Planta medicinal antifúngica.", link: "fauna/noni.html" },
        { n: "Adelfa", s: "Nerium oleander", c: [857.0, 170.0], suelo: "Estabilización", desc: "Ornamental rústica y resistente.", link: "fauna/adelfa.html" },
        { n: "Azahar de la noche", s: "Cestrum nocturnum", c: [903.5, 169.3], suelo: "Acondicionador de suelos ácidos", desc: "Fragancia nocturna y confusión de plagas.", link: "fauna/azahar_noche.html" },
        { n: "Palma Areca", s: "Dypsis lutescens", c: [658.1, 523.0], suelo: "Biomasa / Purificación", desc: "Mejora microclima y filtra toxinas.", link: "fauna/palma_areca.html" }
    ];

    function actualizarSidebar(data) {
        let botonesHtml = '';

        if (data.links) {
            data.links.forEach(link => {
                botonesHtml += `<a href="${link.url}" class="btn-ficha" style="margin-bottom: 12px; display: block;">${link.nombre}</a>`;
            });
        } else {
            botonesHtml = `<a href="${data.link}" class="btn-ficha">VER FICHA TÉCNICA</a>`;
        }

        document.getElementById('info-suelo').innerHTML = `
            <div style="animation: fadeIn 0.5s">
                <h2 style="color: #81c784; margin-bottom:5px;">${data.n}</h2>
                <p><i>${data.s}</i></p>
                <p><b>Suelo:</b> ${data.suelo}</p>
                <p>${data.desc}</p>
                <div style="margin-top: 25px;">
                    ${botonesHtml}
                </div>
            </div>
        `;
    }

    puntos.forEach(function(p) {
        var marker = L.marker(p.c).addTo(map);
        marker.on('click', function() {
            actualizarSidebar(p);
        });
    });

    setTimeout(function(){ map.invalidateSize(); }, 500);
});