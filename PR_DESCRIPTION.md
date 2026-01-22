# Pull Request Description (Updated with Screenshots)

Created reusable component to display workshop facilitator information (name, role, bio, profile picture, social links).

## Screenshots

### Team Page Example
![Workshop Facilitators Page](https://github.com/user-attachments/assets/d32fbac9-7d61-4c74-9b52-c3fbf536f435)

The screenshot above shows multiple TeamMemberCard components in a grid layout, demonstrating:
- Cards with profile images (John Doe, Jane Smith)
- Cards with placeholder images (Bob Wilson, Alice Brown)
- Different combinations of profile links
- Consistent styling and spacing

### Individual Card Detail
![TeamMemberCard Component Detail](https://github.com/user-attachments/assets/5266e8ed-66d4-48db-abc7-560aaef04016)

The detail view shows:
- Profile image at the top
- Name as the card title
- Role in uppercase with primary color styling
- Bio text with proper line height
- Social links (GitHub, LinkedIn, Website) at the bottom

## Implementation

- **Component structure**: TypeScript component using CSS modules, leverages existing `Card` UI primitives for consistency
- **Props interface**: Required fields (name, role, bio), optional image and profile links (GitHub, LinkedIn, website)
- **Security**: URL validation restricts links to HTTP/HTTPS only; local SVG data URI placeholder eliminates external image dependency
- **Tests**: 8 tests covering rendering, placeholder fallback, URL validation, and partial props

## Features

- ✅ Card-based layout matching ProductCard design
- ✅ Profile image with placeholder fallback (shows "Team" text when no image provided)
- ✅ Role displayed in uppercase with primary color
- ✅ Bio text with proper typography
- ✅ Optional social links (GitHub, LinkedIn, Website) with validation
- ✅ Hover effects and transitions
- ✅ Dark mode support via CSS variables
- ✅ Fully accessible with ARIA labels

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
