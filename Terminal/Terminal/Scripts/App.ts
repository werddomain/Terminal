//https://terminal.jcubic.pl/
var processesList = new Dictionary<IProcess>();
$(function () {
	var gApp = new App();
});
class App {
	term: JQueryTerminal;
	commands: Dictionary<IProcess>;
	currentProcess: IProcess;
	terminalTitle: JQuery;
	private cancellExecution(): boolean {
		if (this.currentProcess !== undefined)
			this.currentProcess.stop();
		return false;
	}

	constructor() {
		this.terminalTitle = $("#terminalTitle");
		this.commands = processesList;
		this.term = $('#HomeTerm').terminal((command) => {
			var term = this.term;
			var cmd = $.terminal.split_command(command);
			if (this.commands.containsKey(cmd.name))
				this.commands.getValue(cmd.name).start(this, cmd.args);
			else
				this.term.error("Command '" + cmd.name + "' is not found. Type help to view commands.")
		}, {
				greetings: 'JavaScript Interpreter',
				name: 'js_demo',
				//height: 500,
				prompt: '$> ',
				keydown:  (e) => {
					
					if (e.which == 68 && e.ctrlKey) { // CTRL+D
						return this.cancellExecution();
						}
						//return false;
					
				},
				completion: this.commands.keys()
			});
		
		
    }
    rnd(min: number, max: number): number {
        return Math.floor((Math.random() * max-min) + min);
    }
}