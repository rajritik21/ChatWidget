# ChatBot Frontend - Codebase Index

## 📋 Project Overview
A modern chat widget application built with **Preact** and **Tailwind CSS**, featuring a floating chat interface with FAQ and live chat capabilities. The application connects to a backend API for FAQ data.

## 🏗️ Project Structure

```
FrontendwithApi/
├── index.html                 # Main HTML entry point
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── vite.config.js           # Vite build configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── src/
    ├── main.jsx             # Application entry point
    ├── App.jsx              # Root component
    ├── index.css            # Global styles (Tailwind import)
    ├── ChatWidget.jsx       # Main chat widget container
    ├── ChatIcon.jsx         # Floating chat button
    ├── WelcomeDashboard.jsx # Welcome/landing screen
    ├── FAQDashboard.jsx     # FAQ chat interface
    ├── TalkDashboard.jsx    # Live chat interface
    ├── TailwindDemo.jsx     # Tailwind CSS testing component
    ├── README.md            # Component documentation
    └── .gitignore           # Git ignore rules
```

## 🛠️ Technology Stack

### Core Technologies
- **Preact 10.19.2** - Lightweight React alternative
- **Vite 5.2.0** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### Development Dependencies
- **@preact/preset-vite** - Preact integration for Vite
- **@tailwindcss/vite** - Tailwind CSS Vite plugin
- **autoprefixer** - CSS vendor prefixing

## 🎯 Application Architecture

### Entry Points
- **`index.html`** - HTML template with app mounting point
- **`src/main.jsx`** - Preact app initialization and rendering
- **`src/App.jsx`** - Root component that renders ChatWidget

### Component Hierarchy
```
App
└── ChatWidget
    ├── ChatIcon (floating button)
    └── Dashboard Container
        ├── WelcomeDashboard (initial view)
        ├── FAQDashboard (FAQ interface)
        └── TalkDashboard (live chat interface)
```

## 📱 Core Components

### 1. ChatWidget (`src/ChatWidget.jsx`)
**Purpose**: Main container component managing chat state and navigation
**Key Features**:
- State management for chat open/close
- View navigation (dashboard, FAQ, talk)
- Previous view tracking for back navigation
- Responsive design with mobile-first approach

**State Management**:
- `open` - Controls chat widget visibility
- `view` - Current active view ('dashboard', 'faq', 'talk')
- `previousView` - Tracks previous view for back navigation
- `name` - User's name for personalization
- `inputValue` - Shared input state

### 2. ChatIcon (`src/ChatIcon.jsx`)
**Purpose**: Floating action button to open/close chat
**Features**:
- Fixed positioning (bottom-right)
- Gradient background with purple theme
- High z-index (2100) for overlay
- Emoji icon (💬) for universal recognition

### 3. WelcomeDashboard (`src/WelcomeDashboard.jsx`)
**Purpose**: Landing screen with navigation options
**Features**:
- Welcome message and description
- Two main action buttons: FAQ and "Let's Talk"
- Gradient button styling
- Responsive design with mobile-first approach

### 4. FAQDashboard (`src/FAQDashboard.jsx`)
**Purpose**: Interactive FAQ interface with API integration
**Key Features**:
- **API Integration**: Fetches FAQ data from `http://localhost:5096/api/Faq`
- **Nested Options**: Supports hierarchical FAQ options with recursive rendering
- **Dynamic Input**: Enables text input for "Talk to someone?" option
- **State Management**: Tracks active FAQ items and option paths
- **Responsive Design**: Mobile-first with responsive breakpoints

**API Data Structure**:
```javascript
{
  result: [
    {
      id: number,
      query: string,
      response: string,
      options: [
        {
          id: number,
          optionText: string,
          response: string,
          options: [...] // nested options
        }
      ]
    }
  ]
}
```

**State Variables**:
- `faqs` - FAQ data from API
- `loading` - API loading state
- `error` - API error handling
- `activeId` - Currently selected FAQ
- `inputEnabled` - Controls input field activation
- `userMessages` - User chat messages
- `activeOptionPath` - Tracks nested option selection

### 5. TalkDashboard (`src/TalkDashboard.jsx`)
**Purpose**: Live chat interface for direct communication
**Features**:
- **Name Collection**: First message becomes user's name
- **Message History**: Displays conversation thread
- **Auto-focus**: Input field focuses after each message
- **Responsive Design**: Mobile-first approach
- **Real-time Chat**: Simulates live chat experience

