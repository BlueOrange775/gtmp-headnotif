# Head Notifications for GT-MP

This script is simple head notifications in GT-MP.

## Usage

To display a notification, use the following snippet:
```javascript
new HeadNotification("This is the message");
```

You can also trigger a clientside event from the server-side using the following:
```csharp
API.triggerClientEvent(player, "SEND_HEADNOTIF", "This is the message");
```

## Sounds

These also support sounds, which can be fetched from http://wiki.gt-mp.com/ and added to line 50 of HUD.ts
To utilise sounds, just add an extra argument 
```csharp
API.triggerClientEvent(player, "SEND_HEADNOTIF", "This is the message", "SoundSwitchCase");
```

Sounds are only supported on `.triggerClientEvent();`
Maybe in a later update.
