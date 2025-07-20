# Indian Movies MCP Agent 🎬

A Model Context Protocol (MCP) agent that provides Indian movie recommendations directly within Claude Desktop. Get personalized Bollywood, Tollywood, and regional cinema suggestions with intelligent filtering by genre, language, rating, and release year.

## 🎯 What This Does

This MCP agent adds three powerful tools to your Claude Desktop:
- **Smart Recommendations**: Filter movies by genre, language, rating, or year
- **Movie Search**: Find detailed information about specific films
- **Random Discovery**: Get surprise recommendations from curated Indian cinema

## 📋 Prerequisites

Before you begin, ensure you have:

- **macOS** (this guide is Mac-specific)
- **Node.js** version 18 or higher ([Download here](https://nodejs.org/))
- **Claude Desktop** app ([Download here](https://claude.ai/download))
- **Terminal** access
- **Text editor** (VS Code, TextEdit, etc.)

### Check Your Node.js Version
```bash
node --version
```
If you see `v18.0.0` or higher, you're good to go!

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone and Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/indian-movies-mcp.git
cd indian-movies-mcp

# Install dependencies
npm install

# Test the server (optional)
npm start
```

If testing, you should see: `Indian Movies MCP server running on stdio`
Press `Ctrl+C` to stop the test.

### Step 2: Get Your Project Path
```bash
# Get the full path to your project
pwd
```
**Copy this path!** You'll need it in the next step.
Example output: `/Users/john/Documents/indian-movies-mcp`

### Step 3: Configure Claude Desktop

#### Option A: Create Config File via Terminal (Recommended)
```bash
# Navigate to Claude's config directory
cd ~/Library/Application\ Support/Claude/

# Create the config file
cat > claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "indian-movies": {
      "command": "node",
      "args": ["REPLACE_WITH_YOUR_PATH/index.js"]
    }
  }
}
EOF
```

**Important**: Replace `REPLACE_WITH_YOUR_PATH` with the path you copied from Step 2.

#### Option B: Create Config File Manually
1. Open Finder
2. Press `Cmd + Shift + G`
3. Go to: `~/Library/Application Support/Claude/`
4. Create a new file named: `claude_desktop_config.json`
5. Copy and paste this content, replacing the path:

```json
{
  "mcpServers": {
    "indian-movies": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/path/to/indian-movies-mcp/index.js"]
    }
  }
}
```

### Step 4: Connect to Claude Desktop
1. **Completely quit** Claude Desktop (don't just close the window)
2. **Restart** Claude Desktop
3. **Wait 10-15 seconds** for the connection to establish

### Step 5: Test It!
In Claude Desktop, try asking:
- "Recommend some Hindi comedy movies"
- "Find action movies with rating above 8"
- "Search for the movie Dangal"
- "Give me a random Indian movie recommendation"

## 📖 Detailed Installation Guide

### For Complete Beginners

#### What is Node.js?
Node.js lets you run JavaScript on your computer (outside of a web browser). We need it to run our movie recommendation server.

#### Installing Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (Long Term Support)
3. Run the installer
4. Restart your Terminal after installation

#### What is npm?
npm (Node Package Manager) comes with Node.js and helps install code libraries. Think of it like an app store for code.

#### Understanding the File Structure
```
indian-movies-mcp/
├── package.json          # Project configuration and dependencies
├── index.js              # Main MCP server code
├── README.md             # This file
└── node_modules/         # Installed dependencies (created by npm install)
```

## 🛠️ Manual Setup (Alternative Method)

If you prefer to set up everything from scratch:

### 1. Create Project Directory
```bash
mkdir indian-movies-mcp
cd indian-movies-mcp
```

### 2. Create package.json
```bash
cat > package.json << 'EOF'
{
  "name": "indian-movies-mcp",
  "version": "1.0.0",
  "description": "MCP server for Indian movie recommendations",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.4.0"
  }
}
EOF
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create the Server File
Copy the `index.js` content from this repository into a new file in your project directory.

### 5. Continue with Step 2 from Quick Start

## 🎭 Available Movie Tools

### 1. Get Movie Recommendations
**Usage**: "Recommend movies with specific criteria"

**Parameters**:
- `genre`: Comedy, Drama, Action, Thriller, etc.
- `language`: Hindi, Telugu, Tamil, etc.
- `min_rating`: Minimum rating (0-10)
- `year_after`: Movies released after this year

