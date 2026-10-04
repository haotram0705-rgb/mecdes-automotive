(()=>{
const upgradeImage=image=>{
const source=image.getAttribute('src');
if(!source||!source.startsWith('/assets/cars/album-mec-png/')||image.dataset.pngFallback)return;
const webp=source.replace('/album-mec-png/','/album-mec-webp/').replace(/\.png$/i,'.webp');
image.dataset.pngFallback=source;
image.src=webp;
};
const scan=node=>{
if(node instanceof HTMLImageElement)upgradeImage(node);
node.querySelectorAll?.('img').forEach(upgradeImage);
};
document.addEventListener('error',event=>{
const image=event.target;
if(image instanceof HTMLImageElement&&image.dataset.pngFallback){const fallback=image.dataset.pngFallback;delete image.dataset.pngFallback;image.src=fallback}
},true);
scan(document);
new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(scan))).observe(document.documentElement,{childList:true,subtree:true});
})();
