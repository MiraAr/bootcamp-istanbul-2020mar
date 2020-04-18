function parseStory(rawStory) {
  let splitStory=rawStory.split(' ');
  let noun =/n(?=])/;
  let verb =/v(?=])/; 
  let adj =/a(?=])/; 
  let arr= [];
  for(let i=0;i<splitStory.length;i++){
    if(splitStory[i].endsWith('.')||splitStory[i].endsWith(',')){ 
      let dc=splitStory[i].slice(-1);
      pos(splitStory[i].replace(dc,''));
      arr.push(createObject(dc,''));
      }
    else{
      pos(splitStory[i]);
      }
    } 
  function pos(word){
    if(noun.test(word)){
        let retN = word.replace('[n]','');
        arr.push (createObject(retN,'noun'));
      }
    else if(verb.test(word)) {
        let retV = word.replace('[v]','');
        arr.push (createObject(retV,'verb'));  
      }
    else if(adj.test(word)){
        let retA = word.replace('[a]','');
        arr.push (createObject(retA,'adj'));
      }
    else{
      arr.push(createObject(word,''));
      }
    }
  function createObject(word,pos){ 
    let newObj = {
    word : word,
    pos : pos };
    if(pos==''){
      delete newObj.pos;
      }
    return newObj; 
    }
  return arr; 
}

function addElements(processedStory){
  let arr= processedStory;
  let div= document.querySelector('.madLibsEdit');
  let par = document.createElement("p");
  div.appendChild(par);
  for (let i=0;i<arr.length;i++){
    if(arr[i].pos=='noun'){
      let nInput = document.createElement("input")
      nInput.type = "text";
      nInput.placeholder="noun";
      par.appendChild(nInput);
      }
    else if(arr[i].pos=='verb'){
      let vInput = document.createElement("input");
        vInput.type = "text";
        vInput.placeholder="verb";
        par.appendChild(vInput);
      }
    else if(arr[i].pos=='adj'){
      let aInput = document.createElement("input");
        aInput.type ='text';
        aInput.placeholder="adj";
        par.appendChild(aInput);
      }
    else{
       let text = document.createTextNode(" "+arr[i].word+" ");
       par.appendChild(text);
      }
    }
} 

getRawStory().then(parseStory).then((processedStory) => {
    console.log(processedStory);
    addElements(processedStory);
  });