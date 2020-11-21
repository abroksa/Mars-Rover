const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

//test #2
//Create a second Command test using, "constructor sets command type" as the description. This test checks that the constructor in the Command class correctly sets the commandType property in the new object.

it("constructor sets command type", function(){
   let testCommand = new Command("type of command", "some value");
   assert.strictEqual("type of command", testCommand.commandType);
});

//test #3
//Code a third test using, "constructor sets a value passed in as the 2nd argument" as the description. This test checks that the constructor correctly sets the value property in the new object.
it("constructor sets command type", function(){
   let testCommand = new Command("type of command", "some value");
   assert.strictEqual("some value", testCommand.value);
});


});