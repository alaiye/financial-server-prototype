

const objKeys = async (objs, filter = "") => {
    //period ayarları

    const names = Object.keys(objs)
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
//let periods = await objKeys(deger);

module.exports = { objKeys };
//objKeys -> ../charting/main.js
//objKeys -> ../realtiming/realTime.js