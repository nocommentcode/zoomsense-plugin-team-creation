import { EntryExitLog, isEntryExitLog, Team, Teams, User } from "./types";

export const saveBreakoutRoomsAsTeams = async (
  meetingId: string,
  db
): Promise<Teams> => {
  const entryExitLogsResult = await getEntryExit(meetingId, db);
  const teams = currentBORooms(entryExitLogsResult);
  await setTeams(meetingId, teams, db);
  return teams;
};

export const currentBORooms = (entryExit: EntryExitLog): Teams => {
  const latestBreakoutRoomValues = Object.fromEntries(
    Object.entries(entryExit).map(
      ([botId, entryExit], index): [string, Team] => {
        const sorted = Object.values(entryExit).sort(
          (a, b) => a.timestamp - b.timestamp
        );

        const usersInRoom = new Set<string>();
        let allUsers: Record<string, User> = {};
        let wasPreviouslyInBO = sorted[0].isInBO;
        sorted.forEach(({ status, uid, userRole, username, isInBO }) => {
          if (isInBO !== wasPreviouslyInBO) {
            wasPreviouslyInBO = isInBO;
            usersInRoom.clear();
            allUsers = {};
          }

          if (status === "enter") {
            usersInRoom.add(username);
          } else if (status === "leave") {
            usersInRoom.delete(username);
          }
          allUsers[username] = { userRole, username, userId: uid };
        });

        return [
          `team_${index}`,
          {
            members: Array.from(usersInRoom).map((userName) => ({
              ...allUsers[userName],
            })),
            teamName: `Team ${index + 1}`,
            isInBO: wasPreviouslyInBO,
            sensorId: botId,
          },
        ];
      }
    )
  );

  return latestBreakoutRoomValues;
};

export const setTeams = async (meetingId: string, teams: Teams, db) => {
  await db.ref(`data/plugins/teamPlugin/${meetingId}`).set(teams);
};

export const getEntryExit = async (
  meetingId: string,
  db
): Promise<EntryExitLog> => {
  const entryExit = db.ref(`data/logs/entryExit/${meetingId}`).get().val();

  if (!isEntryExitLog(entryExit)) return {};

  return entryExit;
};
