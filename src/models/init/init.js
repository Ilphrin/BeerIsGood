const requests = [
  'create table if not exists beers (id integer primary key not null, name text, type text, brewery text);',
  'alter table beers add column pic text;'
];

export default requests;
