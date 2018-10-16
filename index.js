const fs = require('fs');
const convert = require('xml-js');
 
const xml = fs.readFileSync('test.xml', 'utf8');
// const lang = 'fr-FR'

let txt = '';
let res = JSON.parse(convert.xml2json(xml, {compact: false, spaces: 4}));
res = res.elements[0].elements;

function tab(nb) {
    let str = '';
    for (let i = 0; i < nb; i++) {
        const element = nb     
        str += '\t';
    }
    return str
}

res.forEach(el => {
    if (el.name == 'category') {
        txt += '\n' + el.attributes['category-id'] + '\n';
        el.elements.forEach(el => {
            if (el.name == 'refinement-definitions') {
                el.elements.forEach(el => {
                    if (el.name == 'refinement-definition') {
                        if (el.attributes['attribute-id']) {
                            if (el.attributes['attribute-id'].includes('Filtre')) {
                                txt += tab(1) + el.attributes['attribute-id'] + '\n';
                                el.elements.forEach(el => {
                                    if (el.name = 'display-name') {
                                        if (el.attributes) {
                                            if (el.attributes['xml:lang']) {
                                                txt += tab(2) + el.attributes['xml:lang'] + '\n';
                                                txt += tab(3) + el.elements[0].text + '\n';
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    }
});

console.log(txt);
fs.writeFileSync('result.txt', txt, {encoding: 'utf8'})