**Examples**:
- "Show me Hindi comedies"
- "Find action movies with rating above 8"
- "Recommend movies from 2015 onwards"

### 2. Search Movie
**Usage**: "Search for a specific movie"

**Parameters**:
- `title`: Movie title to search for

**Examples**:
- "Tell me about 3 Idiots"
- "Search for Baahubali"

### 3. Random Movie
**Usage**: "Get a surprise recommendation"

**Examples**:
- "Suggest a random Indian movie"
- "Give me a random recommendation"

## 🎬 Current Movie Database

The agent includes these popular Indian films:

**Hindi Cinema**:
- 3 Idiots (2009) - Comedy/Drama
- Dangal (2016) - Biography/Drama/Sport
- Taare Zameen Par (2007) - Drama/Family
- Zindagi Na Milegi Dobara (2011) - Adventure/Comedy
- And more...

**Regional Cinema**:
- Baahubali 2 (2017) - Telugu Action/Drama
- Various Tamil and other regional films

## 📊 Enhanced Logging for MCP Protocol Learning

This version includes comprehensive logging to help you understand the Model Context Protocol (MCP) communication between Claude and the MCP agent. Perfect for learning how MCP works under the hood!

### 🔍 What Gets Logged

The enhanced logging system captures:
- **Protocol Messages**: All requests and responses between Claude and the MCP server
- **Tool Calls**: Detailed information about which tools are called and with what parameters
- **Data Filtering**: Step-by-step filtering process for movie recommendations
- **Error Handling**: Comprehensive error logging with stack traces
- **Server Lifecycle**: Connection, disconnection, and heartbeat messages

### 📁 Log File Location

Logs are written to: `mcp-server.log` in your project directory

### 🚀 Viewing Logs in Real-Time

#### Option 1: Terminal Logs (Live Output)
Start the server and watch logs in your terminal:
```bash
cd /path/to/your/indian-movies-mcp
npm start
```

You'll see live logs like:
```
[MCP INFO] === MCP Server Starting ===
[MCP INFO] Movie database loaded
[MCP INFO] Server instance created
[MCP INFO] === MCP SERVER CONNECTED AND READY ===
```

#### Option 2: Follow Log File (Recommended for Learning)
In a separate terminal window, watch the detailed log file:
```bash
# Navigate to your project directory
cd /path/to/your/indian-movies-mcp

# Follow the log file in real-time
tail -f mcp-server.log
```

#### Option 3: View Complete Log History
```bash
# View all logs from the beginning
cat mcp-server.log

# View recent logs with line numbers
tail -100 mcp-server.log | nl

# Search for specific events
grep "TOOL CALL" mcp-server.log
grep "ERROR" mcp-server.log
```

### 🎯 Understanding MCP Protocol Flow

When you interact with Claude, watch the logs to see this flow:

1. **Initialization**: Claude connects to your MCP server
2. **Tool Discovery**: Claude asks "what tools do you have?"
3. **Tool Execution**: Claude calls specific tools with parameters
4. **Data Processing**: Your server processes and returns results

#### Example Log Sequence

When you ask Claude "Recommend Hindi comedies", you'll see:

```
[2024-07-20T10:30:15.123Z] [INFO] === RECEIVED LIST TOOLS REQUEST ===
[2024-07-20T10:30:15.124Z] [INFO] Sending tools response: {
  "tools": [...]
}

[2024-07-20T10:30:15.200Z] [INFO] === RECEIVED TOOL CALL REQUEST ===
[2024-07-20T10:30:15.201Z] [INFO] Tool name: get_movie_recommendations
[2024-07-20T10:30:15.202Z] [INFO] Tool arguments: {
  "genre": "Comedy",
  "language": "Hindi"
}

[2024-07-20T10:30:15.203Z] [INFO] Processing movie recommendations request
[2024-07-20T10:30:15.204Z] [INFO] Starting with movies: {"count": 10}
[2024-07-20T10:30:15.205Z] [INFO] Filtering by genre: Comedy
[2024-07-20T10:30:15.206Z] [INFO] After genre filter: {"count": 4}
[2024-07-20T10:30:15.207Z] [INFO] Filtering by language: Hindi
[2024-07-20T10:30:15.208Z] [INFO] After language filter: {"count": 3}
```

