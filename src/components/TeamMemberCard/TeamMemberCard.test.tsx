import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeamMemberCard } from './index';
import type { TeamMemberCardProps } from './index';

describe('TeamMemberCard', () => {
  const mockTeamMember: TeamMemberCardProps = {
    name: 'John Doe',
    role: 'Workshop Facilitator',
    bio: 'Passionate about teaching GitHub Copilot and helping developers learn new tools.',
    image: 'https://example.com/profile.jpg',
    profileLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      website: 'https://johndoe.dev',
    },
  };

  it('renders team member name, role, and bio', () => {
    render(<TeamMemberCard {...mockTeamMember} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Workshop Facilitator')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Passionate about teaching GitHub Copilot and helping developers learn new tools.'
      )
    ).toBeInTheDocument();
  });

  it('renders profile image with correct alt text', () => {
    render(<TeamMemberCard {...mockTeamMember} />);

    const image = screen.getByAltText('John Doe profile picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/profile.jpg');
  });

  it('renders profile links when provided', () => {
    render(<TeamMemberCard {...mockTeamMember} />);

    const githubLink = screen.getByRole('link', { name: "John Doe's GitHub profile" });
    const linkedinLink = screen.getByRole('link', { name: "John Doe's LinkedIn profile" });
    const websiteLink = screen.getByRole('link', { name: "John Doe's website" });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute('href', 'https://johndoe.dev');
  });

  it('uses placeholder image when no image prop is provided', () => {
    const memberWithoutImage = {
      name: 'Jane Smith',
      role: 'Maintainer',
      bio: 'Maintaining the workshop repository.',
    };

    render(<TeamMemberCard {...memberWithoutImage} />);

    const image = screen.getByAltText('Jane Smith profile picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://placehold.co/100x100/e0e0e0/666?text=Team');
  });

  it('does not render profile links section when no links are provided', () => {
    const memberWithoutLinks = {
      name: 'Jane Smith',
      role: 'Maintainer',
      bio: 'Maintaining the workshop repository.',
    };

    render(<TeamMemberCard {...memberWithoutLinks} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders only provided profile links', () => {
    const memberWithPartialLinks = {
      name: 'Bob Wilson',
      role: 'Contributor',
      bio: 'Contributing to workshop content.',
      profileLinks: {
        github: 'https://github.com/bobwilson',
      },
    };

    render(<TeamMemberCard {...memberWithPartialLinks} />);

    expect(screen.getByRole('link', { name: "Bob Wilson's GitHub profile" })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /LinkedIn/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /website/ })).not.toBeInTheDocument();
  });
});
