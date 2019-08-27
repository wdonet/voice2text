import React from 'react';

// Import the Artyom library
import Artyom from 'artyom.js';

// Import the previously created class to handle the commands from another file
import JarvisCommandManager from './ArtyomCommands.js';
import TextArea from './TextArea.js';

// Create a "globally" accesible instance of Artyom
const Jarvis = new Artyom();

export default class App extends React.Component {
    constructor (props, context) {
        super(props, context);

        // Add `this` context to the handler functions
        this.startAssistant = this.startAssistant.bind(this);
        this.stopAssistant = this.stopAssistant.bind(this);
        this.speakText = this.speakText.bind(this);
        this.searchInput = React.createRef();
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.changeValueByVoice = this.changeValueByVoice.bind(this);

        // Prepare simple state
        this.state = {
            artyomActive: false,
            textareaValue: "",
            searchForValue: "",
            artyomIsReading: false
        };

        // Load some commands to Artyom using the commands manager
        let CommandsManager = new JarvisCommandManager(Jarvis, this);
        Jarvis.on(['Search for *'], true)
          .then( (i,value) => {
            console.log(`value => ${value}`);
            this.searchInput.current.value = value;
          })
        CommandsManager.loadCommands();
    }

    startAssistant() {
        let _this = this;

        console.log("Artyom succesfully started !");

        Jarvis.initialize({
            lang: "en-US",
            debug: true,
            continuous: true,
            soundex: true,
            listen: true
        }).then(() => {
            // Display loaded commands in the console
            console.log(Jarvis.getAvailableCommands());

            // Jarvis.say("Hi sir, I'm listening?");

            _this.setState({
                artyomActive: true
            });
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });
    }

    stopAssistant() {
        let _this = this;

        Jarvis.fatality().then(() => {
            console.log("Jarvis has been succesfully stopped");

            _this.setState({
                artyomActive: false
            });
            // Jarvis.say("Are we done? ok!");

        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen neither!", err);

            _this.setState({
                artyomActive: false
            });
        });
    }

    speakText() {
        let _this = this;

        _this.setState({
            artyomIsReading: true
        });

        // Speak text with Artyom
        Jarvis.say( _this.state.textareaValue, {
            onEnd() {
                _this.setState({
                    artyomIsReading: false
                });
            }
        });
    }

    handleTextareaChange(event) {
        this.setState({
            textareaValue: event.target.value
        });
    }

    changeValueByVoice(textareaValue) {
      this.setState({ textareaValue });
    }

    render() {
        
        return (
            <div>
                <h1>Welcome to Jarvis Assistant</h1>

                <p>You can say any of the following</p>
                {Jarvis.getAvailableCommands().map( (a,ka) => <ol key={ka}>{a.indexes.map( (c,kc) => <li key={kc}>{c}</li>)}</ol>)}
                {/* Voice commands action buttons */}
                <input type="button" value="Start Jarvis" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
                <input type="button" value="Stop Jarvis" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>
                <br/>
                <br/>
                <label>Search for</label><input type="text" ref={this.searchInput}/>

                {/* Speech synthesis Area */}
                <p>I can read some text for you if you want:</p>
                <br/>
                <TextArea
                  handler={this.handleTextareaChange}
                  value={this.state.textareaValue}
                />
                <br/>
                <input type="button" value="Read Text" disabled={this.state.artyomIsReading} onClick={this.speakText}/>
            </div>
        )
    }
}
