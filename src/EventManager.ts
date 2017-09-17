class EventManager {
	public static eventHandlers: { [key: string]: (args: any[]) => void } = {};

	constructor() {
		API.onServerEventTrigger.connect(this.onEventTrigger as any);
	}

	private onEventTrigger = (eventName: string, args: System.Array<any>) => {
		// Reverse read-out, cause System.Array is whacky af in JS.
		var argsArray: any[] = [];
		for (let i = args.Length - 1; i >= 0; i--)
			argsArray[i] = args[i];
		
		var handler = EventManager.eventHandlers[eventName];
		if (typeof (handler) == "undefined" || handler == null) {
			API.sendChatMessage(`~r~No handler for event: ${eventName}`);
			return;
		}

		handler(argsArray);
	};
}

API.onResourceStart.connect(() => {
	new EventManager();
});
