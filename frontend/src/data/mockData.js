export const mockAlerts = [
  {
    id: 1,
    type: "critical",
    message: "Canary file touched: important_passwords.txt",
    processName: "update.exe",
    filePath: "C:/Users/test/documents/important_passwords.txt",
    entropyScore: 7.8,
    threatScore: 94,
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 2,
    type: "warning",
    message: "High entropy detected in budget.xlsx",
    processName: "chrome.exe",
    filePath: "C:/Users/test/documents/budget.xlsx",
    entropyScore: 6.9,
    threatScore: 65,
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 3,
    type: "info",
    message: "Unusual file rename activity detected",
    processName: "explorer.exe",
    filePath: "C:/Users/test/documents/report.docx",
    entropyScore: 4.2,
    threatScore: 28,
    timestamp: new Date(Date.now() - 240000).toISOString(),
  },
]

export const mockProcesses = [
  {
    id: 1,
    name: "update.exe",
    pid: 4821,
    filesPerMin: 487,
    renameRate: 62,
    threatScore: 94,
    status: "critical",
  },
  {
    id: 2,
    name: "chrome.exe",
    pid: 3201,
    filesPerMin: 12,
    renameRate: 0,
    threatScore: 8,
    status: "safe",
  },
  {
    id: 3,
    name: "explorer.exe",
    pid: 1234,
    filesPerMin: 34,
    renameRate: 3,
    threatScore: 22,
    status: "safe",
  },
]

export const mockFileEvents = [
  {
    id: 1,
    filePath: "C:/Users/test/documents/report.docx",
    eventType: "modified",
    processName: "update.exe",
    entropyAfter: 7.8,
    timestamp: new Date(Date.now() - 30000).toISOString(),
  },
  {
    id: 2,
    filePath: "C:/Users/test/documents/budget.xlsx",
    eventType: "renamed",
    processName: "update.exe",
    entropyAfter: 7.6,
    timestamp: new Date(Date.now() - 35000).toISOString(),
  },
]

export const mockCanaryFiles = [
  {
    id: 1,
    filePath: "C:/Users/test/documents/important_passwords.txt",
    directory: "documents",
    status: "touched",
    touchedBy: "update.exe",
    touchedAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 2,
    filePath: "C:/Users/test/documents/bank_details.docx",
    directory: "documents",
    status: "safe",
    touchedBy: null,
    touchedAt: null,
  },
  {
    id: 3,
    filePath: "C:/Users/test/desktop/private_keys.txt",
    directory: "desktop",
    status: "safe",
    touchedBy: null,
    touchedAt: null,
  },
]

export const mockStats = {
  filesMonitored: 4821,
  threatScore: 67,
  activeProcesses: 12,
  alertsToday: 3,
  networkStatus: "connected",
  monitoringStatus: "active",
  attacksStopped: 1,
  sessionStarted: new Date(Date.now() - 3600000).toISOString(),
}