### 🔬 Learning MCP Protocol Concepts

Use the logs to understand these MCP concepts:

#### 1. Tool Discovery
Watch for `LIST TOOLS REQUEST` to see how Claude discovers available tools:
```bash
grep -A 10 "LIST TOOLS REQUEST" mcp-server.log
```

#### 2. Tool Schemas
See how input validation works by examining tool call parameters:
```bash
grep -A 5 "Tool arguments" mcp-server.log
```

#### 3. Error Handling
Understand MCP error handling by triggering errors:
```bash
# In Claude, try: "Search for a movie that doesn't exist"
grep "ERROR" mcp-server.log
```

#### 4. Data Flow
Track data transformation through the logging:
```bash
grep -E "(Starting with|After.*filter)" mcp-server.log
```

### 🛠️ Debugging with Logs

#### Finding Connection Issues
```bash
# Check if server started properly
grep "SERVER CONNECTED" mcp-server.log

# Look for connection errors
grep -i "error\|failed" mcp-server.log
```

#### Analyzing Tool Performance
```bash
# See which tools are called most
grep "Tool called:" mcp-server.log | sort | uniq -c

# Check tool execution times (manual timing from timestamps)
grep -E "Tool called:|Sending.*response" mcp-server.log
```

#### Understanding Request Flow
```bash
# See the complete request-response cycle
grep -E "RECEIVED.*REQUEST|Sending.*response" mcp-server.log
```

### 📚 Log Levels Explained

- **INFO**: Normal operations (tool calls, data processing)
- **WARN**: Potential issues that don't break functionality
- **ERROR**: Actual errors that need attention
- **DEBUG**: Verbose information for detailed analysis

### 🎓 Learning Exercises

Try these exercises to understand MCP better:

#### Exercise 1: Basic Protocol Flow
1. Start the server and watch logs
2. Ask Claude: "What movie tools do you have?"
3. Observe the tool discovery protocol in the logs

#### Exercise 2: Parameter Validation
1. Ask Claude: "Recommend movies" (no parameters)
2. Ask Claude: "Recommend Hindi comedies" (with parameters)
3. Compare how parameters are handled in the logs

#### Exercise 3: Error Handling
1. Temporarily break the code (add a syntax error)
2. Watch how errors propagate through the MCP protocol
3. Fix the code and observe recovery

#### Exercise 4: Data Filtering
1. Ask for complex filters: "Hindi action movies from 2015 with rating above 8"
2. Watch the step-by-step filtering process in the logs
3. Understand how data flows through the system

### 📁 Log File Management

The log file can grow large over time. Manage it with:

```bash
# Check log file size
ls -lh mcp-server.log

# Archive old logs
mv mcp-server.log mcp-server-$(date +%Y%m%d).log

# Clear current logs (server will create new file)
> mcp-server.log

# Rotate logs automatically (optional)
# Add to your crontab for daily rotation:
# 0 0 * * * cd /path/to/indian-movies-mcp && mv mcp-server.log logs/mcp-server-$(date +\%Y\%m\%d).log 2>/dev/null
```

### 🎯 Pro Tips for MCP Learning

1. **Use Two Terminals**: One for server logs, one for file logs
2. **Timestamps**: Correlate Claude requests with log timestamps
3. **JSON Formatting**: Use `jq` to format JSON in logs: `cat mcp-server.log | grep "Tool arguments" | jq`
4. **Pattern Matching**: Learn to spot patterns in MCP communication
5. **Error Simulation**: Intentionally trigger errors to understand error handling

## 🔧 Troubleshooting

### MCP Server Not Connecting

**Problem**: Claude Desktop doesn't recognize the MCP server

**Solutions**:
1. **Check the config file path**:
   ```bash
   ls ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. **Verify the server path is absolute**:
   ```bash
   # Your path should start with / like this:
   /Users/john/Documents/indian-movies-mcp/index.js
   ```

3. **Test your server manually**:
   ```bash
   cd /path/to/your/indian-movies-mcp
   npm start
   ```

4. **Completely restart Claude Desktop**:
   - Quit Claude Desktop (Cmd+Q)
   - Wait 5 seconds
   - Restart Claude Desktop

### Node.js or npm Issues

**Problem**: `command not found: node` or `command not found: npm`

**Solution**:
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your Terminal
3. Verify installation: `node --version`

### Permission Issues

**Problem**: Permission denied errors

**Solution**:
```bash
# Make the script executable
chmod +x index.js

