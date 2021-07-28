export const columns = buttons => [
  { path: 'index', label: '#', unclickable: true, customThClass: 'col-md-1' },
  { path: 'titolo', label: 'Titolo', customThClass: 'col-md-4' },
  { path: 'commento', label: 'Commento', customThClass: 'col-md-2' },
  { path: 'nota', label: 'Note', customThClass: 'col-md-2' },
  { path: 'state', label: 'Stato', customThClass: 'col-md-2' },
  {
    path: 'buttons',
    label: buttons,
    unclickable: true,
    customThClass: 'col-md-1',
  },
];
