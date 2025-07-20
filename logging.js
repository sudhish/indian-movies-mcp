import fs from 'fs';
import path from 'path';

// Create a log file for debugging - use absolute path
const logFile = '/Users/sudhish/work/indian-movies-mcp/mcp-server.log';

// Base logging utility that writes to file and stderr
function writeLog(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}${data ? '\n' + JSON.stringify(data, null, 2) : ''}\n`;
  
  // Write to log file
  try {
    fs.appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
  
  // Also write to stderr so it appears in terminal but doesn't interfere with MCP protocol
  console.error(`[MCP ${level}] ${message}`);
  if (data) {
    console.error(`[MCP DATA]`, JSON.stringify(data, null, 2));
  }
}

// Standard logging function
export function log(message, data = null) {
  writeLog('INFO', message, data);
}

// Error logging function
export function logError(message, data = null) {
  writeLog('ERROR', message, data);
}

// Warning logging function
export function logWarn(message, data = null) {
  writeLog('WARN', message, data);
}

// Debug logging function for verbose output
export function logDebug(message, data = null) {
  writeLog('DEBUG', message, data);
}

// Initialize logging on import
log('=== MCP Server Logging Initialized ===');
log('Process ID (PID):', process.pid);
log('Working directory:', process.cwd());
log('Log file location: ' + logFile);
log('Current time:', new Date().toISOString());