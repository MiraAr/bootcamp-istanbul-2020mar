/**
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  let story= rawStory;
  let splitStory=story.split(" ");
  let noun =/n(?=])/;
  let verb =/v(?=])/; 
  let adj =/a(?=])/; 
  // let dC=/^[0-9.,]+$/;
  let arr= [];
  let div= document.querySelector('.madLibsEdit');
  let par = document.createElement("p");
  div.appendChild(par);
  for(let i=0;i<splitStory.length;i++){
     if(noun.test(splitStory[i])){
        let retN = splitStory[i].replace('[n]','');
        arr.push (createObject(retN,'noun'));
        let nInput = document.createElement("input")
        nInput.type = "text";
        nInput.placeholder="noun";
        nInput.class= noun;
        par.appendChild( nInput);
        
      
    } else if(verb.test(splitStory[i])) {
        let retV = splitStory[i].replace('[v]','');
        arr.push (createObject(retV,'verb'));  
        let vInput = document.createElement("input");
        vInput.type = "text";
        vInput.placeholder="verb";
        vInput.class= verb;
        par.appendChild( vInput);
    }
      else if(adj.test(splitStory[i])){
        let retA = splitStory[i].replace('[a]','');
        arr.push (createObject(retA,'adj'));
        let aInput = document.createElement("input");
        aInput.type ='text';
        aInput.placeholder="adj";
        par.appendChild(aInput);
        
      }
    else{
      arr.push(createObject(splitStory[i],''));
      let text = document.createTextNode(" "+splitStory[i]+" ");
      par.appendChild(text);

    }
  }
  function createObject(word,pos){ 
    let newObj = {
    word : word,
    pos : pos
    };
    if(pos==''){
      delete newObj.pos;
    }
    return newObj; 
  }

  return arr;
}
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  console.log(processedStory);
});


