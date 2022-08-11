import { getDomain, parse } from 'tldts';
import { isIP } from 'is-ip';

/**
 * Removes wildcard mark from the beginning of hostname
 * @param hostname
 */
const cleanHostname = (hostname: string) => {
    return hostname.replace(/^\*./, '');
};

/**
 * Checks if provided hostname is top level domain
 * @param hostname
 */
const isTopLevel = (hostname: string) => {
    const hostnameWithoutWildcard = cleanHostname(hostname);
    const parsed = parse(hostnameWithoutWildcard, { allowPrivateDomains: true });

    return parsed?.publicSuffix === hostname;
};

/**
 * Here eTLD has many meanings:
 * - for regular hostnames returns eTLD + 1
 * - for hostnames presented by ip address returns as is
 * - for hostnames presented by TLD returns TLD
 */
export const getETld = (hostname: string) => {
    const SEPARATOR = '.';

    // if hostname is ip address we return it unchanged
    if (isIP(hostname)) {
        return hostname;
    }

    const hostnameWithoutWildcard = cleanHostname(hostname);

    if (isTopLevel(hostnameWithoutWildcard)) {
        return hostnameWithoutWildcard;
    }

    const parts = hostnameWithoutWildcard.split(SEPARATOR);
    let domainParts = parts.splice(parts.length - 2, 2);
    const domain = getDomain(domainParts.join(SEPARATOR));
    if (domain) {
        return domain;
    }

    while (parts.length > 0) {
        const nextPart = parts.pop();
        if (nextPart) {
            domainParts = [nextPart, ...domainParts];
        }

        const domain = getDomain(domainParts.join(SEPARATOR));
        if (domain) {
            return domain;
        }
    }

    return null;
};
