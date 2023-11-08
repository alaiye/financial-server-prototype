const seconD = (data) => {
    const { price, date, doc1 } = data;
    let percentS3, percentS6, percentS9, percentS15, percentS30 = 0;
    let jSecond = {} // s3: { price: Number, percent: Number }

    percentS3 = (((price - doc1?.second.s3.price) / doc1?.second.s3.price) * 100)
    if (isNaN(percentS3)) { percentS3 = 0 }

    jSecond = { s3: { price: price, percent: percentS3 } }

    if (date.getSeconds() % 6 == 0) {
        percentS6 = (((price - doc1?.second.s6.price) / doc1?.second.s6.price) * 100)
        if (isNaN(percentS6)) { percentS6 = 0 }
        jSecond = { ...jSecond, s6: { price: price, percent: percentS6 } }
    }
    if (date.getSeconds() % 9 == 0) {
        percentS9 = (((price - doc1?.second.s9.price) / doc1?.second.s9.price) * 100)
        if (isNaN(percentS9)) { percentS9 = 0 }
        jSecond = { ...jSecond, s9: { price: price, percent: percentS9 } }
    }
    if (date.getSeconds() % 15 == 0) {
        percentS15 = (((price - doc1?.second.s15.price) / doc1?.second.s15.price) * 100)
        if (isNaN(percentS15)) { percentS15 = 0 }
        jSecond = { ...jSecond, s15: { price: price, percent: percentS15 } }
    }
    if (date.getSeconds() % 30 == 0) {
        percentS30 = (((price - doc1?.second.s30.price) / doc1?.second.s30.price) * 100)
        if (isNaN(percentS30)) { percentS30 = 0 }
        jSecond = { ...jSecond, s30: { price: price, percent: percentS30 } }
    }

    return jSecond
}

const minutE = (data) => {
    const { price, date, doc1 } = data;
    let percentM1, percentM3, percentM5, percentM15, percentM30 = 0;
    let jMinute = {} // s3: { price: Number, percent: Number }

    percentM1 = (((price - doc1?.minute.m1.price) / doc1?.minute.m1.price) * 100)
    if (isNaN(percentM1)) { percentM1 = 0 }

    jMinute = { m1: { price: price, percent: percentM1 } }

    if (date.getMinutes() % 3 == 0) {
        percentM3 = (((price - doc1?.minute.m3.price) / doc1?.minute.m3.price) * 100)
        if (isNaN(percentM3)) { percentM3 = 0 }
        jMinute = { ...jMinute, m3: { price: price, percent: percentM3 } }
    }
    if (date.getMinutes() % 5 == 0) {
        percentM5 = (((price - doc1?.minute.m5.price) / doc1?.minute.m5.price) * 100)
        if (isNaN(percentM5)) { percentM5 = 0 }
        jMinute = { ...jMinute, m5: { price: price, percent: percentM5 } }
    }
    if (date.getMinutes() % 15 == 0) {
        percentM15 = (((price - doc1?.minute.m15.price) / doc1?.minute.m15.price) * 100)
        if (isNaN(percentM15)) { percentM15 = 0 }
        jMinute = { ...jMinute, m15: { price: price, percent: percentM15 } }
    }
    if (date.getMinutes() % 30 == 0) {
        percentM30 = (((price - doc1?.minute.m30.price) / doc1?.minute.m30.price) * 100)
        if (isNaN(percentM30)) { percentM30 = 0 }
        jMinute = { ...jMinute, m30: { price: price, percent: percentM30 } }
    }

    return jMinute
}

const houR = (data) => {
    const { price, date, doc1 } = data;
    let percentH1, percentH2, percentH4, percentH6, percentH8, percentH12, percentH24 = 0;
    let jHour = {} // s3: { price: Number, percent: Number }

    percentH1 = (((price - doc1?.hour.h1.price) / doc1?.hour.h1.price) * 100)
    if (isNaN(percentH1)) { percentH1 = 0 }

    jHour = { h1: { price: price, percent: percentH1 } }

    if (date.getHours() % 2 == 0) {
        percentH2 = (((price - doc1?.hour.h2.price) / doc1?.hour.h2.price) * 100)
        if (isNaN(percentH2)) { percentH2 = 0 }
        jHour = { ...jHour, h2: { price: price, percent: percentH2 } }
    }
    if (date.getHours() % 4 == 0) {
        percentH4 = (((price - doc1?.hour.h4.price) / doc1?.hour.h4.price) * 100)
        if (isNaN(percentH4)) { percentH4 = 0 }
        jHour = { ...jHour, h4: { price: price, percent: percentH4 } }
    }
    if (date.getHours() % 6 == 0) {
        percentH6 = (((price - doc1?.hour.h6.price) / doc1?.hour.h6.price) * 100)
        if (isNaN(percentH6)) { percentH6 = 0 }
        jHour = { ...jHour, h6: { price: price, percent: percentH6 } }
    }
    if (date.getHours() % 8 == 0) {
        percentH8 = (((price - doc1?.hour.h8.price) / doc1?.hour.h8.price) * 100)
        if (isNaN(percentH8)) { percentH8 = 0 }
        jHour = { ...jHour, h8: { price: price, percent: percentH8 } }
    }
    if (date.getHours() % 12 == 0) {
        percentH12 = (((price - doc1?.hour.h12.price) / doc1?.hour.h12.price) * 100)
        if (isNaN(percentH12)) { percentH12 = 0 }
        jHour = { ...jHour, h12: { price: price, percent: percentH12 } }
    }
    if (date.getHours() % 24 == 0) {
        percentH24 = (((price - doc1?.hour.h24.price) / doc1?.hour.h24.price) * 100)
        if (isNaN(percentH24)) { percentH24 = 0 }
        jHour = { ...jHour, h24: { price: price, percent: percentH24 } }
    }

    return jHour
}

module.exports = { seconD, minutE, houR };