---

title: WakaWaka
description: WakaWaka is a free, open-source WakaTime client for Android that stores all your coding stats locally on your phone. It provides a simple dashboard with goal setting, streak tracking, and home screen widgets to visualize your progress.
github_link: https://github.com/AughtDev/WakaWaka

---

# **WakaWaka: A Local-First WakaTime Android Client**

A feature overview of the free, open-source WakaTime client focused on local data ownership. 

**WakaTime** provides useful developer metrics, but long-term access to historical data requires a subscription. 
**WakaWaka** was developed with the principle of data ownership in mind. It is a "local-first" Android client that 
fetches WakaTime API data and stores it on your device, allowing for unrestricted access to your entire coding history.

| ![](/media/wakawaka/projects-tab-screenshot.jpg) | ![](/media/wakawaka/home-tab-screenshot.jpg) | ![](/media/wakawaka/settings-tab-screenshot.jpg) |
|--------------------------------------------------|----------------------------------------------|--------------------------------------------------|

### **Home Dashboard**

The main screen of the application provides a summary of coding activity. The primary UI element is a calendar view, modeled after GitHub's contribution graph, which visualizes daily coding duration. The opacity of each day is scaled to the coding time, with an algorithm that adjusts the range to provide visual contrast even for projects with lower daily durations. Days on which a daily target is met are indicated with a colored ring.

The dashboard also displays the current daily streak count and key aggregate metrics for the selected time period (Today, This Week, Last 30 Days, Past Year). A dropdown selector allows the user to filter all dashboard views to show either aggregate data or statistics for a single project.

[//]: # ()
[//]: # (![home-tab-screenshot.jpg]&#40;/media/wakawaka/home-tab-screenshot.jpg&#41;)


### **Project Management and Analysis**

The Projects Tab lists all tracked projects, sorted by a recency-weighted algorithm to place currently active projects at the top.

Selecting a project expands an inline bar graph that displays daily or weekly coding durations against the configured target. Milestone badges are shown for projects that have surpassed duration thresholds (25h, 50h, 100h, etc.).

From this view, users can also:

* **Assign to Widget:** Toggle a project to be displayed in the dedicated single-project home screen widget.
* **Customize:** Navigate to an edit screen to configure project-specific daily and weekly targets and set a custom color for use in all charts and graphs.

[//]: # ()
[//]: # (![projects-tab-screenshot.jpg]&#40;/media/wakawaka/projects-tab-screenshot.jpg&#41;)

### **Goal and Streak Tracking**

The application includes functionality for setting and tracking goals. Users can define daily and weekly coding targets in hours, which can be applied to aggregate activity or on a per-project basis. Daily targets allow for the exclusion of specific days of the week.

The streak modal provides a detailed view of daily and weekly streaks for the user's top projects. A streak is maintained if a target is met; if no target is configured, a streak is counted for any day or week with tracked coding activity.

| ![](/media/wakawaka/aggregate-details-screenshot.jpg) | ![](/media/wakawaka/wakawaka-project-details-screenshot.jpg) |
|-------------------------------------------------------|--------------------------------------------------------------|



### **Data Export and Sharing**

The application can generate and export images for sharing. From the home screen, users can create two types of images for the selected project or for their aggregate data:

1. **Summary Card:** An image displaying total hours, the current milestone badge, streak counts, and key duration metrics.
2. **Calendar Heatmap:** A multi-year calendar visualization of coding activity.

| ![](/media/wakawaka/summary-card-export.png) | ![](/media/wakawaka/calendar-export.png) |
|----------------------------------------------|------------------------------------------|

### **Home Screen Widgets**

WakaWaka provides two home screen widgets for at-a-glance progress tracking:

* **Aggregate Widget:** Displays overall daily and weekly coding trends.
* **Project Widget:** Displays the same trends for a single user-selected project.

Both widgets render recent activity as a bar graph relative to set targets and show current streak data.

![widgets-screenshot.jpg](/media/wakawaka/widgets-screenshot.jpg)

### **Data Management**

The Settings tab contains all data management functions:

* **Import:** The app can be populated with a user's full coding history by importing the official data dump .json 
  file from **WakaTime**.
* **Backup & Restore:** Users can create a local backup of the application's database and restore it.
* **Wipe Data:** An option to delete all locally stored data from the application.

![data-settings-screenshot.jpg](/media/wakawaka/data-settings-screenshot.jpg)

WakaWaka was built to provide a robust, non-commercial tool for developers to analyze their own data. The project is open-source and available on [**GitHub**](https://github.com/AughtDev/WakaWaka) along with all its releases
