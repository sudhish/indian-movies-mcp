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
