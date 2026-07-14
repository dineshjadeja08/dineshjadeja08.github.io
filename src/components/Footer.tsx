import { ArrowUpRight, Leaf } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return <footer className="atchi-footer">
    <div className="atchi-footer-word">atchi</div>
    <div className="atchi-footer-grid">
      <div><Link className="atchi-footer-logo" to="/"><Leaf /> atchi</Link><p>Small-batch pickles for<br />tables that remember.</p></div>
      <div><b>Wander</b><Link to="/shop">The pantry</Link><Link to="/about">Our roots</Link><Link to="/journal">Kitchen notes</Link></div>
      <div><b>Write to us</b><a href="mailto:hello@atchi.in">hello@atchi.in</a><a href="tel:+919876543210">+91 98765 43210</a></div>
      <div><b>Follow along</b><a href="#">Instagram <ArrowUpRight /></a><a href="#">WhatsApp <ArrowUpRight /></a></div>
    </div>
    <div className="atchi-footer-end"><span>© 2026 Atchi Pickles</span><span>Made slowly in India</span></div>
  </footer>
}
