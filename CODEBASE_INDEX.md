# ChatBot Frontend - Codebase Index

## 📋 Project Overview
A modern chat widget application built with **Preact** and **Tailwind CSS**, featuring a floating chat interface with FAQ and live chat capabilities. The application includes both a standalone web app and an embeddable widget system with custom elements. It integrates with Google's Gemini AI API for intelligent responses and supports a dual-build system for different deployment scenarios.

## 🏗️ Project Structure

```
FrontendwithApi/
├── index.html                 # Main HTML entry point
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── vite.config.js           # Vite build configuration (main app)
├── vite.widget.config.js    # Vite build configuration (widget)
├── tailwind.config.js       # Tailwind CSS configuration
├── CODEBASE_INDEX.md        # This comprehensive codebase documentation
├── dist/                    # Main app build output
├── dist-widget/            # Widget build output
└── src/
    ├── main.jsx             # Application entry point
    ├── App.jsx              # Root component
    ├── index.css            # Global styles (Tailwind import)
    ├── ChatWidget.jsx       # Main chat widget container
    ├── ChatIcon.jsx         # Floating chat button
    ├── WelcomeDashboard.jsx # Welcome/landing screen
    ├── FAQDashboard.jsx     # FAQ chat interface with AI integration
    ├── TalkDashboard.jsx    # Live chat interface
    ├── ElectricBorder.jsx   # Animated border component
    ├── widget.js            # Widget system implementation
    └── README.md            # Component documentation
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
- **vite-plugin-css-injected-by-js** - CSS injection for widget builds

### External APIs
- **Google Gemini AI API** - AI-powered chat responses
- **Custom FAQ API** - Backend FAQ data (currently disabled)

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
        ├── FAQDashboard (AI-powered FAQ interface)
        │   └── ElectricBorder (animated input border)
        └── TalkDashboard (live chat interface)

Widget System (Custom Element)
└── ChatBotWidgetElement
    └── ChatWidget (same as above)
```

## 📱 Core Components

### 1. ChatWidget (`src/ChatWidget.jsx`)
**Purpose**: Main container component managing chat state and navigation
**Key Features**:
- State management for chat open/close
- View navigation (dashboard, FAQ, talk)
- Previous view tracking for back navigation
- Responsive design with mobile-first approach
- Full-screen FAQ mode on mobile devices
- Backdrop overlay for mobile interactions
- Smooth animations and transitions

**State Management**:
- `open` - Controls chat widget visibility
- `view` - Current active view ('dashboard', 'faq', 'talk')
- `previousView` - Tracks previous view for back navigation
- `name` - User's name for personalization
- `inputValue` - Shared input state

**Responsive Behavior**:
- Mobile: Full-screen FAQ dashboard with backdrop
- Desktop: Floating widget with fixed positioning
- Adaptive sizing based on view type

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
**Purpose**: AI-powered interactive chat interface with advanced features
**Key Features**:
- **AI Integration**: Google Gemini AI API for intelligent responses
- **Real-time Chat**: Live conversation with typing indicators
- **Enhanced UI**: Gradient backgrounds, animations, and modern design
- **Auto-scroll**: Automatic scrolling to latest messages
- **Input Focus Management**: Smart focus handling during conversations
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Mobile-first with full-screen mobile experience

**AI Integration**:
- **API**: Google Gemini 1.5 Flash model
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **Configuration**: Temperature 0.7, TopK 40, TopP 0.95, MaxTokens 1024
- **Error Handling**: Network errors, API failures, and user-friendly messages

**State Variables**:
- `messages` - Chat conversation history
- `isTyping` - AI response loading state
- `inputValue` - Current input field value
- `inputFocused` - Input focus state for styling
- `error` - Error state management
- `inputEnabled` - Controls input field activation
- `activeOptionPath` - Tracks nested option selection (legacy)
- `optionResponseStates` - Manages option response visibility
- `faqLoading` - Loading states for FAQ interactions
- `optionLoading` - Loading states for option interactions

**UI Features**:
- Animated background elements
- Gradient chat headers
- Message bubbles with different styles for user/bot
- Typing indicators with bouncing dots
- Custom scrollbars
- Electric border input field
- Smooth animations and transitions

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

### 6. ElectricBorder (`src/ElectricBorder.jsx`)
**Purpose**: Animated border component with electric effects
**Features**:
- **SVG-based Animation**: Uses SVG filters for electric border effects
- **Customizable Properties**: Color, speed, chaos, thickness
- **Responsive**: Automatically adjusts to container size
- **Performance Optimized**: Uses ResizeObserver for efficient updates
- **Cross-browser Compatible**: Works with modern browsers

**Technical Implementation**:
- SVG turbulence filters for electric effect
- Animated displacement maps
- Multiple border layers for glow effect
- Dynamic sizing based on container dimensions

