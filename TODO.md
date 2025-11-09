# TODO: Separate Admin and Landing Page Files

## Admin Folder Setup
- [ ] Create 'admin' folder
- [ ] Move and rename admin edit files:
  - [ ] about.html -> admin/admin-about.html
  - [ ] education.html -> admin/admin-education.html
  - [ ] skills.html -> admin/admin-skills.html
  - [ ] projects.html -> admin/admin-projects.html
  - [ ] contact.html -> admin/admin-contact.html
  - [ ] admin.js -> admin/admin.js
  - [ ] login.html -> admin/login.html
- [ ] Create admin/admin.html (dashboard linking to edit pages)
- [ ] Update links in admin files (e.g., navbar links to admin/admin-*.html, logout to admin/login.html)

## Pages Folder Setup
- [ ] Create 'pages' folder
- [ ] Extract sections from index.html to create:
  - [ ] pages/about.html (about section)
  - [ ] pages/education.html (education section)
  - [ ] pages/skills.html (skills section)
  - [ ] pages/projects.html (projects section)
  - [ ] pages/contact.html (contact section)
- [ ] Update index.html to keep only hero and navigation, link to pages/*.html

## Link Updates
- [ ] Update navigation in index.html to link to pages/*.html
- [ ] Ensure all internal links are correct (e.g., back to index.html from pages)
- [ ] Update any references in admin files

## Testing
- [ ] Verify admin dashboard works
- [ ] Verify landing page links work
- [ ] Check that editing in admin updates display (if applicable)
