//objelerin anahtarlarının elde edilmesi
// Obje => name: 'John Doe' -> key:value
const objKeys = async (objs, filter = "") => {  //filter değeri varsa filter'e sahip keyler seçilir

    const names = Object.keys(objs)             //objs içerisinde key değerleri alındı
        .filter((key) => key.includes(filter))  //veri akışına engel olabilir
        .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: objs[key],
            });
        }, {});
    let keys = Object.keys(names);

    //periods[i]
    //objs[keys[i]] 
    return keys
}
//let tümObjeler = await objKeys(degerlerObjesi);

module.exports = { objKeys };
//objKeys -> ../charting/main.js
//objKeys -> ../realtiming/realTime.js