Accordion Web Part without List
🌐 Multifunctional Accordion for SharePoint with Rich Text and Image Support

Here is some images of the web part in action:
1. Add new accordion item
(./assetsForGithub/addingaccordion.png)



🚀 Features
✨ Core Functionality
📝 Accordion Creation - Add unlimited question-answer items

✏️ Inline Editing - Modify existing accordions without reloading

🗑️ Smart Deletion - Remove items with confirmation

🖼️ Image Management - Upload and insert images directly from SharePoint

🎯 Expand/Collapse - Smooth toggle animations

🎨 Rich Content Support
📖 Rich Text Editor - Full formatting capabilities (bold, italic, lists, etc.)

🖼️ Image Integration - Drag & drop images with automatic responsive sizing

🎭 HTML Content - Support for custom HTML in answers

📱 Responsive Design - Works perfectly on all devices

⚙️ SharePoint Integration
🔗 SPFx Compatible - Built with SharePoint Framework 1.15+

🏢 SharePoint Context - Seamless integration with SharePoint environment

💾 Data Persistence - Automatic saving to web part properties

👥 Permission Aware - Respects SharePoint permissions

🛠️ Installation
Prerequisites
SharePoint Online environment

SPFx development environment (1.15.0 or later)

Node.js 16.x or later

Setup Steps
1. Clone the repository
git clone https://github.com/your-username/intranext-accordion.git
cd intranext-accordion

2. Install dependencies
npm install

3. Build the solution
gulp build

4.Bundle Package
gulp bundle --ship

5. Package the solution
gulp package-solution --ship

6. Deploy the solution to SharePoint
Upload .sppkg file to your SharePoint App Catalog

Add web part to your SharePoint page


📖 Usage
🎯 Adding New Accordion Items
Enter Question - Type your question in the "New Accordion Item" field

Create Answer - Use the Rich Text editor to format your answer

Add Images - Click "Add image" to insert images from SharePoint

Save - Click "Save Accordion" to add the item

✏️ Editing Existing Items
Enter Edit Mode - Click the edit (✏️) icon on any accordion item

Modify Content - Update question and answer as needed

Add More Images - Insert additional images while editing

Save Changes - Click "Save" to apply changes or "Cancel" to discard

🖼️ Image Management
Supported Formats: GIF, JPG, JPEG, BMP, DIB, TIF, TIFF, ICO, PNG, JXR, SVG

Automatic Optimization: Images are automatically resized for optimal display

SharePoint Integration: Direct access to your SharePoint document libraries

🔧 Key Components
IntraneXtAccordion Component
State Management: React hooks for efficient state handling

Edit Modes: Separate states for viewing and editing

File Picker Integration: SharePoint file picker for image selection

Rich Text Editor
Quill-based: Powerful WYSIWYG editor

Custom Styling: SharePoint-consistent UI

Image Support: Direct image embedding

🎨 Customization
Styling
The component uses SCSS modules for styling. Key customizable aspects:

Color schemes

Animation timings

Responsive breakpoints

Icon styles

Configuration
Web part properties can be extended to include:

Default expanded state

Animation preferences

Image size limits

Custom CSS classes

🙏 Acknowledgments
SharePoint Framework Team - For the excellent SPFx platform

Fluent UI Team - For the comprehensive UI component library

PNP Controls - For the FilePicker and RichText components

⭐ Star us on GitHub if you find this project helpful!