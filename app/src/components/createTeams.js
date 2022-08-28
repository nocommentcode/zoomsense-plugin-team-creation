export const saveBreakoutRoomsAsTeams = async (meetingId, db) => {
  const entryExitLogsResult = await getEntryExit(meetingId, db);
  const teams = currentBORooms(entryExitLogsResult);
  await setTeams(meetingId, teams, db);
  return teams;
};

export const currentBORooms = (entryExit) => {
  const latestBreakoutRoomValues = Object.fromEntries(
    Object.entries(entryExit).map(([botId, entryExit], index) => {
      const sorted = Object.values(entryExit).sort(
        (a, b) => a.timestamp - b.timestamp
      );

      const usersInRoom = new Set();
      let allUsers = {};
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
        index,
        {
          members: Array.from(usersInRoom).map((userName) => ({
            ...allUsers[userName],
          })),
          teamName: `Team ${index + 1}`,
          isInBO: wasPreviouslyInBO,
          sensorId: botId,
        },
      ];
    })
  );

  return latestBreakoutRoomValues;
};

const getValFromDb = async (path, db) => (await db.ref(path).get()).val();

export const setTeams = async (meetingId, teams, db) => {
  await db.ref(`data/plugins/teamPlugin/${meetingId}`).set(teams);
};

export const getEntryExit = async (meetingId, db) => {
  const entryExit = await getValFromDb(`data/logs/entryExit/${meetingId}`, db);

  if (!entryExit) return {};

  return entryExit;
};
