usernameArray = ["zefquaavius", "ahm2dsadiq", "rosborn", "lijahrobinson", "ligitelem", "lightninlad", "lightning_warrior", "lightningx",
"lightningsnoop", "lhandroval", "lfialkowski", "legionsforward", "legionowianin", "kverliesaltijd", "kverhenn", "jpskulason", "egaga", "egagoofy", "charder", "binarymelon"];

yearPublished = ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];
gameINFO = [];
gameCategory2 = [];
gameMechanic2 = [];
gameCategory = [];
gameMechanic = [];
typeCategory = [];
typeMechanic = [];
countCategory = [];
countMechanic= [];
bestCategoryC = [];
bestCategoryC2 = [];
bestMechanicC = [];
bestMechanicC2 = [];
topCategory = [];
topMechanic = [];
recomenderCategory = [];
recomenderMechanic = [];
boardgamesId = [];
new_boardgamseId = []
boardgameCategory = [];
boardgameMechanic = [];
boardgamesEmpty = [];
boardgameExpantions = [];
boardgameExpantionsId = [];
boardgameReimplementation = [];
boardgameReimplementationId = [];
new_boardgameExpantionsId = [];
boardgameReimplementationCategory = [];
boardgameReimplementationMechanic = [];
gamesId_InCollections = [];
new_boardgameReimplementationId = [];
recommendationByReimplementations = [];
recommendationBydefult = [];
boardgameExpansionCategory = []
boardgameExpansionMechanic = []
recommendationByExpansions = []
top10= [];
top1INFO = [];
top1Category = [];
top1Mechanic = [];
picTop10 = [];
top10Id = [];
localStorage.rank;


let nameofuser = "";
const username = document.getElementById("UserName");
const message = document.getElementById("message");
new URLSearchParams(window.location.search).forEach((value, name) => {
     username.append(`Your Username : ${value}`);
     nameofuser = `${value}`;  
})
 

loadData(nameofuser);


async function loadData(name) {
    fetch ('https://boardgamegeek.com/xmlapi2/user?name='+name)
    .then (function (response) {
    // Antwort kommt als Text-String
     return response.text();
    })
    .then (function (data) {
    let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
        //console.log (xmlDoc.getElementsByTagName('user'));
        // ##########################################################-USER DONT HAS AN ACCOUNT-###############################################################################
        if (xmlDoc.getElementsByTagName("user")[0].id == "") {
            document.getElementById("message").innerHTML = "Sorry we could not find your profile, please go back to the Homepage check your username and try again";
        } 
        // ##########################################################-USER HAS AN ACCOUNT-###############################################################################
        else {
        // display User Informations
        document.getElementById("informationID").className = "container p-3 my-3 bg-dark text-white";
        document.getElementById("info").innerHTML = "Your information: ";
        document.getElementById("fNamelName").innerHTML = "Name : "+ xmlDoc.getElementsByTagName("user")[0].children[0].attributes.value.textContent +" "+ xmlDoc.getElementsByTagName("user")[0].children[1].attributes.value.textContent;
        document.getElementById("userid").innerHTML = "ID : "+ xmlDoc.getElementsByTagName("user")[0].id;
        document.getElementById("lastLOG").innerHTML = "Last-Login : "+ xmlDoc.getElementsByTagName("user")[0].children[4].attributes.value.textContent;
        document.getElementById("yearR").innerHTML = "Yearregistered : "+ xmlDoc.getElementsByTagName("user")[0].children[3].attributes.value.textContent;
        document.getElementById("provinceCOUNTRY").innerHTML = "Location : "+ xmlDoc.getElementsByTagName("user")[0].children[5].attributes.value.textContent+", "+xmlDoc.getElementsByTagName("user")[0].children[6].attributes.value.textContent;        
        fetch ('https://boardgamegeek.com/xmlapi2/user?name='+name+'&top=1')
        .then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (async function (data) {
        let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
        //check if user has top 10 games :) wow
        // ##########################################################-USER HAS HAVE TOP10 GMAES LIST-###############################################################################
        if( xmlDoc.getElementsByTagName("top").length == 0 )
        {
         seachCollection(name);
        } 
        // ##########################################################-USER HAS TOP10 GMAES LIST-###############################################################################
        else 
        {
        // ##########################################################-USER HAS ONLY ONE ITEM ON TOP10 GMAES LIST-###############################################################################
            if (xmlDoc.getElementsByTagName('top')[0].children.length  < 5) {
                seachCollection(name);
                document.getElementById("message2").innerHTML = "Hier is your top10 games list: ";
                let gameslength = xmlDoc.getElementsByTagName('item').length;
                gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">TopGame</td>'];
                let counter = 0;
                while (counter < gameslength) {
                    top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent]);
                    counter++;
                }
                let count = 0;
                while (count < top10.length) {
                    gamearray.push('<td>'+top10[count][0]+'</td>'+'<td>'+top10[count][1]+'</td>');
                    count++;
                }
                var html2 = '<table class="u-table-entity"><colgroup><col width="22.7%"><col width="25.5%"><col width="26.6%"><col width="25.2%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#infotable').innerHTML = html2;

            }
        // ##########################################################-USER HAS MORE THAN ONE ITEM ON TOP10 GMAES LIST-###############################################################################
            else 
            {
                hotId = [];
            var domain = xmlDoc.getElementsByTagName('top')[0].attributes.domain.textContent;
            let idLength = xmlDoc.getElementsByTagName('item').length;
            let countINFO = 0;
            let id = 0;
            while (countINFO < idLength) {
                if (countINFO == 0) {
                    getInformationAboutTop1(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
                }
                getInformationById(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
                top10Id.push(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
                countINFO++;
            }
            getBoardGamesId(name);
            fetch('https://boardgamegeek.com/xmlapi2/user?name='+name+'&hot=1').then (function (response) {
                // Antwort kommt als Text-String
                return response.text();
                })
                .then (function (data) {
                    let parser = new DOMParser (),
                    xmlDoc2 = parser.parseFromString (data, 'text/xml');
                    //console.log (xmlDoc2.getElementsByTagName('item'));
                    let gameslength = xmlDoc.getElementsByTagName('item').length;
                    let idLength2 = xmlDoc2.getElementsByTagName('item').length;
                    let countINFO2 = 0;
                    //get the id of the hot games from profile
                    while (countINFO2 < idLength2) {
                        hotId.push(xmlDoc.getElementsByTagName('item')[countINFO2].attributes.id.textContent);
                        countINFO2++;
                    }

        // ##########################################################-USER HAS TOP10 GMAES LIST AND HOT GAMES LIST-###############################################################################
                    if (xmlDoc2.getElementsByTagName('hot')[0] != null) {
                        document.getElementById("message").innerHTML = "Your top10 games domain is "+domain+", hier is your top10 and Hot games list: ";

                        gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-1-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">TopGame</td><td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">HotGame</td>'];
                        let gameslength2 = xmlDoc2.getElementsByTagName('item').length;
                        let counter = 0;
                        top10= [];
                        let def = gameslength - gameslength2;
                        if (def != 0) {
                            while (counter < gameslength) {
                                if (counter < gameslength2) {
                                    top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.name.textContent]);
                                } else {
                                    top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent, "       ", "         "]);
                                }
                                counter++;
                            }
                        } else {
                            while (counter < gameslength2) {
                                top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc2.getElementsByTagName('item')[counter].attributes.name.textContent]);
                                counter++;
                            }
                        }
                        let count = 0;
                        while (count < top10.length) { //onclick="location.href='yourpage.html'"
                            // '<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+top10Id[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'
                            gamearray.push('<td>'+top10[count][0]+'</td><td>'+'<img src='+top10[count][1]+' style="width:250px;height:180px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+top10Id[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+top10[count][2]+'</td>'+'<td>'+top10[count][3]+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotId[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+top10[count][4]+'</td>');
                            count++;        
                        }
                        var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><col width="5.2%"><col width="46.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                        gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                        document.querySelector('#mytablemustcomehere').innerHTML = html;
                        document.getElementById("message_loading").innerHTML = "It might take some time, please wait until we find the best recommendation for you :)"

                    }
        // ##########################################################-USER HAS ONLY ONE TOP10 GMAES LIST-###############################################################################
                    else
                    {
                        document.getElementById("message").innerHTML = "Your top10 games domain is "+domain+", hier is your top10 games list: ";

                        gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-1-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">TopGame</td>'];
                        let counter = 0;
                        top10= [];
                        while (counter < gameslength) {
                            top10.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent,picTop10[counter], xmlDoc.getElementsByTagName('item')[counter].attributes.name.textContent]);
                            counter++;
                        }
                        let count = 0;
                        while (count < top10.length) {
                            gamearray.push('<td>'+top10[count][0]+'</td><td>'+'<img src='+top10[count][1]+' style="width:250px;height:200px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+top10Id[count]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+top10[count][2]+'</td>');
                            count++;
                        }
                        var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="25.5%"><col width="25.5%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                        gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                        document.querySelector('#mytablemustcomehere').innerHTML = html;
                        document.getElementById("message_loading").innerHTML = "It might take some time, please wait until we find the best recommendation for you :)"

                    }
                    displayHotGames();

                    
                }).catch (function (error) {
                    console.log ("Fehler: please check the function loadData IN1 :) " + error);
            });
        }
    }
        }).catch (function (error) {
        console.log ("Fehler: please check the function loadData IN2 :) " + error);
       });
    }
    }).catch (function (error) {
        console.log ("Fehler: please check the function loadData IN3 :) " + error);
       });
    }

