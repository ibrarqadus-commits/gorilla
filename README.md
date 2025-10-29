# Monty's Letting & Management (L&M) Guerrilla Business Mastermind

A modern online course website for the L&M Guerrilla Business Mastermind program.

## Features

- **7 Comprehensive Modules** covering all aspects of lettings and property management
- **Student Authentication** with admin approval workflow
- **Progress Tracking** for each module and unit
- **Admin Panel** for managing students and viewing progress
- **Responsive Design** optimized for desktop and mobile
- **Modern UI** using Tailwind CSS and Poppins font

## Setup Instructions

### Local Development

1. Simply open `index.html` in your web browser or use a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

2. Navigate to `http://localhost:8000` in your browser

### File Structure

```
/
├── index.html          # Homepage
├── login.html          # Login page
├── register.html       # Registration page
├── admin.html          # Admin panel
├── module1.html        # Module 1 page
├── module2.html        # Module 2 page
├── module3.html        # Module 3 page
├── module4.html        # Module 4 page
├── module5.html        # Module 5 page
├── module6.html        # Module 6 page
├── module7.html        # Module 7 page
├── js/
│   ├── main.js         # Main JavaScript (authentication & progress)
│   └── modules.js      # Module functionality
└── logo.png            # Logo (add your own)

```

## Default Login Credentials

- **Admin**: admin@lm.com / admin123

## Admin Features

- Approve/reject student registrations
- View student progress across all modules
- Track individual unit completions
- Manage student accounts

## Student Features

- Register and request approval
- Access all 7 modules once approved
- Track progress for each module
- Mark units as complete
- View progress bars and completion statistics

## Modules Overview

1. **Module 1**: Foundation & Financial Freedom Roadmap (6 units)
2. **Module 2**: Market Understanding & Property Strategy (9 units)
3. **Module 3**: Business Setup & Compliance Foundations (7 units)
4. **Module 4**: Client Acquisition & Lettings Operations (8 units)
5. **Module 5**: Property Management & Relationship Building (10 units)
6. **Module 6**: End of Tenancy, Renewals & Compliance Updates (8 units)
7. **Module 7**: Scaling, Marketing & Portfolio Growth (8 units)

## Deployment to Hostinger

1. **FTP Upload**:
   - Connect to your Hostinger FTP account
   - Upload all files to the `public_html` directory
   - Ensure `index.html` is in the root

2. **Database** (Optional):
   - Current implementation uses localStorage (browser-based)
   - For production, consider migrating to a database
   - Update API endpoints in JavaScript files

3. **Custom Domain**:
   - Configure your domain in Hostinger control panel
   - Point to the uploaded files

## Technologies Used

- **HTML5**
- **CSS3** (Tailwind CSS via CDN)
- **JavaScript** (Vanilla JS)
- **LocalStorage** for data persistence
- **Google Fonts** (Poppins)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- All data is stored in browser localStorage
- Clear browser data to reset all users/progress
- Admin account is created automatically on first load
- Logo placeholder exists - replace `logo.png` with your logo

## Customization

- Update colors in Tailwind classes (currently using blue theme)
- Modify module content in respective HTML files
- Add video embeds in unit content sections
- Customize admin and student dashboards

## Support

For issues or questions, contact the course administrator.
