/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";

type FileData = {
  name: string;
  size: number;
};

type Directory = {
  files: FileData[];
  previousDirectory?: Directory;
  totalFileSize: number;
  [subDirectories: string]: any | Directory;
};

const fileSystem: Directory = {
  files: [],
  totalFileSize: 0,
};

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const data = parseData(__dirname).split("$ ").slice(1);
let totalDeletableFileSize = 0;

function isDirectoryKey(key: string) {
  return key == "files" || key == "previousDirectory" || key == "totalFileSize";
}

function turnDataToTree(
  currentDirectory: Directory,
  previousDirectory?: Directory
) {
  const currentCommand = data.shift()?.split("\n");
  let newDirectory;
  if (!currentCommand) return;

  switch (currentCommand[0]) {
    case "ls":
      for (let i = 1; i < currentCommand.length; i++) {
        const subCommands = currentCommand[i].split(" ");

        if (subCommands[0] && isNaN(Number(subCommands[0]))) {
          currentDirectory[subCommands[1]] = {};
        } else if (subCommands[0]) {
          currentDirectory.totalFileSize += Number(subCommands[0]);

          currentDirectory.files.push({
            name: subCommands[1],
            size: Number(subCommands[0]),
          });
        }
      }

      turnDataToTree(currentDirectory, previousDirectory);
      break;

    case "cd ..":
      if (!previousDirectory?.previousDirectory) return;

      turnDataToTree(previousDirectory, previousDirectory.previousDirectory);
      return;

    default:
      newDirectory = currentCommand[0].split(" ")[1];
      currentDirectory[newDirectory] = {
        files: [],
        previousDirectory: currentDirectory,
        totalFileSize: 0,
      };

      turnDataToTree(
        currentDirectory[newDirectory] as Directory,
        currentDirectory
      );
      return;
  }

  const dirs = Object.keys(currentDirectory);

  for (let i = 0; i < dirs.length; i++) {
    if (!isDirectoryKey(dirs[i])) {
      currentDirectory.totalFileSize +=
        currentDirectory[dirs[i]]?.totalFileSize;
    }
  }
}

turnDataToTree(fileSystem);

const rootDirs = Object.keys(fileSystem);

for (let i = 0; i < rootDirs.length; i++) {
  if (!isDirectoryKey(rootDirs[i])) {
    fileSystem.totalFileSize += fileSystem[rootDirs[i]]?.totalFileSize;
  }
}

function solutionA(currentDirectory: Directory) {
  const keys = Object.keys(currentDirectory);

  for (let i = 0; i < keys.length; i++) {
    if (isDirectoryKey(keys[i])) continue;
    if (currentDirectory[keys[i]].totalFileSize !== undefined) {
      if (currentDirectory[keys[i]].totalFileSize <= 100000) {
        totalDeletableFileSize += currentDirectory[keys[i]].totalFileSize;
      }

      solutionA(currentDirectory[keys[i]] as Directory);
    }
  }
}

function solutionB() {
  const MIN_TO_DELETE = -70000000 + 30000000 + fileSystem.totalFileSize;
  let lowestDeletable = Infinity;

  function traverseFileSystem(currentDirectory: Directory) {
    if (!currentDirectory.totalFileSize) return;
    if (
      currentDirectory.totalFileSize > MIN_TO_DELETE &&
      currentDirectory.totalFileSize < lowestDeletable
    ) {
      lowestDeletable = currentDirectory.totalFileSize;
    }

    const keys = Object.keys(currentDirectory);

    for (let i = 0; i < keys.length; i++) {
      if (!isDirectoryKey(keys[i])) {
        traverseFileSystem(currentDirectory[keys[i]] as Directory);
      }
    }
  }

  traverseFileSystem(fileSystem);
  return lowestDeletable;
}

solutionA(fileSystem);
submitAnswer(__dirname, 1, totalDeletableFileSize);
submitAnswer(__dirname, 2, solutionB());
