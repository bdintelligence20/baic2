# BAIC B40 Honor Edition Standalone Page

This is a standalone HTML/CSS/JavaScript implementation of the BAIC B40 Honor Edition vehicle page. It's designed to be easily integrated into any website without dependencies on external libraries or frameworks.

## Implementation Guide

### File Structure

To properly implement this page, you'll need to set up the following directory structure:

```
your-site-root/
├── b40-honor-edition-standalone.html
├── documents/
│   └── brochures/
│       └── B40-HONOR-EDITION-Brochure.pdf
└── images/
    └── vehicles/
        └── b40-plus-honor-edition/
            ├── hero/
            │   └── hero.jpg
            ├── features/
            │   ├── 77543817 ext.jpg
            │   ├── 78317802 ext np.jpg
            │   ├── 77543845 ext np 2.jpg
            │   └── 4.2.jpg
            └── gallery/
                ├── 77543829 ext np.jpg
                ├── 77543817 ext.jpg
                ├── 77543836 np.jpg
                ├── 77543845 ext np 2.jpg
                ├── 78317802 ext np.jpg
                ├── 78317829 ext np.jpg
                ├── front side ext np.jpg
                ├── SUN_0515 np 2.jpg
                ├── WDH_8246 edit np ext.jpg
                ├── 4.2.jpg
                └── 20220709_QHD_BJ400043 ext np edit.jpg
```

### Image Requirements

1. **Hero Image**: A high-quality landscape image (recommended size: 1920x1080px) for the hero section background.
2. **Feature Images**: Four feature section images (recommended size: 800x600px or larger).
3. **Gallery Images**: At least 11 gallery images showcasing different angles of the vehicle.

### Brochure PDF

Place the B40 Honor Edition brochure PDF in the `documents/brochures/` directory with the filename `B40-HONOR-EDITION-Brochure.pdf`.

### Customization Options

#### Changing Colors

The primary color scheme can be modified by updating the CSS variables at the top of the style section:

```css
:root {
    --primary-color: #c00d0d;
    --primary-color-hover: #a00b0b;
    --primary-color-text: #ffffff;
    --primary-color-light-text: #f0f0f0;
}
```

#### Modifying Links

Update the href attributes in the HTML to point to the correct pages on your website:

```html
<a href="#" class="cta-button primary">Test Drive</a>
<a href="#" class="feature-cta-button">Find a Dealer</a>
```

#### Updating Specifications

The vehicle specifications can be updated in the specifications modal table:

```html
<table class="specs-table">
    <thead>
        <tr>
            <th>Specification</th>
            <th>Details</th>
        </tr>
    </thead>
    <tbody>
        <!-- Update specifications here -->
    </tbody>
</table>
```

### Integration Methods

#### 1. Full Page Implementation

Simply upload the HTML file and all required assets to your server, and link to it from your main navigation.

#### 2. Iframe Integration

Embed the page within an existing page using an iframe:

```html
<iframe src="b40-honor-edition-standalone.html" style="width:100%; height:100vh; border:none;"></iframe>
```

#### 3. Content Extraction

If you need to integrate specific sections into your existing site structure, you can extract the relevant HTML, CSS, and JavaScript code for each section.

## Browser Compatibility

This standalone page is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Mobile Responsiveness

The page is fully responsive and optimized for:
- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (below 768px)

## JavaScript Functionality

The page includes JavaScript for:
1. Gallery modal with lightbox functionality
2. Specifications modal
3. Keyboard navigation for gallery (arrow keys)
4. Touch-friendly controls for mobile devices

## Notes for Developers

- The page uses vanilla JavaScript with no external dependencies
- All styles are contained within the HTML file for easy portability
- Font Awesome is loaded from a CDN for icons - if your site will be used offline, consider downloading and hosting the Font Awesome files locally
- The page uses modern CSS features like CSS Grid and Flexbox for layout
