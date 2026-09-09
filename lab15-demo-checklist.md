# Lab 15 — Final Demo Readiness

Verified on September 9, 2026. Before this documentation commit, the repository had 21 commits, including four Week 3 lab commits (Labs 11–14). This checklist records the fifth lab's actual verification and presentation preparation; it adds no application features.

## Source and build verification

- [x] Login and Signup screens exist in `screen/` and use Firebase email/password authentication with error feedback.
- [x] Auth-state navigation, native AsyncStorage authentication persistence, and logout are implemented; initialization supports Fast Refresh.
- [x] Firestore listens in real time and supports adding, completing, and deleting tasks.
- [x] New tasks save `ownerId: auth.currentUser.uid`; the listener uses `query()` and `where('ownerId', '==', user.uid)`.
- [x] Motivational quotes and previous task-list features remain.
- [x] README, demo script, testing evidence, and EAS configuration exist.
- [x] Final dependency installation, Expo web export, and public config validation passed. The restored application also passed Android export.
- [x] The intentional setter typo is absent, and no temporary debug logs or merge conflicts remain in application source.
- [x] EAS CLI confirmed the existing Android internal preview build is FINISHED with an APK: [build details](https://expo.dev/accounts/nakauli/projects/Week1Labs/builds/5b6786db-3c1a-4b30-a0cc-2a9c9f9f1903).
- [x] Existing Android package and EAS project ID are restored unchanged. The backup folder is preserved.

## Evidence and remaining presentation work

The user previously confirmed login/signup, adding three tasks, completing one, deleting one, task persistence after reopening, logout, and second-account task isolation on a physical Android device. See `lab13-testing.md`. Those phone tests were not repeated during restoration. Authentication persistence is verified in source; no new cold-start device result is claimed.

The existing APK predates these restored commits; its status and availability were verified, but exact source equivalence was not established. No new cloud build was started.

- [ ] Rehearse using the required schedule: Pitching 5 minutes, Walkthrough 4 minutes, Technical Challenge 1 minute, Q&A 5 minutes, Transition 3 minutes.
- [ ] Have the demo phone, installed preview APK, network connection, and two test accounts ready. Rehearsal and APK installation are not claimed here.

`npm install` reports 16 moderate dependency vulnerabilities. Dependencies were preserved; no forced upgrades were applied.
