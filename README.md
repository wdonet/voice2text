## Voice to Text

This project was bootstrapped with [Create React App](CREATE_REACT_APP.md).

There are two goals in this Probe of Concept (PoC):

1. Voice recognition to text
2. Synthethize text to voice

It only has one main React App Component which uses a TextArea Component and [Artyom](https://sdkcarlos.github.io/sites/artyom.html) library but could use [react-speech-recognition](https://www.npmjs.com/package/react-speech-recognition) too.

The second is used for both goals above.  There are two buttons for start/stop voice recognition and fill the textarea with the proper text. _Note that you need to give permissions for using your microphon on your browser first._

The Recognition works by saying commands which are displayed in the only main page rendered. But you could see them listed at `ArtyomCommands.js`

There's an additional button to synthetize the textarea input value manually.  However you could do it by voice saying `read everything` or `read all`.

### Note:
This is working on Chrome and Firefox thanks to the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)

Here for a [demo](https://www.google.com/chrome/demos/speech.html)

Try this project reading this:

```
listen:
 Companies differ from natural systems because of legal Authority
period:
listen:
 The people in an organization are not allowed to break any laws
question mark:
listen:
 Managers are authorized by the business owners to hire and fire people
comma:
listen:
 to commit the whole business to services and payments by signing contracts with customers and suppliers
comma:
listen:
 to take care of the money that goes in and out of the organization
comma:
listen:
 and to delegate work to other people
period:
listen:
 This all passes through the organization in a hierarchical fashion enable traceability of authorization
period:
open parenthesis:
listen:
 As far as I'm concerned
comma:
listen:
 that's one of the very few things for which a hierarchy can be useful
period:
close parenthesis:
the title is:
 Why not get rid of the hierarchy completely
```

