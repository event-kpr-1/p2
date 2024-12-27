// export const baseURL =  'https://kpr-event-admin.onrender.com'
export const baseURL =  ( process.env.APP_ON !=='production' ?'http://localhost:9001' : 'https://kpr-event-admin.onrender.com')
export const eventURL = 'https://event-kpr.onrender.com'