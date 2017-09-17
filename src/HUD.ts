class HeadNotification {
	private text: string;
	private alpha = 255;
	private offset = 0;
	private onUpdateConnectedEvent: IConnectedEvent;
	private screenResolution = API.getScreenResolutionMaintainRatio();

	constructor(text: string) {
		this.text = text;
		this.offset = 0;
		
		this.onUpdateConnectedEvent = API.onUpdate.connect(this.onUpdateHandler);
	}

	private onUpdateHandler = () => {
		if (this.alpha <= 0) {
			this.onUpdateConnectedEvent.disconnect();
			return;
		}
		
		API.drawText(
			this.text,
			Math.round(this.screenResolution.Width / 2),
			Math.round((this.screenResolution.Height / 2) + this.offset),
			0.75,
			255, 255, 255,
			Math.round(this.alpha),
			4,
			1,
			false,
			true,
			600);

		this.offset -= 0.5;
		this.alpha -= 2;
	}
}

class HUD {
	constructor() {
		EventManager.eventHandlers["SEND_HEADNOTIF"] = this.sendNotificationEventHandler;
	}

	private sendNotificationEventHandler = (args: any[]) => {
		const notificationText = args[0];

		new HeadNotification(notificationText);

		if (args.length <= 1) return;

		switch (args[1]) {
			case "ItemPickup":
				API.playSoundFrontEnd("PICK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET");
				return;
			case "ObjectiveComplete":
				API.playSoundFrontEnd("Hack_Success", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS");
				return;
			case "ObjectiveFailed":
				API.playSoundFrontEnd("Hack_Failed", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS");
				return;
			default:
				return;
		}
	}
}

API.onResourceStart.connect(() => {
	new HUD();
});
