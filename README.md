# Zoomsense Team Creation Plugin

This plugin will save the current breakout room assignments as teams.
It will store the following data for each breakout room:

- isInBO: whether the team is in a breakout room or the main room
- sensorId: the id of the zoombot sensor in that breakout room
- teamName: a string in the form 'Team n' where n is a counter
- members: an array of members, each member stores the memberId, userId, userName and userRole.

The admin can set the teams by pressing the 'Assign to teams' button in the dashboard.
This will then display the arrangement of the teams that was saved.
The admin can overrride the teams by pressing the button again, this will delete the previous team configuation and save the new one

## configuation

Simply add this plugin at the top of your configuration file to enable it:
eg:

- plugin: teamPlugin
