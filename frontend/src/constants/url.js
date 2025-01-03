// export const baseURL =  'https://kpr-event-admin.onrender.com'
export const baseURL =  process.env.APP_ON === 'production' ? 'https://kpr-event-admin.onrender.com': 'http://localhost:9001' 
export const eventURL = 'https://event-kpr.onrender.com'