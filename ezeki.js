// jshint esversion: 8
(async() => {'use strict';

const getjson = async path => await (await fetch('https://ezeki.pythonanywhere.com/' + path)).json();
const gettext = async path => await (await fetch('https://raw.githubusercontent.com/israellevin/ezeki/' + path)).text();
const displayPage = async source => {
    const display = document.createElement('div');
    display.classList.add('display');
    display.classList.add('loading');

    const closer = document.createElement('span');
    closer.addEventListener('click', () => display.parentNode.removeChild(display));
    closer.classList.add('closer');
    closer.appendChild(document.createTextNode('[סגור]'));
    display.appendChild(closer);

    const editor = document.createElement('span');
    editor.addEventListener('click', () =>
        document.location.href = 'https://github.com/israellevin/ezeki/edit/master/' + source);
    editor.classList.add('editor');
    editor.appendChild(document.createTextNode('[ערוך]'));
    display.appendChild(editor);

    document.body.appendChild(display);
    const text = await gettext('master/' + source);
    if(text === '404: Not Found'){
        document.location.href = 'https://github.com/israellevin/ezeki/new/master/?filename=' + source;
    }
    const contentDiv = document.createElement('div');
    contentDiv.appendChild(document.createTextNode(text));
    display.appendChild(contentDiv);
    display.classList.remove('loading');
};

let npcs = await getjson('npc');
const npcRow = document.createElement('tr');
const opinionRows = document.createElement('tbody');
for(const npc of npcs){
    const npcCell = document.createElement('td');
    npcCell.appendChild(document.createTextNode(npc.name));
    npcCell.addEventListener('click', () => displayPage('npc/' + npc.name));
    npcRow.appendChild(npcCell);

    const opinionRow = document.createElement('tr');
    for(const other of npcs){
        const opinionCell = document.createElement('td');
        opinionCell.appendChild(document.createTextNode("מה " + npc.name + " חושב/ת על " + other.name));
        opinionCell.addEventListener('click', () => displayPage('opinions/' + npc.name + '.' + other.name));
        opinionRow.appendChild(opinionCell);
    }
    opinionRows.appendChild(opinionRow);
}
const table = document.querySelector('div.npc table.npc');
const tableHead = document.createElement('thead');
tableHead.appendChild(npcRow);
table.appendChild(tableHead);
table.appendChild(opinionRows);
})();
