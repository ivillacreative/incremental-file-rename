const fs = require('fs').promises;
const path = require('path');
const { program } = require('commander');

// Parse command line arguments
program
    .option('--directory <path>', 'Path to the directory containing files to rename')
    .option('--prefix <prefix>', 'Custom prefix to add before the number', '')
    .option('--dryRun', 'Preview changes without modifying files', false)
    .parse(process.argv);

const options = program.opts();

// Validate required options
if (!options.directory) {
    console.error('Error: --directory option is required');
    process.exit(1);
}

// Clean the directory path by removing any surrounding quotes
options.directory = options.directory.replace(/^['"]|['"]$/g, '');

/**
 * Recursively get all files in a directory
 * @param {string} dirPath - Path to the directory
 * @returns {Promise<string[]>} Array of file paths
 */
async function getAllFiles(dirPath) {
    const files = await fs.readdir(dirPath);
    const filePaths = [];

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            const subFiles = await getAllFiles(filePath);
            filePaths.push(...subFiles);
        } else {
            filePaths.push(filePath);
        }
    }

    return filePaths;
}

/**
 * Generate new filename with incremental number
 * @param {string} filePath - Original file path
 * @param {number} number - Incremental number
 * @param {string} prefix - Optional prefix
 * @returns {string} New file path
 */
function generateNewFileName(filePath, number, prefix) {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    const newName = `${baseName}${prefix}${number}${ext}`;
    return path.join(dir, newName);
}

/**
 * Main function to rename files
 */
async function renameFiles() {
    try {
        const files = await getAllFiles(options.directory);
        console.log(`Found ${files.length} files to process`);

        if (options.dryRun) {
            console.log('\nDRY RUN MODE: No files will be modified');
            files.forEach((file, index) => {
                const newPath = generateNewFileName(file, index + 1, options.prefix);
                console.log(`Would rename: ${file} → ${newPath}`);
            });
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const newPath = generateNewFileName(file, i + 1, options.prefix);
            
            if (file !== newPath) {
                await fs.rename(file, newPath);
                console.log(`Renamed: ${file} → ${newPath}`);
            }
        }

        console.log('\nFile renaming completed successfully!');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

// Execute the script
renameFiles();
