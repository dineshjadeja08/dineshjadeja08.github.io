import { siteConfig } from '../config/site';

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export const getActiveSocialLinks = (): SocialLink[] => {
  const links: SocialLink[] = [];
  
  if (siteConfig.socials.linkedin) {
    links.push({
      name: 'LinkedIn',
      url: siteConfig.socials.linkedin,
      iconName: 'linkedin'
    });
  }
  
  if (siteConfig.socials.github) {
    links.push({
      name: 'GitHub',
      url: siteConfig.socials.github,
      iconName: 'github'
    });
  }
  
  if (siteConfig.socials.instagram) {
    links.push({
      name: 'Instagram',
      url: siteConfig.socials.instagram,
      iconName: 'instagram'
    });
  }

  return links;
};
