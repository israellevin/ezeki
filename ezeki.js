// jshint esversion: 8
(() => {'use strict';
const getjson = async path => await (await fetch('https://ezeki.pythonanywhere.com/' + path)).json();
const gettext = async path => await (await fetch('https://raw.githubusercontent.com/israellevin/ezeki/' + path)).text();
(async() => {
let npcs = await getjson('npc');
const npcRow = document.createElement('tr');
for(const npc of npcs){
    const npcCell = document.createElement('td');
    npcCell.appendChild(document.createTextNode(npc.name));
    npcCell.addEventListener('click', async() => {

        const display = document.createElement('div');
        display.classList.add('display');
        display.classList.add('loading');

        const closer = document.createElement('div');
        closer.addEventListener('click', () => display.parentNode.removeChild(display));
        closer.classList.add('closer');
        closer.appendChild(document.createTextNode('[סגור]'));
        display.appendChild(closer);

        const editor = document.createElement('div');
        editor.addEventListener('click', () =>
            document.location.href = 'https://github.com/israellevin/ezeki/edit/master/npc/' + npc.name);
        editor.classList.add('editor');
        editor.appendChild(document.createTextNode('[ערוך]'));
        display.appendChild(editor);

        document.body.appendChild(display);
        display.appendChild(document.createTextNode(await gettext('master/npc/' + npc.name)));
        display.classList.remove('loading');
    });
    npcRow.appendChild(npcCell);
}
document.querySelector('div.npc table.npc').appendChild(npcRow);
})();
})();
