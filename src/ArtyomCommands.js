// ArtyomCommands.js
export default class JarvisCommandManager {

  // The ArtyomCommandsManager class expects as argument in the constructor
  // an already declared instance of Artyom.js
  constructor (JarvisInstance, parentContext){
      this._jarvis = JarvisInstance;
      if (parentContext) {
        this._stop = parentContext.stopAssistant;
        this._speakText = parentContext.speakText;
        this._getValue = () => parentContext.state.textareaValue;
        this._setValue = parentContext.changeValueByVoice;
        }
  }
  
  // Execute the loadCommands method to inject the methods to the instance of Artyom
  loadCommands(){
      let Jarvis = this._jarvis;
      let stop = this._stop;
      let getValue = this._getValue;
      let speakText = this._speakText;
      let setValue = this._setValue;
      let addChar = (aChar) => () => {
        setValue(`${getValue()}${aChar}`);
      }

      // Here you can load all the commands that you want to Artyom
      return Jarvis.addCommands([
          {
            indexes: ['include title *', 'include a title *', 'title is *', 'the title is *'],
            smart:true,
            action: (i, text) => {
              setValue(` == ${text.toUpperCase()}  == \n\n${getValue()}`);
            }
          },
          {
            indexes: ['write this *', 'listen *'],
            smart:true,
            action: (i, text) => {
              setValue(getValue() + ' ' + text);
            }
          },
          {
            indexes: ['add a space', 'space', 'spacebar'],
            action: addChar(' '),
          },
          {
            indexes: ['semicolon', 'semicolon char', 'add a semicolon *'],
            action: addChar(';'),
          },
          {
            indexes: ['colon', 'colon char', 'add a colon *'],
            action: addChar(':'),
          },
          {
            indexes: ['.', 'period', 'period char', 'add a period *'],
            action: addChar('.'),
          },
          {
            indexes: ['question mark'],
            action: addChar('?'),
          },
          {
            indexes: [',', 'coma', 'comma', 'comma char', 'add a comma *'],
            action: addChar(','),
          },
          {
            indexes: ['open parenthesis'],
            action: addChar('('),
          },
          {
            indexes: ['close parenthesis'],
            action: addChar(')'),
          },
          {
            indexes: ['add a new line', 'hit enter', 'other line', 'start in a new line', 'start over'],
            action: () => {
              setValue(getValue() + '\n');
            }
          },
          {
            indexes: ['uppercase *', 'in uppercase *'],
            smart: true,
            action: (i, text) => {
              setValue(`${getValue()} ${text.toUpperCase()}`);
            }
          },
          {
            indexes: ['backspace'],
            action: () => {
              let original = getValue();
              setValue(original.substr(0, original.length - 1));
            }
          },
          {
            indexes: ['read all', 'read everything', 'show me everything'],
            action: () => {
              speakText();
                // Artyom.say(`The whole text says ${getValue()}`);
            }
          },
          {
            indexes: ['delete all', 'delete everything', 'clean it up'],
            action: () => {
              setValue('');
            }
          },
          {
            indexes: ["we finished", "we're done", "stop this", "shut it down", "shut up", "stop"],
            action: () => stop(),
          },
      ]);
  }
}