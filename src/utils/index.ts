export function createPageUrl(pageName: string) {
    // Home page is served at root "/"
    if (pageName === 'Home') {
        return '/';
    }
    return '/' + pageName.replace(/ /g, '-');
}