### 7. Widget System (`src/widget.js`)
**Purpose**: Custom element implementation for embeddable widget
**Features**:
- **Custom Element**: `chat-bot-widget` web component
- **Shadow DOM**: Isolated styling and functionality
- **Auto-mounting**: Automatically attaches to page if not present
- **CSS Injection**: Dynamically loads and injects styles
- **Multiple Mount Options**: Can be mounted to specific elements or auto-created

**Widget Configuration**:
- **Build Target**: IIFE format for direct script inclusion
- **CSS Handling**: Separate CSS file loading for Shadow DOM isolation
- **Error Handling**: Graceful fallbacks for CSS loading failures
- **Lifecycle Management**: Proper mounting and unmounting

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

### Widget Vite Configuration (`vite.widget.config.js`)
- **Build Target**: Library mode with IIFE format
- **Entry Point**: `src/widget.js`
- **Output**: `dist-widget/chatbot-widget.js`
- **CSS Handling**: Disabled CSS code splitting for widget
- **Optimization**: Inline dynamic imports, minification enabled
- **Target**: ES2019 for broad compatibility

### Tailwind Configuration (`tailwind.config.js`)
- Content paths for CSS purging
- Theme extensions
- Plugin configuration

### Package Configuration (`package.json`)
- **Scripts**: 
  - `dev` - Development server
  - `build` - Main app build
  - `build:widget` - Widget build
  - `preview` - Preview production build
- **Dependencies**: Preact, Tailwind CSS
- **Dev Dependencies**: Vite, Preact preset, autoprefixer, CSS injection plugin

## 🌐 API Integration

### Google Gemini AI API
- **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **Method**: POST
- **Authentication**: API Key (AIzaSyCJ63G5XT4zAkPMtGS-wrwbdl2fA9h3wn0)
- **Request Body**: JSON with user message content
- **Response**: AI-generated text response
- **Error Handling**: Network errors, API failures, rate limiting
- **Loading States**: Typing indicators with animated dots

### Legacy FAQ Endpoint (Currently Disabled)
- **URL**: `http://localhost:5096/api/Faq`
- **Method**: GET
- **Response**: JSON with FAQ data structure
- **Status**: Disabled in favor of AI-powered responses

### Data Flow
1. User sends message → API call initiated
2. Typing indicator displayed → AI processes request
3. Response received → Message added to chat
4. Error handling → User-friendly error messages

## 🚀 Development Workflow

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build main app for production
- `npm run build:widget` - Build embeddable widget
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

### AI-Powered Chat System
- Google Gemini AI integration
- Real-time conversation flow
- Intelligent response generation
- Context-aware interactions
- Typing indicators and loading states

### Dual Build System
- **Main App**: Full-featured web application
- **Widget**: Embeddable custom element
- **Shadow DOM**: Isolated widget styling
- **Auto-mounting**: Automatic widget attachment

### Advanced UI Components
- Electric border animations
- Gradient backgrounds and effects
- Smooth transitions and animations
- Custom scrollbars
- Responsive message bubbles

### Responsive Design
- Mobile-first approach
- Full-screen mobile experience
- Breakpoint-specific styling
- Flexible layouts
- Touch-friendly interactions

### State Management
- Component-level state
- Navigation state tracking
- Form state management
- API state handling
- Real-time chat state

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

## 📦 Widget Deployment

### Embedding the Widget
The widget can be embedded in any website using the custom element:

```html
<!-- Include the widget script -->
<script src="path/to/chatbot-widget.js"></script>
<link rel="stylesheet" href="path/to/index.css">

<!-- Widget will auto-mount, or you can specify a container -->
<chat-bot-widget></chat-bot-widget>
```

### Widget Features
- **Shadow DOM Isolation**: No CSS conflicts with host page
- **Auto-mounting**: Automatically appears if no container specified
- **Responsive**: Adapts to different screen sizes
- **Lightweight**: Optimized bundle size for fast loading

### Build Outputs
- **`dist/`**: Main application build
- **`dist-widget/`**: Widget-specific build
  - `chatbot-widget.js`: Main widget script
  - `index.css`: Widget styles

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
- **Error boundaries**
- **Performance optimization**

### Security Considerations
- **API Key**: Currently hardcoded (should be environment variable)
- **CORS**: Widget handles cross-origin requests
- **XSS Protection**: Shadow DOM provides isolation
- **Input Sanitization**: User inputs are handled safely

## 🔄 Recent Changes

### Current State (Based on Git Status)
- **Modified Files**: 
  - `src/ChatWidget.jsx` - Enhanced responsive design and mobile experience
  - `src/FAQDashboard.jsx` - AI integration and improved UI
- **New Files**:
  - `src/ElectricBorder.jsx` - Animated border component
- **Build Status**: Ready for deployment

### Key Improvements
1. **AI Integration**: Replaced static FAQ with Google Gemini AI
2. **Enhanced UI**: Added electric borders, gradients, and animations
3. **Mobile Experience**: Full-screen FAQ mode for mobile devices
4. **Widget System**: Custom element implementation for embedding
5. **Responsive Design**: Improved mobile-first approach

This index provides a comprehensive overview of your chat widget application, documenting all components, features, and technical implementation details. 