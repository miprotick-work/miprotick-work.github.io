---
name: Hidayah
tagline: A guidance for those conscious of Allah.
repo: protick-dev/Hidayah           # live GitHub stats appear once the repo is public
status: active                      # active | beta | maintained | archived | concept
platforms: [Android]
tags: [Reminder, Hidayat, Quran]
featured: true
order: 1
links: {}
#  playStore: https://play.google.com/store/apps/details?id=com.miprotick.hidayah
draft: false                         # set to false once all documents are reviewed
---

## Overview

**Hidayah** puts one verse of the Quran on your Android screen at a time, as a calm, minimal **wallpaper** and a **home-screen widget**. Each verse shows the Arabic text with an English and/or Bangla translation and its reference, set in carefully chosen fonts.

It's a quiet, everyday reminder: every time you unlock your phone, there's a verse waiting for you.

## Highlights

**Wallpaper**

- 8 hand-made designs and 10 colour palettes, or let Hidayah pick at random
- Preview a new verse first, then apply it when you like it
- Apply to the home screen, the lock screen, or both
- Auto-update on a schedule, from every 15 minutes to once a day
- Optional soft card behind the verse for busy designs

**Widget**

- A verse on your home screen that matches your launcher's corner style
- Its own verse, colours and schedule, independent of the wallpaper
- Resizable, and you can refresh it any time from the widget itself

**Verses**

- English (Saheeh International), Bangla, or both, with the Arabic text optional
- Choose short, long or mixed-length verses
- Save any preview to your gallery or copy it as an image

**Private by design:** no account, no ads and no tracking. Verses come from the free [AlQuran Cloud](https://alquran.cloud) service, and your settings stay on your phone.

## Built with

- **Kotlin** on Android 8.0+ (API 26), targeting API 36
- **AndroidX WorkManager** for independent background schedules
- **Material Components** for the interface
- **[AlQuran Cloud API](https://alquran.cloud/api)** for verses (Uthmani script, Saheeh International, Bengali)
- **fastlane** and GitHub Actions for signed releases to Google Play
