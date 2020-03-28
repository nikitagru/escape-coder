const FS = require('fs');
const readline = require('readline-sync');

const NODEPATH = process.argv[0];
const APPPATH = process.argv[1];
const TYPEOFCODING = process.argv[2];
const CODEDECODE = process.argv[3];
const INNER = process.argv[4];
const OUTER = process.argv[5];

let codeString = FS.readFileSync(INNER).toString();

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


if (TYPEOFCODING == "--escape") {

    if (CODEDECODE == "--encode") {

        let encodedString = "";
        let symbolCounter = 1;

        for (let i = 1; i < codeString.length + 1; i++) {
            if (codeString[i-1] == codeString[i]) {
                symbolCounter++;
            } else {
                encodedString += encodeToEscape(codeString[i-1], symbolCounter);
                symbolCounter = 1;
            }
        }
	
        FS.writeFileSync("out.txt", encodedString);

    } else if (CODEDECODE == "--decode") {
        

        let decodedString = "";
        let symbolCounter = 1;

        let prefer = "";
        let next = "";
        for (let j = 0; j < codeString.length; j++) {
            prefer = codeString[j];
            
            if (j != codeString.length - 1) {
                next = codeString[j + 1];
            } else {
                next = null;
            }

            if (next != null) {
                if (prefer === next) {
                    symbolCounter++;
                } else if (prefer == "#") {
                    let count = "";
                    let symbol = codeString.indexOf(')', j);
                    let temp = symbol - j;

                    if (temp == 3) {
                        count = codeString[j + 2];
                    } else {
                        for (temp; temp != 3; temp--) {
                            count += codeString[temp - 2];
                        }
                    }
                    count = Number(count);
                    
                    for (let m = 0; m < count + 4; m++) {
                        decodedString += codeString[symbol + 1];
                    }
                    //aabbb#(5)gcc
                    j += 4;
                } else if (next == "#") {
                        let symbol = codeString[j];
                        for (let n = 0; n < symbolCounter; n++) {
                            decodedString += symbol;
                        }
                        symbolCounter = 1;
                } else {
                let symbol = codeString[j];
                        for (let n = 0; n < symbolCounter; n++) {
                            decodedString += symbol;
                        }
                        symbolCounter = 1;
                }
            }
        }
        FS.writeFileSync("out.txt", decodedString);
    }

} else if (TYPEOFCODING == "--jump") {

    if (CODEDECODE == "") {}

} else {
    console.log("InvalidTypeOfCoding")
}