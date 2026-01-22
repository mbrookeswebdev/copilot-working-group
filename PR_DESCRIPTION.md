# Pull Request Description (Updated with Screenshots)

Created reusable component to display workshop facilitator information (name, role, bio, profile picture, social links).

## Screenshots

### Modern Team Page Design

**Image: Multiple TeamMemberCard components with vibrant gradient design**

![Workshop Facilitators Page showing 4 team member cards with modern purple-blue gradient backgrounds, clean typography, and pill-shaped social link buttons. Each card features a placeholder image with a stylized person icon, team member name, role in gradient text, bio, and social links at the bottom.](https://github.com/user-attachments/assets/d4ddf315-bc73-4271-bd8b-e29377d2202d)

*The modern redesign features vibrant purple-to-blue gradients (#667eea to #764ba2), clean card layouts, and interactive pill-shaped buttons for social links. The design is fresh, professional, and eye-catching.*

### Individual Card Detail - Modern Design

**Image: Close-up view of a TeamMemberCard with modern gradient styling**

![TeamMemberCard Component Detail showing a card with gradient purple-blue background at the top containing a stylized person icon and "Team Member" text, followed by the team member's name, role in gradient text, bio, and three modern pill-shaped buttons (GitHub, LinkedIn, Website) with hover effects](https://github.com/user-attachments/assets/91a55448-2c72-426d-9a98-95927e876893)

*Detail view showcasing the modern gradient background, improved typography with gradient role text, and interactive pill-shaped social link buttons that transform on hover with gradient fills and subtle shadows.*

## Implementation

- **Component structure**: TypeScript component using CSS modules, leverages existing `Card` UI primitives for consistency
- **Props interface**: Required fields (name, role, bio), optional image and profile links (GitHub, LinkedIn, website)
- **Security**: URL validation restricts links to HTTP/HTTPS only; local SVG data URI placeholder eliminates external image dependency
- **Image error handling**: Automatic fallback to placeholder when images fail to load
- **Tests**: 9 tests covering rendering, placeholder fallback, URL validation, partial props, and image error handling
- **Modern design**: Vibrant purple-blue gradient theme with interactive elements

## Features

- ✅ **Modern gradient design** with purple-to-blue color scheme (#667eea to #764ba2)
- ✅ **Vibrant placeholder image** with gradient background and stylized person icon
- ✅ **Gradient text role** with smooth color transitions
- ✅ **Interactive pill-shaped social link buttons** with hover effects and gradient fills
- ✅ **Card hover effects** with gradient overlays
- ✅ **Automatic error handling** for broken image URLs
- ✅ Clean, professional typography with proper spacing
- ✅ Fully accessible with ARIA labels
- ✅ Dark mode compatible via CSS variables

## Usage

```tsx
// With all props
<TeamMemberCard
  name="John Doe"
  role="Workshop Facilitator"
  bio="Passionate about teaching GitHub Copilot and helping developers learn new tools."
  image="https://example.com/profile.jpg"
  profileLinks={{
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.dev'
  }}
/>

// Minimal (uses placeholder image)
<TeamMemberCard
  name="Alice Brown"
  role="Content Creator"
  bio="Creating engaging workshop materials and documentation."
/>
```

## Files

- `src/components/TeamMemberCard/index.tsx` - Component implementation
- `src/components/TeamMemberCard/TeamMemberCard.module.css` - Styling
- `src/components/TeamMemberCard/TeamMemberCard.test.tsx` - Unit tests
