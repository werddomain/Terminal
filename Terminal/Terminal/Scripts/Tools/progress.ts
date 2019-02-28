class ProgressBar {
	private animation: boolean = false;
	private timer: number;
	private prompt: any;
	private display: string;
	private animationIndex: number;
	private max: number;
	constructor(private app: App, private charSize: number, public Maximum: number) {
		var term = app.term;
		var i = 0;
		this.prompt = term.get_prompt();
		this.display = this.progress(0, charSize);
	}
	loop() {
		if (this.animation == false) {
			this.animation = true;
			this.animationIndex = 0;
		}
		var term = this.app.term;
		
		this.display = this.progress(this.animationIndex++, this.charSize);
		this.app.term.set_prompt(this.display);
		
		if (this.animationIndex < 100) {
			this.timer = setTimeout(() => { this.loop(); }, 100);
		} else {
			term.echo(this.progress(this.animationIndex, this.charSize) + ' [[b;green;]OK]')
				.set_prompt(this.prompt);
			this.animation = false
		}
	}
	private progress(percent: number, width: number) {
		var size = Math.round(width * percent / 100);
		var left = '', taken = '', i;
		for (i = size; i--;) {
			taken += '=';
		}
		if (taken.length > 0) {
			taken = taken.replace(/=$/, '>');
		}
		for (i = width - size; i--;) {
			left += ' ';
		}
		return '[' + taken + left + '] ' + percent + '%';
	}
	cancell(): boolean {
		if (this.animation) {
			
				clearTimeout(this.timer);
			this.animation = false;
			this.app.term.echo(this.display + ' [[b;red;]FAIL]')
					.set_prompt(this.prompt);
			
			return false;
		}
	}
	set(value: number, status?: string) {
		var term = this.app.term;
		var percent = value / this.Maximum * 100;
		var s = status == null ? "" : " " + status;
		this.display = this.progress(percent, this.charSize) + s;
		term.set_prompt(this.display);

	}
	close() {
		this.app.term.set_prompt(this.prompt);

	}
}