const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
  
//test #4
// For this test description, use the text, "throws error if a name is NOT passed into the constructor as the first parameter". Review the first test in command.spec.js for an example of how to write this test.

  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });

// test #5
// Use "constructor sets name" as the description. The test confirms that the constructor in the Message class correctly sets the name property in a new message object.

it("constructor sets name", function(){
   let testMessage = new Message("some name", "some command");
   assert.strictEqual("some name", testMessage.name);
});

// test #6
// Use "contains a commands array passed into the constructor as 2nd argument". This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call. Inside this test, you will have to create a commands array, fill it with some Command objects, and pass it into the Message constructor.

it("contains a commands array passed into the constructor as 2nd argument", function(){
  
  let commands = [new Command("MOVE", 123), new Command("STATUS_CHECK")];
  let testMessage = new Message("test message", commands);

assert.strictEqual(commands, testMessage.commands);

});










});