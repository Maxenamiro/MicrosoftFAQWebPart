Accordion Web Part without List
🌐 Multifunctional Accordion for SharePoint with Rich Text and Image Support

Here is some images of the web part in action:

1. Add new accordion item
<img width="903" height="620" alt="addingaccordion" src="https://github.com/user-attachments/assets/f9f93f33-ba17-42a4-9e9b-cb060c51c888" />

2. Add image to accordion item via file picker
<img width="1317" height="789" alt="addingimageviafilepicker" src="https://github.com/user-attachments/assets/0ae67b2d-a13a-4254-882a-e404c39ec7a2" />

3. Add image to accordion item via image link
<img width="547" height="196" alt="addingimagevialink" src="https://github.com/user-attachments/assets/a1c9b385-62b9-4615-96cd-2cf8d6488e8d" />

4. Add accordion
<img width="734" height="698" alt="addingWebPart" src="https://github.com/user-attachments/assets/417d9630-a760-4221-8e87-e0450fc616d4" />

5. Edit accordion
<img width="758" height="731" alt="editAccordion" src="https://github.com/user-attachments/assets/2ac9f9c3-e5e8-4f4a-a43f-c14f123a313a" />

6. Rich Text formatting
<img width="493" height="569" alt="textFormatting" src="https://github.com/user-attachments/assets/75ec71dd-5338-488b-bc47-e65d08d18983" />

7. Result
<img width="794" height="673" alt="result" src="https://github.com/user-attachments/assets/f41ce86b-e3e2-487d-9a60-11f064326615" />


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
