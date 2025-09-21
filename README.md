LuxeDrive – Premium Car Rental Website

 Overview

LuxeDrive is a responsive, multi-page car rental website designed to showcase premium car rental services. The project is built using HTML5, CSS3, and JavaScript, following accessibility and mobile-first principles.

The site includes:

A homepage with hero banners, features, slideshow, and testimonials.

An about page detailing the company’s mission and values.

A services page highlighting rental options (daily, long-term, airport service, etc.).

A fleet page with detailed car categories and pricing.

A contact & booking page with a form to reserve vehicles and company information.

 Features

Responsive Design: Works seamlessly across desktops, tablets, and mobile devices.

Navigation Bar: Sticky header with active state highlights for the current page.

Hero Section: Attractive call-to-action area with images and booking links.

Car Fleet Grid: Clean layout displaying rental categories, pricing, and features.

Booking Form: Accessible form with input validation placeholders for name, email, phone, vehicle type, and dates.

Accessibility Support: ARIA labels, semantic HTML, and clear contrast.

Custom Styling: Consistent theme using CSS variables for colors, spacing, and typography.

Footer: Copyright with auto-updating year via JavaScript.

 Project Structure
LuxeDrive/
│── index.html         # Homepage
│── about.html         # About Us page
│── services.html      # Services page
│── fleet.html         # Fleet showcase
│── contact.html       # Contact & booking form
│── logo.png           # Site logo
│── moving.jfif        # Hero image
│── Economy.jfif       # Fleet image
│── suv.jfif           # Fleet image
│── Family.jfif        # Fleet image
│── electric.jfif      # Fleet image
│── Convertibile.jfif  # Fleet image
│── Luxury.jfif        # Fleet image
│
├── assets/
│   ├── css/
│   │   └── styles.css  # Global styles
│   └── js/
│       └── script.js   # Interactive scripts (e.g., year update, nav toggle)

 Styling (CSS Highlights)

Color Variables for primary, secondary, and accent tones.

Mobile-first design with media queries for larger screens.

Reusable utility classes like .container, .btn, .hero, .grid.

Transitions and shadows for interactive elements.

 How It Works

Open index.html in your browser to launch the homepage.

Navigate between pages using the header navigation bar.

On the Fleet page, click Book Now to redirect to the contact form.

Fill out the booking form with required details (validated in script.js).

Explore services, company mission, and testimonials.

Future Improvements

Add backend integration for form submission (e.g., PHP, Node.js, or Firebase).

Implement a database to store bookings and customer inquiries.

Enhance the slideshow with auto-play and controls.

Add user authentication for returning customers.

Tech Stack

HTML5 – Semantic structure

CSS3 – Custom styles with variables and responsive layout

JavaScript (ES6) – Navigation toggle, dynamic year update, and form handling

📄 License

This project is for educational and practice purposes. You may modify and use it freely.
