import flatpickr from 'flatpickr';
import {Russian} from 'flatpickr/dist/l10n/ru.js';

flatpickr('#dateOfBirth', {
  locale: Russian,
  disableMobile: false,
  dateFormat: 'Y.m.d',
  defaultDate: '03.11.1990'
});
