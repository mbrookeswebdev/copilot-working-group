# Pull Request Description (Updated with Screenshots)

Created reusable component to display workshop facilitator information (name, role, bio, profile picture, social links).

## Screenshots

### Team Page Example - Image Placeholder Fallback

**Image: Multiple TeamMemberCard components with automatic placeholder fallback**

![Workshop Facilitators Page showing 4 team member cards, all displaying placeholder images with "Team" text because the image URLs failed to load. This demonstrates the automatic fallback functionality when facilitator profile images are unavailable or broken.](https://github.com/user-attachments/assets/0e573e71-bfb4-41ab-986d-65a9c35f6d04)

*This screenshot demonstrates the automatic image error handling - when facilitator images fail to load (broken URLs, network errors, etc.), the component automatically displays a placeholder with "Team" text. All four cards show this fallback behavior.*

### Individual Card Detail - Placeholder Image

**Image: Close-up view of a TeamMemberCard with placeholder image**

![TeamMemberCard Component Detail showing a card with placeholder "Team" image at the top, "John Doe" as the heading, "WORKSHOP FACILITATOR" role in uppercase with primary color, bio text below, and three social links (GitHub, LinkedIn, Website) at the bottom with proper spacing and styling](https://github.com/user-attachments/assets/63690e6f-aeaf-48ca-8f2b-35b415b44ae9)

*The detail view shows the placeholder image that appears when a facilitator's profile picture fails to load. The placeholder is a clean, gray box with "Team" text that matches the app's design system.*

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
