const FS = require('fs');
const readline = require('readline-sync');

const NODEPATH = process.argv[0];
const APPPATH = process.argv[1];
const TYPEOFCODING = process.argv[2];
const CODEDECODE = process.argv[3];
const INNER = process.argv[4];
const OUTER = process.argv[5];

let codeString = FS.readFileSync('in.txt').toString();

function encodeToEscape(codeString, symbolCount) {
    if (symbolCount < 4) {
        let codedString = "";
        
        for (let i = 0; i < symbolCount; i++) {
            codedString += codeString;
        }
        return codedString;
    } else {
        symbolCount -= 4;
        let codedString = "#(" + symbolCount + ")" + codeString;
        return codedString;
    }
}

function decodeFromEscape(symbol, count) {
    if (count > 3) {
        let decode;
        for (let i = 0; i < count + 4; i++) {
            decode += symbol;
        }
        return decode;
    } else {

    }
}

if (TYPEOFCODING == "--escape") {

    if (CODEDECODE == "--encode") {

        let encodedString = "";
        let symbolCounter = 1;

        for (let i = 1; i < codeString.length; i++) {
            if (codeString[i-1] == codeString[i]) {
                symbolCounter++;
            } else {
                encodedString += encodeToEscape(codeString[i-1], symbolCounter);
                symbolCounter = 1;
            }
        }
	
        FS.writeFileSync(OUTER, encodedString);

    } else if (CODEDECODE == "--decode") {
        let decodedString;
        let symbolCount = 1;
        for (let i = 0; i < codeString; i++) {
            if (codeString[i] == "#") {
                if (symbolCount != 1) {
                    for (let i = 0; i < symbolCount; i++) {
                        decodedString += codeString[i - 1];
                    }
                }
                let countOfSymbol = Number(codeString[i + 2]);
                decodedString = decodeFromEscape(codeString[i + 4], countOfSymbol);
                i += 6;
                symbolCount = 1;
            } else {
                if (codeString[i - 1] == codeString[i]) {
                    symbolCount++;
                }
            }
        }

    }

} else if (TYPEOFCODING == "--jump") {

} else {
    console.log("InvalidTypeOfCoding")
}