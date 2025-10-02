// imports required modules(components)
import Link from "next/link";


// creates FooterLink component
const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
    return (
        <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
                {text}{` `}
                <Link href={href} className="footer-link">
                    {linkText}
                </Link>
            </p>
        </div>
    )
}

// exports FooterLink component
export default FooterLink