**State Management**:
- `inputValue` - Current input field value
- `userMessages` - Array of user messages
- `userName` - User's name (from first message)

### 6. TailwindDemo (`src/TailwindDemo.jsx`)
**Purpose**: Comprehensive Tailwind CSS testing component
**Features**:
- **Color Testing**: Various color classes and gradients
- **Typography**: Font weights, sizes, and colors
- **Layout**: Flexbox, grid, and spacing utilities
- **Responsive Design**: Breakpoint testing
- **Animations**: Hover effects and transitions
- **Forms**: Input styling and focus states
- **Utilities**: Progress bars and status indicators

## 🎨 Styling & Design

### Design System
- **Color Palette**: Purple gradient theme (#6C57FF to #9A73FF)
- **Typography**: Responsive text sizes (xs, sm, md, lg)
- **Spacing**: Consistent padding and margins
- **Border Radius**: Rounded corners (xl, 2xl, 3xl)
- **Shadows**: Subtle elevation with shadow classes

### Responsive Breakpoints
- **Mobile**: Default (no prefix)
- **Small**: `sm:` (640px+)
- **Medium**: `md:` (768px+)
- **Large**: `lg:` (1024px+)

### Key Design Patterns
- **Gradient Headers**: Purple gradient backgrounds for chat headers
- **Card Design**: White cards with rounded corners and shadows
- **Button Styling**: Gradient buttons with hover effects
- **Input Fields**: Gray backgrounds with focus states
- **Message Bubbles**: Different colors for user vs system messages

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
- Preact plugin integration
- Tailwind CSS plugin
- React compatibility aliases
- Module resolution settings

### Tailwind Configuration (`tailwind.config.js`)
- Content paths for CSS purging
- Theme extensions
- Plugin configuration

### Package Configuration (`package.json`)
- **Scripts**: dev, build, preview
- **Dependencies**: Preact, Tailwind CSS
- **Dev Dependencies**: Vite, Preact preset, autoprefixer

## 🌐 API Integration

### FAQ Endpoint
- **URL**: `http://localhost:5096/api/Faq`
- **Method**: GET
- **Response**: JSON with FAQ data structure
- **Error Handling**: Try-catch with user-friendly error messages
- **Loading States**: Spinner animation during API calls

### Data Flow
1. Component mounts → API call initiated
2. Loading state displayed → Data fetched
3. FAQ data rendered → User interactions enabled
4. Error handling → User feedback on failures

## 🚀 Development Workflow

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Development Features
- **Hot Module Replacement**: Instant updates during development
- **Fast Refresh**: Component state preservation
- **Error Overlay**: In-browser error display
- **Source Maps**: Debugging support

## 📱 User Experience

### Chat Flow
1. **Welcome Screen**: User sees welcome message and options
2. **FAQ Mode**: Interactive FAQ with nested options
3. **Live Chat**: Direct communication interface
4. **Navigation**: Back button for seamless navigation

### Accessibility Features
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab and enter key support
- **Focus Management**: Auto-focus on input fields
- **Semantic HTML**: Proper heading hierarchy

### Performance Optimizations
- **Code Splitting**: Component-based loading
- **CSS Purging**: Unused styles removed
- **Minification**: Production build optimization
- **Responsive Images**: Optimized for different screen sizes

## 🔍 Key Features

### Interactive FAQ System
- Hierarchical option selection
- Recursive option rendering
- Dynamic response display
- API-driven content

### Live Chat Simulation
- Real-time message display
- User name collection
- Message history
- Auto-focus input

### Responsive Design
- Mobile-first approach
- Breakpoint-specific styling
- Flexible layouts
- Touch-friendly interactions

### State Management
- Component-level state
- Navigation state tracking
- Form state management
- API state handling

## 🛡️ Error Handling

### API Errors
- Network error detection
- User-friendly error messages
- Loading state management
- Graceful degradation

### Component Errors
- Boundary error handling
- Fallback UI components
- Error state display
- Recovery mechanisms

## 📊 Code Quality

### Code Organization
- **Component-based architecture**
- **Single responsibility principle**
- **Consistent naming conventions**
- **Modular file structure**

### Best Practices
- **Preact hooks usage**
- **Functional components**
- **Props validation**
- **Event handling**
- **State management**

This index provides a comprehensive overview of your chat widget application, documenting all components, features, and technical implementation details. 