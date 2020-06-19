// jshint esversion: 8
(() => {'use strict';
const getjson = async path => await (await fetch('https://ezeki.pythonanywhere.com/' + path)).json();
const gettext = async path => await (await fetch('https://raw.githubusercontent.com/israellevin/ezeki/' + path)).text();
(async() => {
let npcs = await getjson('npc');
const npcRow = document.createElement('tr');
for(let npc of npcs){
    const npcCell = document.createElement('td');
    npcCell.appendChild(document.createTextNode(npc.name));
    npcCell.addEventListener('click', async() => console.log(await gettext('master/npc/' + npc.name)))
    npcRow.appendChild(npcCell);
}
document.querySelector('div.npc table.npc').appendChild(npcRow);
console.log(npcs);
})();
})();
