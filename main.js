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
        
        let decodedString = "";
        let symbolCounter = 0;
        // let i = 0;
        
        // if (codeString[i] != "#" && codeString[i] == codeString[i - 1]) {
        //     symbolCounter++;
        //     i++;
        // } else {
        //     if (symbolCounter > 1) {
        //         let symbol = codeString[i - 1];

        //         for (let j = 0; j < symbolCounter; j++) {
        //             decodedString += symbol;
        //         }
        //         symbolCounter = 1;
        //     } else {
                
        //     }

        // }
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
                if (prefer == next) {
                    symbolCounter++;
                } else if (prefer == "#") {
                    let count = Number(codeString[j + 2]);
                    let symbol = codeString[j + 4];
                    
                    for (let m = 0; m < count + 4; m++) {
                        decodedString += symbol;
                    }
                    j += 
                } else if (next == "#") {

                } 
            }
        }

    }

} else if (TYPEOFCODING == "--jump") {

} else {
    console.log("InvalidTypeOfCoding")
}