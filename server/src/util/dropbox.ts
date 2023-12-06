import fetch from 'node-fetch';
import { Dropbox } from 'dropbox';

export const dbx =
  global.dbx ??
  new Dropbox({
    fetch,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
  });

if (process.env.NODE_ENV !== 'production') {
  global.dbx = dbx;
}
