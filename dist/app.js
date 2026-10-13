const search = document.querySelector('#search');
const stores = [...document.querySelectorAll('.store')];
const grid = document.querySelector('.store-grid');
const cache = new Map();
let revision = 0;
async function coordinates(zip) {
  if (!cache.has(zip)) {
    const request = fetch(`https://api.zippopotam.us/us/${zip}`, {signal: AbortSignal.timeout(12000)}).then(async response => {
      if (response.status === 404) throw Error('ZIP_NOT_FOUND');
      if (!response.ok) throw Error('LOOKUP_FAILED');
      const place = (await response.json()).places?.[0];
      if (!place) throw Error('LOOKUP_FAILED');
      const point = [Number(place.latitude), Number(place.longitude)];
      if (!point.every(Number.isFinite)) throw Error('LOOKUP_FAILED');
      return point;
    });
    cache.set(zip, request);
    request.catch(() => cache.delete(zip));
  }
  return cache.get(zip);
}
function distance(a,b) {
  const rad = n => n*Math.PI/180;
  const h = Math.sin(rad(b[0]-a[0])/2)**2 + Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(rad(b[1]-a[1])/2)**2;
  return 7917.6*Math.asin(Math.sqrt(Math.min(1,h)));
}
search.addEventListener('input', async () => {
  const current = ++revision;
  const term = search.value.trim().toLowerCase();
  stores.forEach(store => {grid.append(store); store.querySelector('.distance')?.remove();});
  if (/^\d{5}$/.test(term)) {
    stores.forEach(store => {store.hidden = false;});
    document.querySelector('#empty').hidden = true;
    document.querySelector('#count').textContent = `Finding stores nearest to ${term}…`;
    try {
      const origin = await coordinates(term);
      const ranked = await Promise.all(stores.map(async store => ({store, miles: distance(origin, await coordinates(store.dataset.search.match(/\b\d{5}\b/)[0]))})));
      if (current !== revision) return;
      ranked.sort((a,b) => a.miles-b.miles).forEach(({store,miles},index) => {
        const label = document.createElement('p');
        label.className = 'distance';
        label.textContent = `${index === 0 ? 'Nearest area · ' : ''}About ${miles.toFixed(1)} miles`;
        store.querySelector('.store-top').after(label);
        grid.append(store);
      });
      document.querySelector('#count').textContent = `All 10 stores, nearest to ${term} first. Approximate straight-line distances between ZIP code centers, not driving distances.`;
    } catch (error) {
      if (current !== revision) return;
      document.querySelector('#count').textContent = error.message === 'ZIP_NOT_FOUND' ? `ZIP code ${term} was not found. Check the ZIP or search by city.` : 'ZIP lookup is unavailable. Check your internet connection or search by city. All 10 stores are shown.';
    }
    return;
  }
  let count = 0;
  stores.forEach(store => {
    store.hidden = !store.dataset.search.toLowerCase().includes(term);
    if (!store.hidden) count++;
  });
  document.querySelector('#count').textContent = term ? `Showing ${count} of 10 locations` : 'Showing all 10 locations';
  document.querySelector('#empty').hidden = count !== 0;
});

const locationMenu = document.querySelector(".location-menu");
locationMenu.addEventListener("click", event => {
 const link = event.target.closest("a");
 if (!link) return;
 search.value = "";
 search.dispatchEvent(new Event("input"));
 locationMenu.open = false;
 const target = document.querySelector(link.getAttribute("href"));
 if (target?.classList.contains("store")) target.focus({preventScroll:true});
});
document.addEventListener("click", event => {if (!locationMenu.contains(event.target)) locationMenu.open=false;});
locationMenu.addEventListener("keydown", event => {if(event.key === "Escape"){locationMenu.open=false;locationMenu.querySelector("summary").focus();}});
