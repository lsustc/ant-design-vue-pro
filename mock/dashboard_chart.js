function chart(method) {
    let res = null;
    switch (method) {
        case 'GET':
            res = [20,40,78,10,30,20];
            break;
        default:
            res = null;
            break;
    }
    return res;
}

module.exports = chart;