# If you have permission issues with the config directory
sudo chown -R $(whoami) ~/Library/Application\ Support/Claude/
```

### Config File Issues

**Problem**: JSON syntax errors

**Solution**:
1. Validate your JSON at [jsonlint.com](https://jsonlint.com/)
2. Common issues:
   - Missing commas
   - Incorrect quotes (use `"` not `'`)
   - Missing closing brackets

### Logging Issues

**Problem**: No logs appearing in mcp-server.log

**Solution**:
1. Check if the server is running:
   ```bash
   ps aux | grep "node.*index.js"
   ```

2. Verify logging.js is properly imported:
   ```bash
   grep "from './logging.js'" index.js
   ```

3. Check file permissions:
   ```bash
   ls -la mcp-server.log
   # If file doesn't exist, it will be created automatically
   ```

4. Test logging manually:
   ```bash
   node -e "import('./logging.js').then(({log}) => log('Test message'))"
   ```

**Problem**: Logs are too verbose or cluttering terminal

**Solution**:
1. Use only file logging by redirecting stderr:
   ```bash
   npm start 2>/dev/null
   ```

2. Filter logs by level:
   ```bash
   grep "\[ERROR\]" mcp-server.log
   grep "\[WARN\]" mcp-server.log
   grep "\[INFO\]" mcp-server.log
   ```

3. Reduce log verbosity by commenting out detailed logs in index.js

**Problem**: Log file growing too large

**Solution**:
1. Set up log rotation:
   ```bash
   # Create logs directory
   mkdir -p logs
   
   # Rotate current log
   mv mcp-server.log logs/mcp-server-backup-$(date +%Y%m%d-%H%M%S).log
   ```

2. Implement size-based rotation:
   ```bash
   # Check file size and rotate if > 10MB
   if [ $(wc -c < mcp-server.log) -gt 10485760 ]; then
     mv mcp-server.log logs/mcp-server-$(date +%Y%m%d-%H%M%S).log
   fi
   ```

**Problem**: Cannot correlate Claude actions with logs

**Solution**:
1. Use precise timestamps:
   ```bash
   # Note the time when you make a request in Claude
   date
   # Then check logs around that time
   grep "2024-07-20T10:30" mcp-server.log
   ```

2. Add request markers in Claude:
   - Ask Claude: "Search for test-marker-movie"
   - Look for this unique term in logs to identify your session

3. Use unique test queries:
   ```bash
   # Instead of "recommend movies", use:
   # "recommend movies with unique-identifier-12345"
   # Then search logs for "unique-identifier-12345"
   ```

## 🔄 Updating the Movie Database

Want to add more movies? Edit the `indianMovies` array in `index.js`:

```javascript
const indianMovies = [
  // Add your movie like this:
  {
    title: "Your Movie Title",
    year: 2023,
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 8.0,
    director: "Director Name",
    description: "Brief description of the movie."
  },
  // ... existing movies
];
```

After adding movies:
1. Save the file
2. Restart Claude Desktop
3. Test with new movie searches

## 🤝 Contributing

Want to improve this MCP agent?

1. Fork this repository
2. Create a feature branch: `git checkout -b feature-name`
3. Add more movies, improve filtering, or add new tools
4. Commit your changes: `git commit -m "Add feature"`
5. Push to your branch: `git push origin feature-name`
6. Create a Pull Request

### Ideas for Contributions
- Add more regional Indian films
- Include movie posters or trailers
- Add director/actor filtering
- Include streaming platform availability
- Add movie reviews or ratings from multiple sources

## 📝 License

MIT License - feel free to use and modify!

## 🆘 Getting Help

If you run into issues:

1. **Check the troubleshooting section above**
2. **Create an issue** on this GitHub repository
3. **Include**:
   - Your macOS version
   - Node.js version (`node --version`)
   - Error messages
   - Your config file (remove personal paths)

## 🎉 What's Next?

Once you have this working, you can:
- Build other MCP agents for different domains
- Expand this agent with more Indian cinema data
- Create agents for other movie industries
- Add real-time data from movie APIs

Happy movie watching! 🍿
