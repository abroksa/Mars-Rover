const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');
const Rover = require('../rover.js');

describe("Rover class", function() {

//test #7
// "constructor sets position and default values for mode and generatorWatts". Refer to the Rover Class description above for these default values.

it("constructor sets position and default values", function(){
   //(position, mode, generator watts)
   let testRover = new Rover(00000);
   assert.strictEqual(00000, testRover.position);
   assert.strictEqual("NORMAL", testRover.mode);
   assert.strictEqual(110, testRover.generatorWatts);
});

//test #8
it("response returned by receiveMessage contains name of message", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('some name', commands);
  let rover = new Rover(98382);    
   assert.strictEqual('some name', rover.receiveMessage(message).messageName);
});

//test #9
//"response returned by receiveMessage includes two results if two commands are sent in the message"
it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
 

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    

assert.strictEqual(rover.receiveMessage(message).results.length, commands.length);

});

//test #10
//"responds correctly to status check command"
it("responds correctly to status check command", function(){
 

let commands = [new Command('STATUS_CHECK')];
let message = new Message("status check", commands);
let rover = new Rover(98382);    
let response = rover.receiveMessage(message);

assert.strictEqual(response.results[0].roverStatus.position,rover.position);
assert.strictEqual(response.results[0].roverStatus.mode,rover.mode);
assert.strictEqual(response.results[0].roverStatus.generatorWatts, rover.generatorWatts);
assert.strictEqual(response.results[0].completed,true);
});

//test #11
//"responds correctly to mode change command"
it("responds correctly to mode change command", function(){
let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
let message = new Message('Test mode change', commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(message);

assert.strictEqual(rover.mode, 'LOW_POWER');
assert.strictEqual(response.results[0].completed,true);

});

//test #12
//"responds with false completed value when attempting to move in LOW_POWER mode"
it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 12000)];
let message = new Message('Test false move', commands);
let testRover = new Rover(98382);
let response = testRover.receiveMessage(message);

assert.strictEqual(response.results[1].completed, false);
assert.strictEqual(testRover.position, 98382);
});

//test #13
//"responds with position for move command"
it("responds with position for move command", function(){
let commands = [new Command('MOVE', 12000)];
let message = new Message('Test move', commands);
let testRover = new Rover(98382);
let response = testRover.receiveMessage(message);

assert.strictEqual(testRover.position, 12000);

});

});