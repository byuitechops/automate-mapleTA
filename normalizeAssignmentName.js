module.exports = (name)=>{
    return name.replace(/&/gi, 'and').replace(/[^A-Z0-9.]/gi, '').toLowerCase();
}