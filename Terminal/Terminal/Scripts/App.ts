
$(function () {
	var gApp = new App();
});
class App {
	term: JQueryTerminal;
	private cancellExecution(): boolean {

		return false;
	}
	constructor() {

		this.term = $('#HomeTerm').terminal((command) => {
			var term = this.term;
			var cmd = $.terminal.parse_command(command);
			if (cmd.name == 'progress') {
				
			}
		}, {
				greetings: 'JavaScript Interpreter',
				name: 'js_demo',
				height: 200,
				prompt: '$> ',
				keydown:  (e) => {
					
					if (e.which == 68 && e.ctrlKey) { // CTRL+D
						return this.cancellExecution();
						}
						return false;
					
				}
			});
		
		
	}
	
}