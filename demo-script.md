# Week1Labs — StudyBuddy Demo Script

## Problem — about 60 seconds
Students often need a simple place to keep track of school tasks and reminders. StudyBuddy is a mobile task app for students that lets each user create an account, sign in, add tasks, mark them complete, and delete them. Tasks are stored in Firebase Firestore, so they are not limited to one phone.

## Live Walkthrough — about 150 seconds
1. Open the installed StudyBuddy app and show the login screen.
2. Sign in with a test account, or create a new account from the Sign Up screen.
3. Add a task and show it appearing in the task list.
4. Mark the task as completed, then delete another task.
5. Tap Log Out, sign in with a second account, and show that it does not see the first account's tasks.

## Technical Challenge — about 90 seconds
One challenge was making sure every user only sees their own tasks. At first, all tasks could be read from the same Firestore collection. I solved this by saving `auth.currentUser.uid` as `ownerId` when a task is created. The listener uses `query()` with `where('ownerId', '==', user.uid)` to load only the signed-in user's tasks. `onSnapshot()` keeps that filtered list synchronized as tasks are added, completed, or deleted. Logout returns to authentication, and signing in again creates the listener for that account.

## Worksheet Presentation Schedule

The sections above are a six-minute script outline to adapt to the required presentation slots: Pitching — 5 minutes; Walkthrough — 4 minutes; Technical Challenge — 1 minute; Q&A — 5 minutes; Transition — 3 minutes. Condense the technical explanation to one minute and use the walkthrough slot for all account and task steps. Rehearsal has not been confirmed.

## Closing
StudyBuddy demonstrates a complete mobile workflow: React Native and Expo for the app, Firebase Authentication for user accounts, and Firestore for real-time cloud data.
