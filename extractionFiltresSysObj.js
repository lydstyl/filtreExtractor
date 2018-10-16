const fs = require('fs');
const convert = require('xml-js');
 
const xml = fs.readFileSync('1016-nl-sys-obj-filtres-group.xml', 'utf8');
const lang = 'fr-FR'

let txt = '';
let res = JSON.parse(convert.xml2json(xml, {compact: false, spaces: 4}));
res = res.elements[0].elements

function tab(nb) {
    let str = '';
    for (let i = 0; i < nb; i++) {
        const element = nb     
        str += '\t';
    }
    return str
}

res.forEach(el => {
    el.elements.forEach(el =>{
        if (el.name == 'attribute-definition') {
            if(el.attributes['attribute-id'].includes('Filtre')){
                txt += '\n' + el.attributes['attribute-id'] + '\n';
                el.elements.forEach(el => {
                    if (el.name == 'value-definitions') {
                        el.elements.forEach(el => {
                            el.elements.forEach(el =>{
                                if (el.name == 'display') {
                                    txt += tab(1) + el.attributes['xml:lang'] + '\n';
                                    el.elements.forEach(el => {
                                        txt += tab(2) + el.text + '\n' + '\n';
                                    })
                                }
                            })
                        })
                    }
                });
            }
        }
    });
});

fs.writeFileSync('result.txt', txt, {encoding: 'utf8'})