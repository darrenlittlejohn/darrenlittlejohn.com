# Darren Littlejohn Portfolio Website

This repository contains the source code for my personal portfolio website, [darrenlittlejohn.com](https://darrenlittlejohn.com).

## Project History & Setup

Here is an outline of the steps taken to bring this site to life from its initial version:

### 1. File Transfer and Initialization
- Transferred existing static HTML and CSS portfolio files into a clean project directory.
- Initialized the local root folder as a Git repository (`git init`).

### 2. Version Control (GitHub)
- Created a new remote repository on GitHub at [darrenlittlejohn/darrenlittlejohn.com](https://github.com/darrenlittlejohn/darrenlittlejohn.com).
- Committed the initial file structure, consisting of the `index.html`, `assets/css/style.css`, and `assets/js/main.js` files.
- Renamed the default branch to `main`, linked the remote origin, and pushed the files.

### 3. Remote Deployment (DreamHost Test Environment)
To test and preview changes without overwriting the live WordPress install, we set up a Git-based deployment workflow mirroring to a test directory:
- Generated an RSA SSH key locally to establish a secure connection with DreamHost.
- Set up SSH access to DreamHost for the `dh_4p6hgk` user.
- Created the necessary target deployment directories: `~/test.darrenlittlejohn.com` (deployment target) and `~/test.darrenlittlejohn.git` (bare repository).
- Initialized the bare Git repository with `git init --bare` to receive deployments.
- Created a `post-receive` hook with the following checkout command to automatically migrate files upon push:
  ```bash
  #!/bin/bash
  GIT_WORK_TREE=/home/dh_4p6hgk/test.darrenlittlejohn.com git checkout -f
  ```
- Make the hook executable (`chmod +x hooks/post-receive`).
- Configured a local secondary remote pointing to the DreamHost test environment (`git remote add test dh_4p6hgk@vps29335.dreamhostps.com:test.darrenlittlejohn.git`).
- Deployed the initial code directly by running `git push test main`.
