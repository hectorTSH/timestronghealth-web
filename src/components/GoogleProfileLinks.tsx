import { googleProfileLinks } from "@/lib/site";

type GoogleProfileLinksProps = {
  linkClassName?: string;
};

/**
 * List items for an existing contact list. Renders nothing until Hector
 * supplies a Google Business Profile or review URL.
 */
export function GoogleProfileLinks({ linkClassName }: GoogleProfileLinksProps) {
  const links = googleProfileLinks();
  if (links.length === 0) return null;

  return (
    <>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {link.label}
          </a>
        </li>
      ))}
    </>
  );
}
