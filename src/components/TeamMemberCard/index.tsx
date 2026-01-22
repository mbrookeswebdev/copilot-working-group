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

// Local placeholder image as SVG data URI to avoid external dependencies
const DEFAULT_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e0e0e0" width="100" height="100"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ETeam%3C/text%3E%3C/svg%3E';

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
