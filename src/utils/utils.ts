
export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}

export function validateWebsiteUrl(url: string){
    const REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    return REGEXP.test(url);
}