async function displayHotGames() {
    //hotgames
    const respone = await fetch(`/hotgames`);
    const data = await respone.json();
    let parser = new DOMParser (),
    xmlDoc = parser.parseFromString (data, 'text/xml');
    hotgamearray = [];
    let gameslength = xmlDoc.getElementsByTagName('item').length;
    let counter = 0;
    hotgames= [];
    while (counter < gameslength) {
        hotgames.push([xmlDoc.getElementsByTagName('item')[counter].attributes.rank.textContent, xmlDoc.getElementsByTagName('item')[counter].attributes.id.textContent, xmlDoc.getElementsByTagName('thumbnail')[counter].attributes.value.textContent]);
        counter++;
    }
    let count = 0;
    while (count < gameslength) {
        hotgamearray.push('<div onclick="location.href=\'https://boardgamegeek.com/boardgame/'+hotgames[count][1]+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+'<img src='+hotgames[count][2]+' style="width:350px;height:300px;"></img>' +'</div>');
        count++; 
    }
    document.getElementById("loading").className ="loading_Recommendation"
    document.getElementById("enjoyHotGames").innerHTML ="See our list of the Hot-50 board games while waiting";
    document.getElementById("Hot").className ="hotgamesList"    
    document.querySelector('#Hot').innerHTML = hotgamearray;
}

async function checkCollectionForRecommendation(username) {
        let name = username;
        const respone = await fetch(`/collection/${name}`);
        const data = await respone.json();
        let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
        //console.log (xmlDoc.getElementsByTagName('item').length);
        let len = xmlDoc.getElementsByTagName('item').length;
        //console.log(len)
        for (let i = 0; i <boardgameReimplementation.length; i++) {
            //console.log(boardgameReimplementation[i])
        }
        if (len > 0) {
            for ( let i = 0; i < len; i++) {
                gamesId_InCollections.push(xmlDoc.getElementsByTagName('item')[i].attributes.objectid.textContent)
            }
    
            for ( let i = 0; i < boardgameReimplementationId.length; i++) {
                if((!gamesId_InCollections.includes(boardgameReimplementationId[i])) && (!top10Id.includes(boardgameReimplementationId[i]))) {
                    new_boardgameReimplementationId.push(boardgameReimplementationId[i])
                }
            }
            if (new_boardgameReimplementationId.length > 0) {
                //console.log("REIMPLEMENTAIONS")
                term_int = 2;
                //console.log(new_boardgameReimplementationId.length)
                let term = false;
                get_Category_Mechanic_From_Boardgames(new_boardgameReimplementationId, boardgameReimplementationCategory, boardgameReimplementationMechanic, recommendationByReimplementations, boardgameReimplementation, term,term_int, name)

            } else {
                //console.log("EXPANSIONS")
                for ( let i = 0; i < boardgameExpantionsId.length; i++) {
                    if((!gamesId_InCollections.includes(boardgameExpantionsId[i])) && (!top10Id.includes(boardgameReimplementationId[i]))) {
                        new_boardgameExpantionsId.push(boardgameExpantionsId[i])
                    }
                }
                if ( new_boardgameExpantionsId.length > 0) {
                    let term = false;
                    term_int = 1;
                    get_Category_Mechanic_From_Boardgames(new_boardgameExpantionsId, boardgameExpansionCategory, boardgameExpansionMechanic, recommendationByExpansions, boardgameExpantions, term,term_int, name);
                } else {
                    //console.log("NO EXPANSIONS NO REIMPLEMENTAIONS")
                    for ( let i = 0; i < boardgamesId.length; i++) {
                        if((!gamesId_InCollections.includes(boardgamesId[i])) && (!top10Id.includes(boardgameReimplementationId[i]))) {
                            new_boardgamseId.push(boardgamesId[i])
                        }
                    }
                    let term=false;
                    let term_int = 3;
                    get_Category_Mechanic_From_Boardgames(new_boardgamseId, boardgameCategory, boardgameMechanic, recommendationBydefult,boardgamesEmpty, term, term_int, name)
                }
            }
        } else {
            if (boardgameReimplementationId.length > 0) {
                //console.log("REIMPLEMENTAIONS NO COLLECTION")

                term_int = 2;
                let term = false;
                get_Category_Mechanic_From_Boardgames(boardgameReimplementationId, boardgameReimplementationCategory, boardgameReimplementationMechanic, recommendationByReimplementations, boardgameReimplementation, term,term_int, name)
               
            } else {
                if (boardgameExpantionsId.length > 0) {
                    //console.log("EXPANSION NO COLLECTION")
                    let term = false;
                    term_int = 1;
                   //console.log(new_boardgameExpantionsId.length)
                    get_Category_Mechanic_From_Boardgames(boardgameExpantionsId, boardgameExpansionCategory, boardgameExpansionMechanic, recommendationByExpansions, boardgameExpantions, term,term_int, name);
                }
            }
           
        }

}

function wait(millS) {
    return new Promise(resolve => setTimeout(resolve, millS));
}

