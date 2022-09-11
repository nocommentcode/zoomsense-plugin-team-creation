export const listTypeGuard = <T>(
  l: unknown,
  typeGuard: (val: unknown) => val is T
): l is T[] => {
  if (!l || typeof l !== "object" || !Array.isArray(l)) return false;
  return l.every(typeGuard);
};

export type EntryExitLogEntry = {
  isInBO: boolean;
  status: string;
  timestamp: number;
  uid: string;
  userRole: string;
  username: string;
};

export const isEntryExitLogEntry = (
  value: unknown
): value is EntryExitLogEntry => {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;

  return (
    typeof record.isInBO === "boolean" &&
    typeof record.status === "string" &&
    typeof record.timestamp === "number" &&
    typeof record.uid === "string" &&
    typeof record.userRole === "string" &&
    typeof record.username === "string"
  );
};

const isEntryExitLogForSensor = (
  value: unknown
): value is { [idOfLog: string]: EntryExitLogEntry } => {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return listTypeGuard(Object.values(record), isEntryExitLogEntry);
};

export type EntryExitLog = {
  [zoomBotName: string]: {
    [idOfLog: string]: EntryExitLogEntry;
  };
};

export const isEntryExitLog = (value: unknown): value is EntryExitLog => {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return listTypeGuard(Object.values(record), isEntryExitLogForSensor);
};

export type User = {
  username: string;
  userRole: string;
  userId: string;
};
export type Team = {
  isInBO: boolean;
  sensorId: string;
  teamName: string;
  members: User[];
};

export type Teams = {
  [teamId: string]: Team;
};
