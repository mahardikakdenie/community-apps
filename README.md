# Community Apps 🤝

Community Apps is a community-focused mobile application built with **Expo (v54)** and **React Native**. It is designed to connect local community members by facilitating event discovery, cafe hangouts, loyalty points management, ticketing, and interactive location sharing.

---

## 📱 Key Features

- **🏠 Home Hub**: View followed events, check loyalty points ("Poin Main"), check verified status, and browse quick actions (Cari Event, Hangout Cafe, Tiket Saya).
- **☕ Partner Cafe Directory**: Explore nearby hangout spots (such as warungs and cafes) with metadata like distance, operating hours, amenities (Wi-Fi, AC, gaming gear), check-in details, and exclusive member discounts.
- **🗺️ Interactive Event Map**: Visualizes local events (e.g., Futsal, Mobile Legends: Bang Bang (MLBB), Congklak, Badminton, Running) on a native map interface using `react-native-maps`.
- **🎫 Digital Ticket Pass**: Access confirmation cards and active booking passes with QR/booking codes for joined community tournaments and games.
- **👤 User Profile**: Manage player levels, gaming and sport stats, membership levels, and application configurations.

---

## 📂 Project Directory Structure

Below is an overview of the directory structure and the core files within this repository:

- **`app/`**: File-based navigation structure powered by Expo Router.
  - **`app/(tabs)/`**: Screens mapped to the main bottom navigation tab bar:
    - `index.tsx`: The primary Home Screen dashboard.
    - `cafe.tsx`: Directory of partner cafes with check-in details.
    - `map.tsx` / `components/MapComponent.tsx`: Coordinates map pins and displays event locations.
    - `tickets.tsx`: List of active and pending tickets.
    - `profile.tsx`: Member info and statistics.
- **`components/`**: Reusable interface elements, such as `MapComponent.tsx`.
- **`constants/`**: Design tokens and static data:
  - `data.ts`: Mock database containing events, cafe listings, map coordinates, and ticket entries.
  - `theme.ts`: UI colors, fonts, layout spacings, and style templates.
- **`hooks/`**: Custom hooks for handling layout state and operations.
- **`android/`**: Android native files generated during prebuilding.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **Expo Go** app installed on your physical mobile device, or configured iOS Simulator / Android Emulator.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahardikakdenie/community-apps.git
   cd community-apps
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

To run on an emulator or a real device:
- Press `a` in the terminal for Android.
- Press `i` in the terminal for iOS.
- Scan the QR code using the Expo Go application (Android) or the native Camera app (iOS).

---

## 🤝 Collaboration Guide

We welcome contributions to Community Apps! Please follow these guidelines to maintain project structure and build quality:

### 1. Branching Strategy
- Core development occurs on the `master` branch.
- For new features, bug fixes, or chores, create a new branch from `master` with standard naming conventions:
  - `feature/your-feature-name`
  - `bugfix/issue-description`
  - `chore/update-dependencies`

### 2. Implementation Rules
- Prioritize reusable layout tokens defined in [theme.ts](file:///c:/Users/FS-User/Documents/community-apps/constants/theme.ts).
- For tab layout changes, make sure you wrap your UI in the safe area context components to support notch displays.
- Keep components small and specialized under [components/](file:///c:/Users/FS-User/Documents/community-apps/components).

### 3. Submission Workflow
- Commit clean, descriptive messages.
- Push your local branch to the remote:
  ```bash
  git push origin feature/your-feature-name
  ```
- Open a Pull Request (PR) on GitHub targeting `master`.
- Briefly describe what was added or changed, and provide UI screenshots if applicable.

---

Thank you for helping build Community Apps!
