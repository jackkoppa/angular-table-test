export interface DataShape {
  [key: string]: any;
}

export type DataToHeadersMap<S extends DataShape> = {
  [P in keyof S]: string;
};

export interface OriginalDataShape extends DataShape {
  name: string;
  phone: string;
  email: string;
  company: string;
  date_entry: string;
  org: string;
  address_1: string;
  city: string;
  zip: string;
  geo: string;
  pan: string;
  pin: string;
  id: number;
  status: string;
  fee: string;
  guid: string;
  date_exit: string;
  date_first: string;
  date_recent: string;
  url: string;
}

export const OriginalDataToHeadersMap: DataToHeadersMap<OriginalDataShape> = {
  name: 'Name',
  phone: 'Phone #',
  email: 'Email',
  company: 'Company',
  date_entry: 'Entry Date',
  org: 'Organization',
  address_1: 'Address Line 1',
  city: 'City',
  zip: 'Zip Code',
  geo: 'Location',
  pan: 'Pan',
  pin: 'PIN',
  id: 'ID',
  status: 'Status',
  fee: 'Fee',
  guid: 'GUID',
  date_exit: 'Exit Date',
  date_first: 'First Date',
  date_recent: 'Recent Date',
  url: 'URL'
};
