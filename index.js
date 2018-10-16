const fs = require('fs');
const convert = require('xml-js');
 
const xml = fs.readFileSync('1016-nl-sys-obj-filtres-group.xml', 'utf8');
let res = JSON.parse(convert.xml2json(xml, {compact: false, spaces: 4}));
res = res.elements[0].elements

res.forEach(el => {
    el.elements.forEach(el =>{
        if (el.name == 'attribute-definition') {
            if(el.attributes['attribute-id'].includes('Filtre')){
                console.log(el.attributes['attribute-id']);
                el.elements.forEach(el => {
                    if (el.name == 'display-name') {
                        el.elements.forEach(el => {
                            console.log('\t' + el.text);
                            
                        })
                    }
                    
                });
            }
        }
    });
});