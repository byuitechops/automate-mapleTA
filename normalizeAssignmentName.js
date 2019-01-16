module.exports = (name)=>{
    //use regex to remove punctuation and make all the letters to lowercase
    return name.replace(/&/gi, 'and').replace(/[^A-Z0-9.]/gi, '').toLowerCase();
}