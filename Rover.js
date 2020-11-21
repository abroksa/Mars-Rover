class Rover {
  constructor(position) {
    this.mode = "NORMAL";
    this.generatorWatts = 110;
    this.position = position;
  }

receiveMessage(message) {
  let resultsObject = {messageName:message.name, results:[]};
  for (let i=0; i<message.commands.length; i++) {
    let completeReport = {completed: true}
      if (message.commands[i].commandType === "STATUS_CHECK") {
        completeReport.roverStatus = {mode:this.mode, generatorWatts:this.generatorWatts,position:this.position};
        resultsObject.results.push(completeReport);
                    
      } else if (message.commands[i].commandType === "MODE_CHANGE"){
        completeReport.completed = true;
        this.mode = message.commands[i].value;
        resultsObject.results.push(completeReport);
      } else if (message.commands[i].commandType === "MOVE"){
        if (this.mode === "LOW_POWER") {
          completeReport.completed = false;
          resultsObject.results.push(completeReport);
        } else {
          completeReport.completed = true;
          this.position = message.commands[i].value;
          resultsObject.results.push(completeReport);
        }
      }     
    }
  
  return resultsObject;  
} 
} 
module.exports = Rover;

