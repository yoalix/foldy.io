export const generateKeywords = (name) => {
    const arrName = [];
    let curName = "";
    name.split("").forEach((letter) => {
        curName += letter;
        arrName.push(curName);
        arrName.push(curName.toLowerCase());
        arrName.push(curName.toUpperCase());
    });
    return arrName;
}
