import { Camera, CodeXml, Link as LinkIcon, Mail, MessageCircle, type LucideIcon } from 'lucide-react'
import { siteConfig, whatsappUrl } from '../lib/config'

export type SocialLink = {
  label: string
  href: string
  Icon: LucideIcon
}

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: siteConfig.linkedinUrl, Icon: LinkIcon },
  { label: 'GitHub', href: siteConfig.githubUrl, Icon: CodeXml },
  { label: 'Instagram', href: siteConfig.instagramUrl, Icon: Camera },
  { label: 'Email', href: `mailto:${siteConfig.email}`, Icon: Mail },
  { label: 'WhatsApp', href: whatsappUrl(), Icon: MessageCircle },
]
