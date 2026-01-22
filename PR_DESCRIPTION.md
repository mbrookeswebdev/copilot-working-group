# Pull Request Description (Updated with Screenshots)

Created reusable component to display workshop facilitator information (name, role, bio, profile picture, social links).

## Screenshots

### Team Page Example

**Image: Multiple TeamMemberCard components in a grid layout**

![Workshop Facilitators Page showing 4 team member cards in a responsive grid: John Doe (Workshop Facilitator) with profile image and all social links, Jane Smith (Maintainer) with profile image and partial links, Bob Wilson (Contributor) with placeholder image and GitHub link only, Alice Brown (Content Creator) with placeholder image and no links](https://github.com/user-attachments/assets/d32fbac9-7d61-4c74-9b52-c3fbf536f435)

*If image is unavailable: The screenshot shows multiple TeamMemberCard components in a grid layout with cards displaying profile images (John Doe, Jane Smith) and placeholder images showing "Team" text (Bob Wilson, Alice Brown), different combinations of profile links, and consistent card styling matching the ProductCard design.*

### Individual Card Detail

**Image: Close-up view of a single TeamMemberCard component**

![TeamMemberCard Component Detail showing John Doe's card with profile image at top, name as heading, "WORKSHOP FACILITATOR" role in uppercase with primary color, bio text below, and three social links (GitHub, LinkedIn, Website) at the bottom with proper spacing and styling](https://github.com/user-attachments/assets/5266e8ed-66d4-48db-abc7-560aaef04016)

*If image is unavailable: The detail view shows a single card with: profile image at the top, team member name as the card title, role displayed in uppercase with primary color styling, bio text with proper line height and typography, and social links (GitHub, LinkedIn, Website) at the bottom separated by a border.*

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
