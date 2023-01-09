/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var stringTextObj = JSON.stringify(scannedTextObj);
    var jsontext = JSON.parse(stringTextObj);
    var BookNum = jsontext[0].ISBN
    var checkFound = false
    var resultNum = 0

    var result = {
        "SearchTerm": searchTerm,
        "Results": [
            {
            "ISBN" : BookNum,
            "Page" : 1,
            "Line" : 1
            },
        ]
    };

    for(let i = 0; i < jsontext[0].Content.length; i++)
    {
        var textInLine = jsontext[0].Content[i].Text
        if(textInLine.includes(" " + searchTerm))
        {
            result.Results[resultNum] = {"ISBN": BookNum, "Page": 1, "Line": 1}

            result.Results[resultNum].ISBN = BookNum
            result.Results[resultNum].Page = jsontext[0].Content[i].Page
            result.Results[resultNum].Line = jsontext[0].Content[i].Line
            checkFound = true
            resultNum++;
            //break;
        }
        
    }

    if(checkFound == false)
    {
        result.Results[resultNum].Page = "Search term not found"
        result.Results[resultNum].Line =  "Search term not found"
    }
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** huckleberryFinn test input object.*/
const huckleberryFinnIn = [
    {
        "Title": "Adventures of Huckleberry Finn",
        "ISBN": "9780470152874",
        "Content": [
            {
                "Page": 7,
                "Line": 17,
                "Text": "Well, when Tom and me got to the edge of the hill-top we looked"
            },
            {
                "Page": 12,
                "Line": 22,
                "Text": "something. I knowed mighty well that a drownded man don’t float"
            }
        ] 
    }
]

/** huckleberryFinn test output object.*/
const huckleberryFinnOut = {
    "SearchTerm": "well",
    "Results": [
        {
            "ISBN": "9780470152874",
            "Page": 12,
            "Line": 22
        }
    ]

}

/** huckleberryFinn test fail object.*/
const huckleberryFinnFail = {
    "SearchTerm": "mustFail",
    "Results": [
        {
            "ISBN": "9780470152874",
            "Page": "Search term not found",
            "Line": "Search term not found"
        }
    ]

}

/** toKillAMockingBird test input object.*/
const toKillAMockingBirdIn = [
    {
        "Title": "To Kill a Mockingbird",
        "ISBN": "9780060888695",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "When he was nearly thirteen, my brother Jem got his arm badly broken at the"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "elbow. When it healed, and Jem’s fears of never being able to play football were "
            },
            {
                "Page": 1,
                "Line": 4,
                "Text": "somewhat shorter than his right; when he stood or walked, the back of his hand "
            },
            {
                "Page": 1,
                "Line": 8,
                "Text": "sometimes discussed the events leading to his accident. I maintain that the Ewells "
            }
        ]
    }
]

/** toKillAMockingBird test output object.*/
const toKillAMockingBirdOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780060888695",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "9780060888695",
            "Page": 1,
            "Line": 4
        },
        {
            "ISBN": "9780060888695",
            "Page": 1,
            "Line": 8
        },
    ]
}


    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Tests */

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** This tests the case-sensitivity of find searchTermInBook. There will be 
 * an uppercase version of the word within the tester set first. My implementation
 * should correctly loop over this capitalized word and find the correct term
 * to pass the test.
 */
const test3result = findSearchTermInBooks("well", huckleberryFinnIn); 
if (JSON.stringify(huckleberryFinnOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", huckleberryFinnOut);
    console.log("Received:", test3result);
}

/**
 * This test case deals with the case of there being no line or text inside the book
 * that contains the search term.
 */
const test4result = findSearchTermInBooks("mustFail", huckleberryFinnIn); 
if (JSON.stringify(huckleberryFinnFail) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", huckleberryFinnFail);
    console.log("Received:", test4result);
}

/**
 * This test case deals with the case of there being multiple search hits within a 
 * content header of a book.
 */
const test5result = findSearchTermInBooks("the", toKillAMockingBirdIn); 
if (JSON.stringify(toKillAMockingBirdOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", toKillAMockingBirdOut);
    console.log("Received:", test5result);
}