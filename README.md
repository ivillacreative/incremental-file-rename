# Incremental File Renamer

A Node.js utility that recursively traverses directories and renames files with sequential numbers while preserving folder structure.

## Features

- Recursively processes all files in nested folder structures
- Adds incremental numbering to filenames
- Preserves original folder organization
- Optional custom prefix for numbered files
- Dry run mode to preview changes without modifying files


## Usage

node rename.js --directory="path/to/folder" [--prefix="img_"] [--dryRun]

### Options

| Option      | Description                                      | Default    | Required |
|-------------|--------------------------------------------------|------------|----------|
| --directory | Path to the directory containing files to rename | -          | Yes      |
| --prefix    | Custom prefix to add before the number           | ""         | No       |
| --dryRun    | Preview changes without modifying files          | false      | No       |

## How It Works

The script traverses all subdirectories of the specified folder, collecting a list of files. It then assigns an incremental number to each file and renames them accordingly.

### Example

#### Original Structure
- Animals/
  - cat.jpg
  - dog.jpg
  - mouse.jpg
- Food/
  - cake.jpg
  - ice-cream.jpg

#### After Running the Script
- Animals/
  - cat-1.jpg
  - dog-2.jpg
  - mouse-3.jpg
- Food/
  - cake-4.jpg
  - ice-cream-5.jpg

#### With Custom Prefix (--prefix="img_")
- Animals/
  - cat-img_1.jpg
  - dog-img_2.jpg
  - mouse-img_3.jpg
- Food/
  - cake-img_4.jpg
  - ice-cream-img_5.jpg

## Dry Run Mode

When you set --dryRun, the script will simulate the renaming process without actually modifying any files. It will output a detailed log of the changes it would make:

DRY RUN MODE: No files will be modified
Would rename: Animals/cat.jpg → Animals/cat-1.jpg
Would rename: Animals/dog.jpg → Animals/dog-2.jpg
Would rename: Animals/mouse.jpg → Animals/mouse-3.jpg
Would rename: Food/cake.jpg → Food/cake-4.jpg
Would rename: Food/ice-cream.jpg → Food/ice-cream-5.jpg

## Considerations

- The script preserves file extensions
- Original filenames are maintained with the number appended
- Files are numbered in the order they are discovered during directory traversal
- Existing files will be overwritten if there are naming conflicts

## License

MIT
