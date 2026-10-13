const mapStores = [{"id":"6681","city":"Morrow","street":"Jonesboro Road","lat":33.567858708957,"lon":-84.34356762669,"approximate":false},{"id":"4955","city":"Norcross","street":"Jimmy Carter Boulevard","lat":33.894328403949,"lon":-84.196515464248,"approximate":false},{"id":"7195","city":"Riverdale","street":"Highway 85","lat":33.578832141926,"lon":-84.412091668645,"approximate":false},{"id":"6050","city":"Norcross","street":"Singleton Road","lat":33.905349118388,"lon":-84.199867644301,"approximate":false},{"id":"5152","city":"Stone Mountain","street":"Memorial Drive","lat":33.795898145761,"lon":-84.225479627066,"approximate":false},{"id":"4764","city":"Forest Park","street":"Jonesboro Road","lat":33.626200616288,"lon":-84.355135460144,"approximate":false},{"id":"733","city":"Lilburn","street":"Pleasant Hill Road","lat":33.918080998662,"lon":-84.113752078985,"approximate":false},{"id":"6655","city":"Jonesboro","street":"Tara Boulevard","lat":33.5242,"lon":-84.359,"approximate":true},{"id":"4155","city":"Lilburn","street":"Lawrenceville Highway","lat":33.8656,"lon":-84.0725,"approximate":true},{"id":"1595","city":"Griffin","street":"North Expressway","lat":33.257367933616,"lon":-84.288370541754,"approximate":false}];
if (typeof L !== 'undefined') {
 const map = L.map('store-map',{scrollWheelZoom:false}).setView([33.6,-84.25],9);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
 mapStores.forEach((point,index)=>{
  const card=document.querySelector('#store-'+point.id);
  const phone=card.querySelector('.phone');
  const directions=card.querySelector('.store-actions a');
  const icon=L.divIcon({className:'tbv-pin',html:'<span>'+(index+1)+'</span>',iconSize:[28,36],iconAnchor:[14,36],popupAnchor:[0,-34]});
  L.marker([point.lat,point.lon],{icon,title:point.city+' — '+point.street}).addTo(map).bindPopup('<strong>'+point.city+'</strong><br>'+point.street+'<br>'+card.querySelector('address').innerHTML+(point.approximate?'<br><small>Approximate ZIP-area pin</small>':'')+'<br><a href="'+phone.href+'">'+phone.textContent+'</a><br><a href="'+directions.href+'" target="_blank" rel="noopener">Get directions ↗</a>');
 });
 map.fitBounds(mapStores.map(p=>[p.lat,p.lon]),{padding:[30,35]});
}
