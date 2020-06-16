// jshint esversion: 8
(() => {'use strict';
const baseurl = 'https://api.github.com/repos/israellevin/ezeki/contents';
const get = async url => await (await fetch(url)).text();
(async() => {console.log(await get(baseurl + '/npc'));})();
})();
