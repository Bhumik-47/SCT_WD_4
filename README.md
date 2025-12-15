# ⏱️ Task 02: Stopwatch Web Application

## Project Description

This project is a functional, digital stopwatch designed to accurately measure and record time intervals. It serves as an excellent demonstration of JavaScript's ability to handle real-time execution and persistent time tracking.

## Key Features

* **Accurate Timekeeping:** Implemented using `setInterval` and `Date.now()` to ensure time is tracked in milliseconds and displayed with precision (HH:MM:SS.ms format).
* **Control Functions:** Includes fully functional **Start**, **Pause**, and **Reset** buttons to manage the timing state.
* **Lap Time Recording:** The **Lap** button records the time elapsed *at that specific moment* without interrupting the running timer. Lap times are displayed in a list.
* **Interactive Interface:** Buttons are dynamically enabled/disabled based on the stopwatch's state (e.g., Lap is disabled when the watch is paused or reset).

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Structure for the time display and control buttons. |
| **CSS3** | Styling for a modern, digital aesthetic and clear layout. |
| **JavaScript (ES6)** | Core logic, timing calculation (`setInterval`, `clearInterval`), and DOM manipulation for updating the time and lap list. |

## How to Run

1.  Clone the repository or download the files.
2.  Open the `index.html` file in any web browser.
