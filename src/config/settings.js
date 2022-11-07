export default {
    domain: import.meta.env.VITE_DOMAIN,
    cookieName: import.meta.env.VITE_COOKIE_NAME,
    cookieExpired: import.meta.env.VITE_COOKIE_EXPIRED, // 60000 = 1m

    storageName: import.meta.env.VITE_STORAGE_NAME, //"surveys",
    storageCurrentSurveyIdKeyName: import.meta.env.VITE_STORAGE_CURRENT_SURVEY_ID_KEY_NAME,

    apiUri: import.meta.env.VITE_API_URI,
    baseUri: import.meta.env.VITE_BASE_URI,
    envStage: import.meta.env.VITE_STAGE,
    countLimit: import.meta.env.VITE_COUNT_LIMIT,
    recommendedCountLimit: import.meta.env.VITE_RECOMMENDED_COUNT_LIMIT,
};