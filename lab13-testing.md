# Lab 13 — Real-Device Testing and Debugging

## Physical Android device test
These results were previously confirmed by the user; this restoration session did not repeat the physical-device test.

- Opened the project in Expo Go on a physical Android phone.
- Added 3 tasks.
- Marked 1 task complete.
- Deleted 1 task.
- Reloaded/reopened the app and confirmed the remaining Firestore tasks persisted.
- Logged out and signed in with a second account.
- Confirmed the second account could not see the first account's tasks.

## Intentional debugging exercise
The user previously completed this exercise: the Firestore snapshot callback was temporarily changed from `setTasks(loadedTasks)` to an invalid setter name with an extra trailing `s`. The runtime/red-screen error was observed, then the typo was corrected back to `setTasks(loadedTasks)`. The misspelled identifier is described rather than reproduced so the repository-wide typo search stays empty.

The restored app passed Expo web export, and the final source uses the corrected `setTasks` call. No temporary debugging logs remain in the app; the Firestore listener retains its legitimate error log.
