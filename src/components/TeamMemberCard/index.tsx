import { Card } from '../ui/Card';
import styles from './TeamMemberCard.module.css';

export interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  profileLinks?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

// Local placeholder image as SVG data URI with modern gradient design
const DEFAULT_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="200" height="200"/%3E%3Ccircle cx="100" cy="85" r="35" fill="rgba(255,255,255,0.3)"/%3E%3Cpath d="M 70 125 Q 100 135 130 125" stroke="rgba(255,255,255,0.3)" stroke-width="8" fill="none" stroke-linecap="round"/%3E%3Ctext fill="white" font-family="system-ui,sans-serif" font-size="16" font-weight="600" x="50%25" y="170" text-anchor="middle"%3ETeam Member%3C/text%3E%3C/svg%3E';

// Validate URL to ensure it's a safe HTTP/HTTPS URL
const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const TeamMemberCard = ({
  name,
  role,
  bio,
  image,
  profileLinks,
}: TeamMemberCardProps) => {
  const profileImage = image || DEFAULT_PLACEHOLDER;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // If image fails to load, replace with placeholder
    e.currentTarget.src = DEFAULT_PLACEHOLDER;
  };

  return (
    <Card>
      <div className={styles.imageWrapper}>
        <Card.Image 
          src={profileImage} 
          alt={`${name} profile picture`}
          onError={handleImageError}
        />
      </div>

      <div className={styles.content}>
        <Card.Title>{name}</Card.Title>

        <div className={styles.role}>{role}</div>

        <p className={styles.bio}>{bio}</p>

        {profileLinks && (
          <div className={styles.links}>
            {profileLinks.github && isValidUrl(profileLinks.github) && (
              <a
                href={profileLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`${name}'s GitHub profile`}
              >
                GitHub
              </a>
            )}
            {profileLinks.linkedin && isValidUrl(profileLinks.linkedin) && (
              <a
                href={profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`${name}'s LinkedIn profile`}
              >
                LinkedIn
              </a>
            )}
            {profileLinks.website && isValidUrl(profileLinks.website) && (
              <a
                href={profileLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                aria-label={`${name}'s website`}
              >
                Website
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
