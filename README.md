# 🚀 ChatWidget

A modern, AI-powered chat widget that can be embedded anywhere on any website. Built with Preact and powered by Google Gemini AI.

## ✨ Features

- 🤖 **AI-Powered**: Uses Google Gemini AI for intelligent responses
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🎨 **Beautiful UI**: Modern design with animations and effects
- 🔒 **Isolated**: Shadow DOM prevents CSS conflicts
- ⚡ **Lightweight**: Optimized bundle size
- 🌐 **Universal**: Works on any website

## 🚀 Quick Start

### CDN Usage (Recommended)

Include these files in your HTML:

```html
<script src="https://rajritik21.github.io/ChatWidget/chatbot-widget.js"></script>
<link rel="stylesheet" href="https://rajritik21.github.io/ChatWidget/index.css">
```

The widget will automatically appear on your page!

### Custom Element

```html
<chat-bot-widget></chat-bot-widget>
```

### Programmatic Usage

```javascript
// Auto-mount (appears automatically)
// Or mount to specific element
ChatBotWidget.mount('#my-container');
```

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/rajritik21/ChatWidget.git
cd ChatWidget

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:widget

# Build demo
npm run build:demo
```

### Scripts

- `npm run dev` - Start development server
- `npm run build:widget` - Build widget for CDN
- `npm run build:demo` - Build demo page
- `npm run build:cdn` - Build both widget and demo
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
ChatWidget/
├── src/
│   ├── Chat.jsx          # Main chat component
│   ├── ChatIcon.jsx      # Floating chat button
│   ├── ChatWidget.jsx    # Widget container
│   ├── ElectricBorder.jsx # Animated border component
│   └── widget.js         # Widget entry point
├── dist-widget/          # Built widget files
├── dist-demo/            # Demo page files
├── vite.widget.config.js # Widget build config
└── vite.demo.config.js   # Demo build config
```

##  Customization

The widget is designed to be self-contained and isolated. All styling is contained within the Shadow DOM to prevent conflicts with your website's CSS.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [rajritik21](https://github.com/rajritik21)
