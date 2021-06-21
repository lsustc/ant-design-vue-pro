function chart(method) {
    let res = null;
    switch (method) {
        case 'POST':
            res = {message: 'ok'};
            break;
        default:
            res = null;
            break;
    }
    return res;
}

module.exports = chart;