async function get_Category_Mechanic(data, id, arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name, term_change_R){
    //fetch_retry_Category_Mechanic(data,arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name)
    let rec = [];
    let similar = [];
    //console.log (data);
    let parser = new DOMParser (),
    xmlDoc = parser.parseFromString (data, 'text/xml');
    //console.log (xmlDoc.getElementsByTagName('link'));
    let len = xmlDoc.getElementsByTagName('link').length;
    let count = 0;
    while (count < len) {
        if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {
                if (!arr1.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                    arr1.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                }
        }
            if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {
                if (!arr2.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                    arr2.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                }
        }
        count++;
    }
    let count1 = 0;
    for ( let i = 0; i < arr1.length; i++) {
        if (recomenderCategory.includes(arr1[i])) {
            count1++;
        }
    }
    let count2 = 0;

    for ( let i = 0; i < arr2.length; i++) {
        if (recomenderMechanic.includes(arr2[i])) {
            count2++;
        }
    }
    while(arr1.length > 0) {
        arr1.pop();
    }
    while(arr2.length > 0) {
        arr2.pop();
    }
    if (count1 > 1) {
        arr3.push([`${id}`, count1])
    }
    if (count2 > 0) {
        ex_arr.push([`${id}`, count2])
    }
    
    if (id == arr[arr.length-1]) {
        term = true;
    }
    if (term == true) {
        if (arr3.length == 0) {
            arr3 = ex_arr;
        }
        getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
    }
    //console.log(count1)
    //console.log(count2)
    //console.log(term_change_R)
    switch (term_change_R) {
        case 0:
            if (term2 == 1) {
                if( (count1 >= 3) && (count2 >= 3)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
            if (term2 == 3) {
                if( (count1 >= 2) && (count2 > 0)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
          break;
        case 1:
            if (term2 == 1) {
                if( (count1 >= 2) && (count2 >= 2)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
            if (term2 == 3) {
                if( (count1 >= 1) && (count2 > 0)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
          break;
        case 2:
            if (term2 == 1) {
                if( (count1 >= 1) && (count2 >= 1)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
            if (term2 == 3) {
                if( (count1 > 0) && (count2 > 0)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
          break;
        default:
            document.getElementById("sorry").innerHTML ="we are sorry to let you wait too long, we will try to make it faster next time ;)";
            if (term2 == 1) {
                if( (count1 > 0) && (count2 > 0)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
            if (term2 == 3) {
                if( (count1 > 0) && (count2 > 0)) {
                    displayRecommendation(id, arr4, term2);
                }
            }
          break;
      }
    count1 = 0;
    count2 = 0;
    
}

async function get_Category_Mechanic_From_Boardgames(arr, arr1, arr2, arr3, arr4, term, term2, name) {
    ex_arr = [];
    console.log(arr.length)
    console.log("TIME")
    var start = Date.now();
    mix_ids(arr)
    for (let i = 0; i < arr.length; i++){
        let id = arr[i];

        if(document.getElementById("message_loading").innerHTML == "thank you for waiting :)") {
           
            break;
        }

        const respone = await fetch(`/CategoryMechanic/${id}`);
        const data = await respone.json();
        //console.log(time_mill)
        var end = Date.now();
        //console.log(`Execution time: ${end - start} ms`);
        let timer = end - start;
        //console.log(timer)
        if ((timer  >= 10000) && ( timer < 15000)) {
            get_Category_Mechanic(data, id, arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name, 1)
        }
        if ((timer >= 15000) && (timer < 20000)) {
            get_Category_Mechanic(data, id, arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name, 2)
        }
        if (timer >= 20000) {
            get_Category_Mechanic(data, id, arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name, 3)
        }
        
        get_Category_Mechanic(data, id, arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name, 0)
    }
}
function mix_ids(arr) {
    arr.sort(() => Math.random() - 0.5);
}

async function getRecommendationWithHighSimilarity_Category_Mechanic(name, arr, arr2, term) { //recommendationByReimplementations,
    fetch('https://boardgamegeek.com/xmlapi2/plays?username='+name+'&subtype=boardgame&mindate=2022.01.01').then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            let rec = [];
            let similar = [];
            //console.log (data);
            let parser = new DOMParser (),
            xmlDoc2 = parser.parseFromString (data, 'text/xml');

            for (let j = 0; j < arr.length; j++) {
                rec.push(arr[j][1])
            }

            rec.sort(function(a, b){return b-a});
            console.log("rECCCCC BEGIN")
            for ( let i = 0 ; i < rec.length; i++) {
                console.log(rec[i])
            }
            console.log("rECCCCC End")

            
            if (rec.length == 0) {
                //console.log("check rec list please")

            } else {
                //console.log(recommendationByReimplementations.length)
                for ( let i = 0; i <arr.length; i++) {
                    //console.log(arr[i])
                }
                let id;

                for (let i = 0; i < arr.length; i++) {
                    if (rec[0] == arr[i][1]){
                        id = arr[i][0]
                    }                    
                }
                console.log(rec[0])

                displayRecommendation(id, arr2, term);
            }

        }).catch (function (error) {
            console.log ("Fehler: please check the function checkSim :) " + error);
           });
        

}

async function displayRecommendation(id, arr, term) {
    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            //console.log (data);
            let recommendedGameCategory = [];
            let recoomendedGameMechanic = [];
            let Game_Name;
            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            let len = xmlDoc.getElementsByTagName('link').length;
            //console.log(xmlDoc.getElementsByTagName('image'))
            let pic = xmlDoc.getElementsByTagName('image')[0].innerHTML;

            let count = 0;
            while (count < len) {

                
                if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {

                        if (!recommendedGameCategory.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            recommendedGameCategory.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                        }
                }
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {

                        if (!recoomendedGameMechanic.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            recoomendedGameMechanic.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                        }
                }
                count++;

            }
            //console.log(xmlDoc.getElementsByTagName('name'))
            let len2 = xmlDoc.getElementsByTagName('name').length;

            for ( let i = 0; i < len2; i++) {
                if (xmlDoc.getElementsByTagName('name')[i].attributes.type.textContent == "primary") {
                    Game_Name = xmlDoc.getElementsByTagName('name')[i].attributes.value.textContent;
                }
            }
            
            Is_Fit(recommendedGameCategory,recoomendedGameMechanic,Game_Name, id, pic, arr, term);

        }).catch (function (error) {
            console.log ("Fehler: please check the function displayRecommendation :) " + error);
        });
}

async function Is_Fit(recommendedGameCategory,recoomendedGameMechanic, Game_Name, id, pic, arr, term) {
    let tablerec = []
    let rank;
    let top1_fit_category = 0;

    for ( let i = 0; i < top1Category.length; i++) {
        for (let j = 0; j < recommendedGameCategory.length; j++) {
            if (recommendedGameCategory[j] == top1Category[i]) {
                top1_fit_category++;
            }
        }
    }

    let top1_fit_mechanic = 0;

    for ( let i = 0; i < top1Mechanic.length; i++) {
        for (let j = 0; j < recoomendedGameMechanic.length; j++) {
            if (recoomendedGameMechanic[j] == top1Mechanic[i]) {
                top1_fit_mechanic++;
            }
        }
    }
    let r = recomenderCategory.length;
    let m = recomenderMechanic.length;
    
        if (term != 3) {
            let name_ReimplFor;
            for ( let i = 0; i < arr.length; i++) {
                if (arr[i][0] == id) {
                    name_ReimplFor = arr[i][1];
                    break;
                }
            }
            
            for (let i = 0; i < top10.length; i++) {
                if(top10[i][2] == name_ReimplFor) {
                    localStorage.rank = top10[i][0];
                    break;
                }
            }


            //console.log(term)

            let message_Reimp_Exp;
            if ( term == 1) {
                message_Reimp_Exp = "it's an Expansion of the game "+name_ReimplFor;
            }

            if ( term == 2) {
                message_Reimp_Exp = "it's a Reimplemented-game of the game "+name_ReimplFor;
            }



            if ((top1_fit_category != ((top1Category.length/2)+1)) && (top1_fit_mechanic != ((top1Mechanic.length/2)))) {
                document.getElementById("message_loading").innerHTML = "thank you for waiting :)"
                document.getElementById("loading").className ="#"
                document.getElementById("recommededgameMessage").innerHTML = "Hey "+ nameofuser+ " because you have "+name_ReimplFor+" in your top10-games list, we recommend the following game for you, "+message_Reimp_Exp +" and it should takes the following rank for you, HAVE FUN: ";
                tablerec = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-3-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Recommended</td>'];
            //<img src="C:\Pics\H.gif" alt="" border=3 height=100 width=100></img>
                tablerec.push('<td>'+localStorage.rank+'</td>'+'<td>'+'<img src='+pic+' style="width:350px;height:300px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+id+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+Game_Name+'</td>');
            
                var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                tablerec.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#recommededgame').innerHTML = html;

            }else {
                document.getElementById("message_loading").innerHTML = "thank you for waiting :)"
                document.getElementById("loading").className ="#"
                document.getElementById("recommededgameMessage").innerHTML = "Hey "+ nameofuser+ " because you have "+name_ReimplFor+" as the first top game in your  list, we recommend the following game for you, and it should takes the following rank for you, HAVE FUN: ";
                tablerec = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Recommended</td>'];
            
                tablerec.push('<td>'+'1'+'</td>'+'<td>'+'<img src='+pic+' style="width:350px;height:300px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+id+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+Game_Name+'</td>');
            
                var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                tablerec.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#recommededgame').innerHTML = html;

        }

        } else {
            document.getElementById("message_loading").innerHTML = "thank you for waiting :)"
            document.getElementById("loading").className ="#"
            if ((top1_fit_category != ((top1Category.length/2)+1)) && (top1_fit_mechanic != ((top1Mechanic.length/2)))) {
                document.getElementById("recommededgameMessage").innerHTML = "Hey "+ nameofuser+ ", we recommend the following game for you, HAVE FUN: ";
                tablerec = ['<td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-3-base u-table-cell u-table-cell-2">Picture</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Recommended</td>'];
            //<img src="C:\Pics\H.gif" alt="" border=3 height=100 width=100></img>
                tablerec.push('<td>'+'<img src='+pic+' style="width:350px;height:300px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+id+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+Game_Name+'</td>');
            
                var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                tablerec.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#recommededgame').innerHTML = html;

            }else {
                document.getElementById("message_loading").innerHTML = "thank you for waiting :)"
                document.getElementById("loading").className ="#"
                document.getElementById("recommededgameMessage").innerHTML = "Hey "+ nameofuser+ ", we recommend the following game for you, and it should takes the following rank for you, HAVE FUN: ";
                tablerec = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Recommended</td>'];
            
                tablerec.push('<td>'+'1'+'</td>'+'<td>'+'<img src='+pic+' style="width:350px;height:300px;"></img>'+'</td>'+'<td onclick="location.href=\'https://boardgamegeek.com/boardgame/'+id+'\'" style="cursor:pointer" target="_blank" rel="noopener noreferrer">'+Game_Name+'</td>');
            
                var html = '<table class="u-table-entity"><colgroup><col width="5.2%"><col width="35.5%"><col width="26.6%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                tablerec.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                document.querySelector('#recommededgame').innerHTML = html;
            }   
        }
}

async function getInformationAboutTop1(id) {

    //https://boardgamegeek.com/xmlapi2/thing?id=25554&comments=1
    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            //console.log (data);

            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            //console.log (xmlDoc.getElementsByTagName('link'));
            top1INFO.push([xmlDoc.getElementsByTagName('maxplayers')[0].attributes.value.textContent, xmlDoc.getElementsByTagName('minplayers')[0].attributes.value.textContent,
            xmlDoc.getElementsByTagName('minage')[0].attributes.value.textContent, xmlDoc.getElementsByTagName('description')[0].textContent])
            let len = xmlDoc.getElementsByTagName('link').length;
            let count = 0;
            while (count < len) {

                
                if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {

                        if (!top1Category.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            top1Category.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                        }
                }
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {

                        if (!top1Mechanic.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            top1Mechanic.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                        }
                }
                count++;
            }
        }).catch (function (error) {
            console.log ("Fehler: please check the function getInformationAboutTop1 :) " + error);
           });
    
    
    


}

async function searchByExpansionsAndImplementation(name) {
    for(let i = 1; i < top10Id.length; i++) {
        let id = top10Id[i];
        const respone = await fetch(`/ExpansionsAndImplementation/${id}`);
        const data = await respone.json();
        //console.log("#######################");
        //console.log(data)
        //console.log(typeof data)
        let ExpID = [];
        let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
        //console.log (xmlDoc.getElementsByTagName('link'));
        let len = xmlDoc.getElementsByTagName('link').length;
        let OrgGame_Name;
        let len2 = xmlDoc.getElementsByTagName('name').length;
        //console.log(len);
        for ( let i = 0; i < len2; i++) {
            if (xmlDoc.getElementsByTagName('name')[i].attributes.type.textContent == "primary") {
                OrgGame_Name = xmlDoc.getElementsByTagName('name')[i].attributes.value.textContent;
            }
        }

        let count = 0;

        while (count < len) {

                if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgameimplementation") {
                    boardgameReimplementationId.push(xmlDoc.getElementsByTagName('link')[count].attributes.id.textContent);
                    boardgameReimplementation.push([xmlDoc.getElementsByTagName('link')[count].attributes.id.textContent, OrgGame_Name]);
                    
                }

                if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgameexpansion") {
                    boardgameExpantionsId.push(xmlDoc.getElementsByTagName('link')[count].attributes.id.textContent)
                    boardgameExpantions.push([xmlDoc.getElementsByTagName('link')[count].attributes.id.textContent, OrgGame_Name])

                    //ExpID.push(xmlDoc.getElementsByTagName('link')[count].attributes.id.textContent);
                    //check_year_of_Expansions(xmlDoc.getElementsByTagName('link')[count].attributes.id.textContent, OrgGame_Name);
                }
               
            
            count++;
        }


    }
    checkCollectionForRecommendation(name)

}

    async function getSimilarityBetweenItemsForCollaborativeApproach() {
        
        recomenderMechanic = [];
        recomenderCategory = [];
        //################################################################# GAME CATEGORY ##############################################################
        for (let i=0; i < typeCategory.length; i++) {
            let counting = 0;
            for(let j = 1; j < gameCategory.length; j++) {

                if (String(gameCategory[j]).includes(typeCategory[i]) == true) {
                    counting++;
                }
            }
            countCategory.push([typeCategory[i] ,counting]);
        }
        
        for (let i = 0; i < countCategory.length; i++) {
            bestCategoryC.push(countCategory[i][1]); 
        }
        bestCategoryC.sort(function(a, b){return b-a});
       
    
        for ( let i = 0; i < bestCategoryC.length; i++) {
            if (i < 3) {
                bestCategoryC2.push(bestCategoryC[i]);

            } else {
                break;
            }
        }
      
        for (let i = 0; i < bestCategoryC2.length; i++) {
            for(let j = 0; j < countCategory.length; j++) {
                if(countCategory[j][1] == bestCategoryC2[i]) {
                    if (!topCategory.includes(countCategory[j])){
                        if (!topCategory.includes(countCategory[j][1])) {
                            topCategory.push(countCategory[j]);

                        }

                    }
                }
            }
        }
    
        for (let i = 0; i < topCategory.length; i++) {
            if (recomenderCategory.length < 4) {
                recomenderCategory.push(topCategory[i][0]);
            }
        }
//################################################################# GAME MECHANIC ##############################################################
        for (let i=0; i < typeMechanic.length; i++) {
            let counting = 0;
            for(let j = 1; j < gameMechanic.length; j++) {

                if (String(gameMechanic[j]).includes(typeMechanic[i]) == true) {
                    counting++;
                }
            }
            countMechanic.push([typeMechanic[i] ,counting]);
        }
        
        for (let i = 0; i < countMechanic.length; i++) {
            bestMechanicC.push(countMechanic[i][1]); 
        }
        bestMechanicC.sort(function(a, b){return b-a});
        
    
        for ( let i = 0; i < bestMechanicC.length; i++) {
            if (i < 3) {
                bestMechanicC2.push(bestMechanicC[i]);

            } else {
                break;
            }
        }

        for (let i = 0; i < bestMechanicC2.length; i++) {
            for(let j = 0; j < countMechanic.length; j++) {
                if(countMechanic[j][1] == bestMechanicC2[i]) {
                    if (!topMechanic.includes(countMechanic[j])){
                        topMechanic.push(countMechanic[j]);

                    }
                }
            }
        }

        for (let i = 0; i < topMechanic.length; i++) {
            if(recomenderMechanic.length < 4) {
                recomenderMechanic.push(topMechanic[i][0]);
            }
        }
    }


    async function getInformationById(id) {
        //https://boardgamegeek.com/xmlapi2/thing?id=25554&comments=1
        fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
            // Antwort kommt als Text-String
            return response.text();
            })
            .then (function (data) {
                //console.log (data);

                let parser = new DOMParser (),
                xmlDoc = parser.parseFromString (data, 'text/xml');
                //console.log (xmlDoc.getElementsByTagName('link'));
                gameINFO.push([xmlDoc.getElementsByTagName('maxplayers')[0].attributes.value.textContent, xmlDoc.getElementsByTagName('minplayers')[0].attributes.value.textContent,
                xmlDoc.getElementsByTagName('minage')[0].attributes.value.textContent, xmlDoc.getElementsByTagName('description')[0].textContent])
                let len = xmlDoc.getElementsByTagName('link').length;
                picTop10.push(xmlDoc.getElementsByTagName('image')[0].innerHTML)

                let count = 0;
                while (count < len) {

                    
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {

                        gameCategory2.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                            if (!typeCategory.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                typeCategory.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                            }
                    }
                        if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {
                        gameMechanic2.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                            if (!typeMechanic.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                typeMechanic.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                            }
                    }
                    count++;
                }

                
                //typeCategory
                //typeMechani
                gameCategory.push([gameCategory2]);
                gameMechanic.push([gameMechanic2]);

                gameCategory2 = [];
                gameMechanic2 = [];



            }).catch (function (error) {
                console.log ("Fehler: please check the function getInformationById :) " + error);
               });


    }

    // get the 1000 available boardgames on BGG & the hot 50 games
    async function getBoardGamesId(name) {
        const respone = await fetch('/boardgames');
        //console.log("ddddddddddddd2222222222222222222");
        const data = await respone.json();
        //console.log(data)
        //console.log(typeof data)
        let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
        //console.log (xmlDoc.getElementsByTagName('yearpublished'));
        let len = xmlDoc.getElementsByTagName('yearpublished').length;
        let count = 0;
        while ( count < len) {
            //console.log(xmlDoc.getElementsByTagName('yearpublished')[count].attributes.value.textContent)
            if ((yearPublished.includes(xmlDoc.getElementsByTagName('yearpublished')[count].attributes[0].textContent)) && (!top10Id.includes(xmlDoc.getElementsByTagName('item')[count].attributes.id.textContent))) {    
                boardgamesId.push(xmlDoc.getElementsByTagName('item')[count].attributes.id.textContent);
            }
            count++;


        }
        getSimilarityBetweenItemsForCollaborativeApproach()
        searchByExpansionsAndImplementation(name);
          
    }

    

    async function seachCollection(name) {

    // fetch-Aufruf mit Pfad zur XML-Datei
    fetch ('https://boardgamegeek.com/xmlapi2/collection?username='+name+'&rated=[1,10]')
    .then (function (response) {
    // Antwort kommt als Text-String
     return response.text();
    })
    .then (function (data) {
    console.log (data);			  // schnell mal in der Konsole checken
    
     // String in ein XML-DOM-Objekt umwandeln
    let parser = new DOMParser (),
        xmlDoc = parser.parseFromString (data, 'text/xml');
    
    //und noch ein paar Test-Ausgaben in die Konsole
    console.log(xmlDoc.getElementsByTagName('item').length)
    if ( xmlDoc.getElementsByTagName('item').length == 0) {
        console.log("what")
        document.getElementById("message").innerHTML = "You might be a new user because you dont have a list of your top10 games, also no collection found in your account. We offer you the Hot50 games, please press on continue to get the list of the hot 50 games, HAVE FUN :) ";
        var hotitem = '<form action="/public/views/index3.html" method="GET" style="padding: 15px;" source="custom" name="form">'+
        '<a href="/public/views/index3.html" class="u-border-none u-btn u-btn-submit u-button-style u-custom-font u-palette-1-base u-btn-10">Continue</a>'+
      '</form>';
        
        
        document.querySelector('#formHOT').innerHTML = hotitem;

        
    } else {
        
    document.getElementById("message").innerHTML = "You dont have a list of your top10 games, but according to your collection your top"+xmlDoc.getElementsByTagName('name').length  +" games in your collection is/are:";
    if (xmlDoc.getElementsByTagName('item').length == 1) {

        document.getElementById("message2").innerHTML = "You might be a new user because you have only one item  in your  collection. We offer you the Hot50 games, please press on continue to get the list of the hot 50 games, HAVE FUN :) ";
        var hotitem = '<form action="/public/views/index3.html" method="GET" style="padding: 15px;" source="custom" name="form">'+
        '<a href="/public/views/index3.html" class="u-border-none u-btn u-btn-submit u-button-style u-custom-font u-palette-1-base u-btn-10">Continue</a>'+
      '</form>';
        
        
        document.querySelector('#formHOT').innerHTML = hotitem;
    } else {
    //console.log(xmlDoc.getElementsByTagName('item'))
    let itemsId = [];
    let items = [];
    let len = xmlDoc.getElementsByTagName('item').length;
    for (let i = 0; i < len; i++) {
        //console.log(xmlDoc.getElementsByTagName('item')[i].attributes.objectid.textContent)
        //console.log(xmlDoc.getElementsByTagName('name')[i].textContent)

        items.push([xmlDoc.getElementsByTagName('item')[i].attributes.objectid.textContent, xmlDoc.getElementsByTagName('name')[i].textContent])
    }
    
    gamearray = ['<td class="u-align-left u-first-column u-palette-2-base u-table-cell">Rank</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-4-base u-table-cell u-table-cell-2">Game</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-1-base u-table-cell u-table-cell-3">Rating</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-3-base u-table-cell u-table-cell-4">Owned</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-3-base u-table-cell u-table-cell-4">Want to play</td><td class="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-palette-3-base u-table-cell u-table-cell-4">type</td>'];
    let gameslength = xmlDoc.getElementsByTagName('name').length;
    let ratingarray = [];
    ratedgames = [];
    ratedgamesrank  = [];
    let ratedgamesranksort = [];
    let top10games = [];
   
    let counter = 0;
    ratedgamesrank.pop();
    while (counter < gameslength) {
        if (xmlDoc.getElementsByTagName('rating')[counter].attributes.value.textContent == undefined) {
            counter = gameslength;
        }
        //check if the user own the game
        //if (xmlDoc.getElementsByTagName('status')[counter].attributes.own.textContent == 1) { 
            ratedgamesrank.push([parseInt(xmlDoc.getElementsByTagName('rating')[counter].attributes.value.textContent),xmlDoc.getElementsByTagName('name')[counter].textContent, 
            xmlDoc.getElementsByTagName('status')[counter].attributes.own.textContent,  xmlDoc.getElementsByTagName('status')[counter].attributes.wanttoplay.textContent,xmlDoc.getElementsByTagName('item')[counter].attributes.subtype.textContent,
            xmlDoc.getElementsByTagName('status')[counter].attributes.wanttobuy.textContent,
            xmlDoc.getElementsByTagName('status')[counter].attributes.want.textContent, xmlDoc.getElementsByTagName('status')[counter].attributes.wishlist.textContent,xmlDoc.getElementsByTagName('status')[counter].attributes.fortrade.textContent,
            xmlDoc.getElementsByTagName('status')[counter].attributes.prevowned.textContent, xmlDoc.getElementsByTagName('status')[counter].attributes.preordered.textContent]);
            // xmlDoc.getElementById('stats').attributes.maxplayers.textContent (maxplaytime) :( not working  the idea was to collect the similarity between the top 2-10 games 
    

        counter++;

    }
    //###################################################### WANT TO PLAY ################################################################
    /*
    let counterWTP = 0;
    wanttoplaylist = []
    while (counterWTP < gameslength) {
        if (xmlDoc.getElementsByTagName('rating')[counterWTP].attributes.value.textContent == undefined) {
            countcounterWTPer = gameslength;
        }
        //check if the user own the game
        if (xmlDoc.getElementsByTagName('status')[counter].attributes.wanttoplay.textContent == 1) {
            wanttoplaylist.push([parseInt(xmlDoc.getElementsByTagName('rating')[counter].attributes.value.textContent),xmlDoc.getElementsByTagName('name')[counter].textContent, 
            xmlDoc.getElementsByTagName('status')[counter].attributes.own.textContent]);
        
        }
            counterWTP++;

    }
    */
    
    // xmlDoc.getElementsByTagName('status')[counter].attributes.own.value
    for (let i = 0; i < ratedgamesrank.length; i++) {
        ratedgamesranksort.push(ratedgamesrank[i][0]);
    }

    
    ratedgamesranksort.sort(function(a, b){return a-b});
    
    
    for (let j = 0; j < ratedgamesranksort.length; j++) {
        if ( top10games.length < 11) {
            top10games.push(ratedgamesranksort[ratedgamesranksort.length-(j+1)]);

        }
    }
    
    output = [];
    for (let u = 0; u < ratedgamesrank.length; u++) {
        for (let c = 0; c < top10games.length; c++) {
            if(top10games[c] == ratedgamesrank[u][0]) {
                output.push(ratedgamesrank[u])
                break;
            }
        }
       
    }

    sortTOP10GAMES(output);

    let count = 0;
    while (count < output.length) {
            top10. push([count+1, output[count][1]])
            if (output[count][2] == "1") {
                gamearray.push('<td>'+(count+1)+'</td><td>'+output[count][1]+'</td><td>'
                +output[count][0]+'</td><td>'
                +'Yes'+'</td><td>'+ output[count][3]+'</td>'+'<td>'+output[count][4]+'</td>');
            } else {
                gamearray.push('<td>'+(count+1)+'</td><td>'+output[count][1]+'</td><td>'
                +output[count][0]+'</td><td>'
                +'Yes'+'</td><td>'+ output[count][3]+'</td>'+'<td>'+output[count][4]+'</td>');
            }
     
         count++;
        
    }

    for (let i =0; i < output.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (output[i][1] == items[j][1]) {
                itemsId.push(items[j][0]);
            }
        }
    }
    //console.log("fffffffffff")
    //itemsId.forEach(element => console.log(element));
    
    let countINFO = 0;

    while (countINFO < itemsId.length) {
        if (countINFO == 0) {
            getInformationAboutTop1(itemsId[countINFO]);
        }
        getInformationById(itemsId[countINFO]);
        countINFO++;
    }
    getBoardGamesId();
    fetch('https://boardgamegeek.com/xmlapi2/hot?type=boardgame').then (function (response) {
            // Antwort kommt als Text-String
            return response.text();
            })
            .then (function (data) {
                //console.log (data);

                let parser = new DOMParser (),
                xmlDoc = parser.parseFromString (data, 'text/xml');
                getSimilarityBetweenItemsForCollaborativeApproach();
                checkCollectionForRecommendation(name)
                
    }).catch (function (error) {
        console.log ("Fehler: please check the code :) " + error);
    });
    var html = '<table class="u-table-entity"><colgroup><col width="22.7%"><col width="25.5%"><col width="26.6%"><col width="25.2%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
     gamearray.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
    
    document.querySelector('#mytablemustcomehere').innerHTML = html;
    //console.log ("item "  + xmlDoc.getElementsByTagName ('item')[1].children[0].textContent);
    }    
}

    //comicToday (xmlDoc);			// Funktion zur Bearbeitung mit dem geparsten xmlDoc aufrufen	
    }).catch (function (error) {
     console.log ("Fehler: please check the code :) " + error);
    });
    }


    async function sortTOP10GAMES(output) {
        for (let m = 0; m < output.length; m++) {
            for (let n = m+1; n < output.length; n++) {
                let gameNRO;
                if (output[m][0] < output[n][0]) {
                    gameNRO = output[m];
                    output[m] = output[n];
                    output[n] = gameNRO;
                }
            }
        }
        if (output.length > 10) {
            let count = output.length - 10;
            for(let v = 0; v < count; v++) {
                output.pop();
            }
        }
    }

    async function get_Top_2_10_games(games) {
        for (let i = 0; i < games.length; i++) {
            if ( i != (games.length - 1)) {
                games[i] = games[i+1]
            }
        }
        games.pop();
        

    }

    async function getRecommendation(games, topgames) {
        maxplayers_for_recommendation = [];
        for (let j = 0; j < topgames; j++) {
            
        }
        
        
        
        
        new_games = [];
        for ( let i = 0; i < games.length; i++) {
            if (!(games[i][8] == 1) || (gamse[i][9] == 0)) {
                if ((games[i][3] == 1) || (games[i][4] == 1) || (games[i][5] == 1)) {
                    new_games[i] = games[i];
                }
            }
        }
        
    }








/*
IMPORTANT :)

                id = xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent;
                const respone = await fetch(`/CategoryMechanic/${id}`);
                const data = await respone.json();
                let parser = new DOMParser (),
                xmlDoc_tpo = parser.parseFromString (data, 'text/xml');
                if (countINFO == 0) {
                    //console.log (xmlDoc.getElementsByTagName('link'));
                    top1INFO.push([xmlDoc_tpo.getElementsByTagName('maxplayers')[0].attributes.value.textContent, xmlDoc_tpo.getElementsByTagName('minplayers')[0].attributes.value.textContent,
                    xmlDoc_tpo.getElementsByTagName('minage')[0].attributes.value.textContent, xmlDoc_tpo.getElementsByTagName('description')[0].textContent])
                    let len = xmlDoc_tpo.getElementsByTagName('link').length;
                    let count_t = 0;
                    while (count_t < len) {
                        if (xmlDoc_tpo.getElementsByTagName('link')[count_t].attributes.type.textContent == "boardgamecategory") {
                                if (!top1Category.includes(xmlDoc_tpo.getElementsByTagName('link')[count_t].attributes.value.textContent)) {
                                    top1Category.push(String(xmlDoc_tpo.getElementsByTagName('link')[count_t].attributes.value.textContent));
                                }
                        }
                            if (xmlDoc_tpo.getElementsByTagName('link')[count_t].attributes.type.textContent == "boardgamemechanic") {
                                if (!top1Mechanic.includes(xmlDoc_tpo.getElementsByTagName('link')[count_t].attributes.value.textContent)) {
                                    top1Mechanic.push(String(xmlDoc_tpo.getElementsByTagName('link')[count_t].attributes.value.textContent));
                                }
                        }
                        count_t++;
                    }
                    //getInformationAboutTop1(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
                }
                gameINFO.push([xmlDoc_tpo.getElementsByTagName('maxplayers')[0].attributes.value.textContent, xmlDoc_tpo.getElementsByTagName('minplayers')[0].attributes.value.textContent,
                xmlDoc_tpo.getElementsByTagName('minage')[0].attributes.value.textContent, xmlDoc_tpo.getElementsByTagName('description')[0].textContent])
                let len = xmlDoc_tpo.getElementsByTagName('link').length;
                picTop10.push(xmlDoc_tpo.getElementsByTagName('image')[0].innerHTML)

                let count_tt = 0;
                while (count_tt < len) {

                    if (xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.type.textContent == "boardgamecategory") {
                        gameCategory2.push(String(xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.value.textContent));
                            if (!typeCategory.includes(xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.value.textContent)) {
                                typeCategory.push(String(xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.value.textContent));
                            }
                    }
                        if (xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.type.textContent == "boardgamemechanic") {
                        gameMechanic2.push(String(xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.value.textContent));
                            if (!typeMechanic.includes(xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.value.textContent)) {
                                typeMechanic.push(String(xmlDoc_tpo.getElementsByTagName('link')[count_tt].attributes.value.textContent));
                            }
                    }
                    count_tt++;
                }
                gameCategory.push([gameCategory2]);
                gameMechanic.push([gameMechanic2]);

                gameCategory2 = [];
                gameMechanic2 = [];

                //getInformationById(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
                top10Id.push(xmlDoc.getElementsByTagName('item')[countINFO].attributes.id.textContent);
                countINFO++;
                */















































  //document.writeln(ratedgames.length)
    /*
    let dudepls = 0;
    while (dudepls < output.length) {
        document.writeln(output[dudepls]+"*****");
        document.writeln("");
        dudepls++;
    }
    document.writeln( output.length);
*/    

/*
function fetch_retry_Category_Mechanic(api_url, op, n_retry, id,arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name) {

    const fetch_retry = async (api_url, op, n_retry) => {
        for (let i = 0; i < n_retry; i++) {
            try {
                return await fetch(api_url, op).then(function(response) {
                    return response.text();
                }).then(function(data){
                    let rec = [];
                    let similar = [];
                    //console.log (data);
                    let parser = new DOMParser (),
                    xmlDoc = parser.parseFromString (data, 'text/xml');
                    //console.log (xmlDoc.getElementsByTagName('link'));
                    let len = xmlDoc.getElementsByTagName('link').length;
                    let count = 0;
                    //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                    //console.log(`${id}`)
        
                    while (count < len) {
        
                        
                        if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {
        
                                if (!arr1.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                    //console.log("CCCCCAAAAAAAAAATTTTTTTTTTTT")
                                    //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                                    arr1.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                                }
                        }
                            if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {
        
                                if (!arr2.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                    //console.log("MMMMMEEEEEECCCCCCCHHHHHHHHH")
                                    //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                                    arr2.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                                }
                        }
                        count++;
                    }
                    let count1 = 0;
                    for ( let i = 0; i < arr1.length; i++) {
                        if (recomenderCategory.includes(arr1[i])) {
                            //console.log(arr1[i])
                            //console.log("DONE CAT")
                            count1++;
        
                        }
                    }
                    let count2 = 0;
        
                    for ( let i = 0; i < arr2.length; i++) {
                        if (recomenderMechanic.includes(arr2[i])) {
                            //console.log(arr2[i])
                            //console.log("DONE MECHAN")
        
                            count2++;
                        }
                    }
                    while(arr1.length > 0) {
                        arr1.pop();
                    }
                    while(arr2.length > 0) {
                        arr2.pop();
                    }
                    //console.log(count1)
                    if (count1 > 1) {//recommendationByReimplementations
                        arr3.push([`${id}`, count1])
                        //console.log(recommendationByExpansions2.length)
                    }
                    if (count2 > 0) {
                        ex_arr.push([`${id}`, count2])
                    }
                    count1 = 0;
                    count2 = 0;
                    //console.log(term)
                    if (id == arr[arr.length-1]) {
                        term = true;
                    }
                    i = n_retry;
                    if (term == true) {
                        if (arr3.length == 0) {
                            arr3 = ex_arr;
                        }
                        //console.log("ONEEEEEEEEEEEEE")
                        //console.log(recommendationByExpansions2.length)
                        //console.log("dddddddddddddd")
        
                        //arr3 = recommendationByExpansions2;
                        //recommendationByExpansions2 = [];
                        //console.log(arr3.length)
                        getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
                    }
                });
            } catch (error_404) {
                const finalTry = i + 1 === n_retry;
                if (finalTry) throw error_404;
            }
        }
    };
    fetch_retry(api_url, op, n_retry);
   
}
*/
/*
function fetch_retry_Category_Mechanic(data, arr, ex_arr, arr1, arr2, arr3, arr4, term, term2, name) {
    

}
*/


/*
if (!usernameArray.includ(document.getElementById("UserName").textContent)) {
        new URLSearchParams(window.location.search).forEach((value, name) => {
        message.innerHTML(`sdd`);  
    })
 }
*/

/*
const btn= document.getElementById("btn");
btn.addEventListener('click', function(){
var name = document.getElementById("myName").value;
nameofuser = name;
});
*/

/*
if (usernameArray.includes(nameofuser)) {
    loadData(nameofuser);
} else {
document.getElementById("message").innerHTML = "Sorry we could not find your profile, please go back to the Homepage check your username and try again";

}
*/

 // search for reimplementations or new expansions of the top 2-10 games 
            /*for (let i = 1; i < top10Id.length; i++) {
                searchByExpansionsAndImplementation(top10Id[i]);
                wait(3000);
            }*/
            
            /*
            const check_year_of_Expansions = async function(name) {
                await Promise.all (
                    ExpID.map(async (id)=> {
                        const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`)
                        const data = await response.text();
                        let parser = new DOMParser (),
                        xmlDoc = parser.parseFromString (data, 'text/xml');
                        //console.log (xmlDoc.getElementsByTagName('link'));
                        
                        if (yearPublished.includes(xmlDoc.getElementsByTagName('yearpublished')[0].attributes.value.textContent)) {
                            if (!boardgameExpantionsId.includes(id)) {
                                boardgameExpantionsId.push(id);
                                boardgameExpantions.push([id, name]);
                            }
                        }
                       

                    })
                )
            }
            check_year_of_Expansions(OrgGame_Name);
            // searchBY ExpansionReimplementaion;

            
            */
            // get the hot games from profile



             //console.log(boardgameReimplementation.length)
                    //console.log(boardgameExpantions.length)

                    /*for (let i = 0; i < boardgameReimplementationId.length; i++) {
                        checkCollectionForRecommendation(boardgameReimplementationId[i])
                    }*/
                    //getSimilarityBetweenItemsForCollaborativeApproach();
                    //checkCollectionForRecommendation(name)


                    // ************************* TOP!=GAMES INFORMATIONS *******************
                    /*
                    let gameINFOLength = gameINFO.length;
                    let count2 = 0;
                    while(count2 < gameINFOLength) {
                        informations.push('<td>'+gameINFO[count2][0]+'</td><td>'+gameINFO[count2][1]+'</td>'+'<td>'+gameINFO[count2][2]+'</td><td>'+gameINFO[count2][3]+'</td>');
                        count2++;
                    }
                    var html3 = '<table class="u-table-entity"><colgroup><col width="22.7%"><col width="25.5%"><col width="26.6%"><col width="25.2%"><tbody class="u-align-center u-palette-5-dark-3 u-table-body u-table-body-1"></colgroup><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">' +
                        informations.join('</tr><trclass="u-border-2 u-border-no-bottom u-border-no-top u-border-palette-5-light-1 u-table-cell">') + '</tr></table>';
                        document.querySelector('#infotable').innerHTML = html3;
                    */
                       
                        
                        
                        /*
                        let countbge = 0;
                        while (countbg < boardgamesEId.length) {
                            getInformationsFromBoardgames(boardgamesEId[countbge]);
                            countbge++;
                        }
                        console.log(boardgameCategory.length);
                        */

                        /*
                        let countbge = 0;
                        while (countbg < boardgamesEId.length) {
                            getInformationsFromBoardgames(boardgamesId[countbge]);
                            countbge++;
                        }
                        */


 /*for (let i = 0; i < boardgameReimplementationId.length; i++) {
                //console.log("Iteration Numer"+ i)
                if ( i == (boardgameReimplementationId.length - 1)) {
                    term = true;
                }
                getCategory_of_Reimplementations(boardgameReimplementationId[i], boardgameReimplementationCategory, boardgameReimplementationMechanic, recommendationByReimplementations, boardgameReimplementation, term,term_int, name);
            
            }*/
             /*
                    let term_3 = false;
                    let term_int = 3;
                    for (let i = 0; i < new_boardgamseId.length; i++) {
                        //console.log("Iteration Numer"+ i)
                        if ( i == (new_boardgamseId.length - 1)) {
                            term_3 = true;
                        }
                        getCategory_of_Reimplementations(new_boardgamseId[i], boardgameCategory, boardgameMechanic, recommendationBydefult, boardgamesEmpty, term_3,term_int, name);
                    
                    }
                    */
                     /*for (let i = 0; i < boardgameReimplementationId.length; i++) {
                    //console.log("Iteration Numer"+ i)
                    if ( i == (boardgameReimplementationId.length - 1)) {
                        term = true;
                    }
                    getCategory_of_Reimplementations(new_boardgameReimplementationId[i], boardgameReimplementationCategory, boardgameReimplementationMechanic, recommendationByReimplementations,boardgameReimplementation, term, term_int, name);
                
                }*/
                    /*
                    for (let i = 0; i < new_boardgameExpantionsId.length; i++) {
                        //console.log("Iteration Numer"+ i)
                        if ( i == (new_boardgameExpantionsId.length - 1)) {
                            term = true;
                        }
                        getCategory_of_Reimplementations(new_boardgameExpantionsId[i], boardgameExpansionCategory, boardgameExpansionMechanic, recommendationByExpansions,boardgameExpantions, term,term_int, name);
                    
                    }
                    */



/*
   function fetch_retry_Category_Mechanic(url, options, n, id,arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name) {
    return new Promise(function(resolve, reject) {
        fetch(url, options)
            .then(function(result) {
                resolve(result);
                //console.log(result.text())
                return result.text();
            }).then(function(data) {
                let rec = [];
                let similar = [];
                //console.log (data);
                let parser = new DOMParser (),
                xmlDoc = parser.parseFromString (data, 'text/xml');
                //console.log (xmlDoc.getElementsByTagName('link'));
                let len = xmlDoc.getElementsByTagName('link').length;
                let count = 0;
                //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                //console.log(`${id}`)
    
                while (count < len) {
    
                    
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {
    
                            if (!arr1.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                //console.log("CCCCCAAAAAAAAAATTTTTTTTTTTT")
                                //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                                arr1.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                            }
                    }
                        if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {
    
                            if (!arr2.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                //console.log("MMMMMEEEEEECCCCCCCHHHHHHHHH")
                                //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                                arr2.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                            }
                    }
                    count++;
                }
                let count1 = 0;
                for ( let i = 0; i < arr1.length; i++) {
                    if (recomenderCategory.includes(arr1[i])) {
                        //console.log(arr1[i])
                        //console.log("DONE CAT")
                        count1++;
    
                    }
                }
                let count2 = 0;
    
                for ( let i = 0; i < arr2.length; i++) {
                    if (recomenderMechanic.includes(arr2[i])) {
                        //console.log(arr2[i])
                        //console.log("DONE MECHAN")
    
                        count2++;
                    }
                }
                while(arr1.length > 0) {
                    arr1.pop();
                }
                while(arr2.length > 0) {
                    arr2.pop();
                }
                //console.log(count1)
                if (count1 > 1) {//recommendationByReimplementations
                    arr3.push([`${id}`, count1])
                    //console.log(recommendationByExpansions2.length)
                }
                if (count2 > 0) {
                    ex_arr.push([`${id}`, count2])
                }
                count1 = 0;
                count2 = 0;
                //console.log(term)
                if (id == arr[arr.length-1]) {
                    term = true;
                }
                if (term == true) {
                    if (arr3.length == 0) {
                        arr3 = ex_arr;
                    }
                    //console.log("ONEEEEEEEEEEEEE")
                    //console.log(recommendationByExpansions2.length)
                    //console.log("dddddddddddddd")
    
                    //arr3 = recommendationByExpansions2;
                    //recommendationByExpansions2 = [];
                    //console.log(arr3.length)
                    getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
                }

            }).catch(function(error) {
                if (n === 1) return reject(error); // <--- base case!
                fetch_retry_Category_Mechanic(url, options, n - 1, id,arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name)
                    .then(resolve)
                    .catch(reject);
            })
    });
}
*/


/*
async function get_Category_Mechanic(id,arr,ex_arr, arr1, arr2, arr3, arr4, term, term2, name){
    let e = 0;
    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id, {}, 6,).then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            let rec = [];
            let similar = [];
            //console.log (data);
            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            //console.log (xmlDoc.getElementsByTagName('link'));
            let len = xmlDoc.getElementsByTagName('link').length;
            let count = 0;
            //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            //console.log(`${id}`)

            while (count < len) {

                
                if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {

                        if (!arr1.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            //console.log("CCCCCAAAAAAAAAATTTTTTTTTTTT")
                            //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                            arr1.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                        }
                }
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {

                        if (!arr2.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            //console.log("MMMMMEEEEEECCCCCCCHHHHHHHHH")
                            //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                            arr2.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                        }
                }
                count++;
            }
            let count1 = 0;
            for ( let i = 0; i < arr1.length; i++) {
                if (recomenderCategory.includes(arr1[i])) {
                    //console.log(arr1[i])
                    //console.log("DONE CAT")
                    count1++;

                }
            }
            let count2 = 0;

            for ( let i = 0; i < arr2.length; i++) {
                if (recomenderMechanic.includes(arr2[i])) {
                    //console.log(arr2[i])
                    //console.log("DONE MECHAN")

                    count2++;
                }
            }
            while(arr1.length > 0) {
                arr1.pop();
            }
            while(arr2.length > 0) {
                arr2.pop();
            }
            //console.log(count1)
            if (count1 > 1) {//recommendationByReimplementations
                arr3.push([`${id}`, count1])
                //console.log(recommendationByExpansions2.length)
            }
            if (count2 > 0) {
                ex_arr.push([`${id}`, count2])
            }
            count1 = 0;
            count2 = 0;
            //console.log(term)
            if (id == arr[arr.length-1]) {
                term = true;
            }
            if (term == true) {
                if (arr3.length == 0) {
                    arr3 = ex_arr;
                }
                //console.log("ONEEEEEEEEEEEEE")
                //console.log(recommendationByExpansions2.length)
                //console.log("dddddddddddddd")

                //arr3 = recommendationByExpansions2;
                //recommendationByExpansions2 = [];
                //console.log(arr3.length)
                getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
            }
            }).catch (function (error) {
                console.log ("Fehler: please check the function get_Category_Mechanic :) " + error);
               

               });
}
*/



/*
async function get_Category_Mechanic_From_Boardgames(arr, arr1, arr2, arr3, arr4, term, term2, name) {
    let ex_arr = [];
    console.log("###### PROPERTIES ##########")
    for (let j = 0; j < recomenderCategory.length; j++) {
        console.log(recomenderCategory[j]);
        
    }
    console.log("sssssssssssssssssssssssssssssssssssssssssssssss")

    for (let j = 0; j < recomenderMechanic.length; j++) {
        console.log(recomenderMechanic[j]);
    }
    
    const get_Category_Mechanic = async function(arr1, arr2, arr3, arr4, term, term2, name) {
        await Promise.all (
            arr.map(async (id)=> {
                const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`,{retryOn: [419, 503, 504]
                })
                const data = await response.text();
                let parser = new DOMParser (),
                xmlDoc = parser.parseFromString (data, 'text/xml');
                //console.log (xmlDoc.getElementsByTagName('link'));
                let len = xmlDoc.getElementsByTagName('link').length;
                let count = 0;
                //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                //console.log(`${id}`)

                while (count < len) {

                    
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {

                            if (!arr1.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                //console.log("CCCCCAAAAAAAAAATTTTTTTTTTTT")
                                //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                                arr1.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                            }
                    }
                        if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {

                            if (!arr2.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                                //console.log("MMMMMEEEEEECCCCCCCHHHHHHHHH")
                                //console.log(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)
                                arr2.push(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent);
                            }
                    }
                    count++;
                }
                let count1 = 0;
                for ( let i = 0; i < arr1.length; i++) {
                    if (recomenderCategory.includes(arr1[i])) {
                        //console.log(arr1[i])
                        //console.log("DONE CAT")
                        count1++;

                    }
                }
                let count2 = 0;

                for ( let i = 0; i < arr2.length; i++) {
                    if (recomenderMechanic.includes(arr2[i])) {
                        //console.log(arr2[i])
                        //console.log("DONE MECHAN")

                        count2++;
                    }
                }
                while(arr1.length > 0) {
                    arr1.pop();
                }
                while(arr2.length > 0) {
                    arr2.pop();
                }
                //console.log(count1)
                if (count1 > 1) {//recommendationByReimplementations
                    arr3.push([`${id}`, count1])
                    //console.log(recommendationByExpansions2.length)
                }
                if (count2 > 0) {
                    ex_arr.push([`${id}`, count2])
                }
                count1 = 0;
                count2 = 0;
                //console.log(term)
                if (id == arr[arr.length-1]) {
                    term = true;
                }
                if (term == true) {
                    if (arr3.length == 0) {
                        arr3 = ex_arr;
                    }
                    //console.log("ONEEEEEEEEEEEEE")
                    //console.log(recommendationByExpansions2.length)
                    //console.log("dddddddddddddd")

                    //arr3 = recommendationByExpansions2;
                    //recommendationByExpansions2 = [];
                    //console.log(arr3.length)
                    getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
                }
               
            })
        )
    }
    get_Category_Mechanic(arr1, arr2, arr3, arr4, term, term2, name);
}
*/


/*


async function  getCategory_of_Reimplementations(id, arr1, arr2, arr3, arr4, term, term2, name) {
    arr1 = [];
    arr2 = [];
    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            //console.log (data);

            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            //console.log (xmlDoc.getElementsByTagName('link'));
            let len = xmlDoc.getElementsByTagName('link').length;

            let count = 0;
            while (count < len) {

                
                if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamecategory") {

                        if (!arr1.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            arr1.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                        }
                }
                    if (xmlDoc.getElementsByTagName('link')[count].attributes.type.textContent == "boardgamemechanic") {

                        if (!arr2.includes(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent)) {
                            arr2.push(String(xmlDoc.getElementsByTagName('link')[count].attributes.value.textContent));
                        }
                }
                count++;

            }
            let count1 = 0;
            for ( let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < recomenderCategory.length; j++) {
                    if (recomenderCategory[j] == arr1[i]) {
                        count1++;
                        break;
                    }
                }
            }
            for ( let i = 0; i < arr2.length; i++) {
                for (let j = 0; j < recomenderMechanic.length; j++) {
                    if (recomenderMechanic[j] == arr1[i]) {
                        count1++;
                        break;
                    }
                }
            }
            
            if (count1 > 0) {//recommendationByReimplementations
                arr3.push([id, count1])
            }
            if (term) {
                console.log(arr3.length)
                checkSim(name, arr3, arr4)
            }
            
            
            //console.log("hjjjjjj")
            //console.log(count1)
            if (count1 > 0 && term2 == 1) {//recommendationByReimplementations
                recommendationByExpansions2.push([id, count1])
            }
            if (count1 > 0 && term2 == 2) {//recommendationByReimplementations
                //console.log("HMMMMMMMMMM")

                recommendationByReimplementations2.push([id, count1])
            }
            if ((term == true) && (term2 == 1)) {
                //console.log("ONEEEEEEEEEEEEE")
                //console.log(recommendationByExpansions2.length)

                arr3 = recommendationByExpansions2;
                //console.log(arr3.length)
                getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
            }
            if ((term == true) && (term2 == 2)) {
                arr3 = recommendationByReimplementations2;
                //console.log("TWWOOOOOOOOOOO")
                //console.log(recommendationByReimplementations2.length)

                getRecommendationWithHighSimilarity_Category_Mechanic(name, arr3, arr4, term2)
            }
            


        }).catch (function (error) {
            console.log ("Fehler: please check the function getCategory_of_Reimplementations :) " + error);
           });
}
*/


 /*
    for (let i = 1; i < itemsId.length; i++) {
        searchByExpansionsAndImplementation(itemsId[i]);
        wait(3000);
    }
    */

    /*

async function check_year_of_Expansions(id, name) {

    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            yearExpansions = ["2018", "2019", "2020", "2021"]
            //console.log (data);


            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            //console.log (xmlDoc.getElementsByTagName('link'));
            let len = xmlDoc.getElementsByTagName('link').length;

            let count = 0;
            while (count < len) {
                if (yearPublished.includes(xmlDoc.getElementsByTagName('yearpublished')[0].attributes.value.textContent)) {
                    if (!boardgameExpantionsId.includes(id)) {
                        boardgameExpantionsId.push(id);
                        boardgameExpantions.push([id, name]);
                    }
                }
                count++;
            }

            




        }).catch (function (error) {
            console.log ("Fehler: please check the function searchByExpansionsAndImplementation :) " + error);
           });
}*/
/*
async function check_year_of_Reimplementation(id, name) {

    fetch('https://boardgamegeek.com/xmlapi2/thing?id='+id).then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
        })
        .then (function (data) {
            //console.log (data);


            let parser = new DOMParser (),
            xmlDoc = parser.parseFromString (data, 'text/xml');
            //console.log (xmlDoc.getElementsByTagName('link'));
            if (yearPublished.includes(xmlDoc.getElementsByTagName('yearpublished')[0].attributes.value.textContent)) {
                if (!boardgameReimplementationId.includes(id)) {
                    boardgameReimplementationId.push(id);
                    boardgameReimplementation.push([id, name]);
                }
            }
        }).catch (function (error) {
            console.log ("Fehler: please check the function searchByExpansionsAndImplementation :) " + error);
           });

}
*/
    
    // mb there is a bug in this function /& LATER &/


     /*
        for ( let i = 0; i < boardgamesId.length; i++) {
            console.log(boardgamesId[i])
        }*/

        /*const api_url = `search/${domain}`;
        const respone = await fetch(api_url);
        const json = await respone.json();
        console.log(json)*/
        //boardgameexpansion
        /*
        fetch('https://boardgamegeek.com/xmlapi2/search?query= &type=boardgame').then (function (response) {
            // Antwort kommt als Text-String
            return response.text();
            })
            .then (function (data) {
                //console.log (data);

                let parser = new DOMParser (),
                xmlDoc = parser.parseFromString (data, 'text/xml');
                //console.log (xmlDoc.getElementsByTagName('yearpublished'));
                let len = xmlDoc.getElementsByTagName('yearpublished').length;
                let count = 0;
                    while ( count < len) {
                        //console.log(xmlDoc.getElementsByTagName('yearpublished')[count].attributes.value.textContent)
                        if (yearPublished.includes(xmlDoc.getElementsByTagName('yearpublished')[count].attributes[0].textContent)) {    
                            boardgamesId.push(xmlDoc.getElementsByTagName('item')[count].attributes.id.textContent);
                        }
                        count++;


                    }




            }).catch (function (error) {
                console.log ("Fehler: please check the function getBoardGamesId :) " + error);
               });*/

 //console.log (xmlDoc.getElementsByTagName('name'));
    //const {name} = xmlDoc.getElementsByTagName('name').innerHTML;
    //document.getElementById('name').textContent = xmlDoc.getElementsByTagName('name')[0].textContent;
    //gamearray = [ '<td>GameNames</td>'];
    //print
    //document.write(gameslength);
    /*
    for (let i = 0; i < gameslength.length; i++) {
        ratedgames.push(xmlDoc.getElementsByTagName('name')[i].attributes.value.textContent );
      }
    for (let n = 0; n < xmlDoc.getElementsByTagName('rating').length.length; n++) {
        let s = parseInt(xmlDoc.getElementsByTagName('rating')[n].attributes.value.textContent);
        ratedgamesrank.push(s);
    }
    */
    //console.log(typeof ratedgamesrank)
    //console.log(typeof 8);
    //console.log(typeof parseInt(xmlDoc.getElementsByTagName('rating')[0].attributes.value.textContent));
    //document.writeln(ratedgames.fill());
    //document.write(xmlDoc.getElementsByTagName('rating')[0].attributes.value.textContent);
    /*for (let o = 0; o < ratedgamesrank; o++) {
        document.write(ratedgamesrank[o]);
    }
    ratedgamesranksort = ratedgamesrank;
    ratedgamesranksort.sort(function(a, b){return a-b});
    for (let j = 0; j < 10; j++) {
        top10games.push(ratedgamesranksort[ratedgamesranksort.length-(j+1)]);
    }
    */