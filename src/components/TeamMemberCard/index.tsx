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

export const TeamMemberCard = ({
  name,
  role,
  bio,
  image,
  profileLinks,
}: TeamMemberCardProps) => {
  const profileImage = image || 'https://placehold.co/100x100/e0e0e0/666?text=Team';

  return (
    <Card>
      <div className={styles.imageWrapper}>
        <Card.Image src={profileImage} alt={`${name} profile picture`} />
      </div>

      <div className={styles.content}>
        <Card.Title>{name}</Card.Title>

        <div className={styles.role}>{role}</div>

        <p className={styles.bio}>{bio}</p>

        {profileLinks && (
          <div className={styles.links}>
            {profileLinks.github && (
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
            {profileLinks.linkedin && (
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
            {profileLinks.website && (
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
