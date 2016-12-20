import moment from 'moment';

export default function datesGenerator(selector) {
  var nowDay = moment().format('DD');
  var nowMonth = moment().format('MM');
  var nowYear = moment().format('YYYY');
  var formatString = 'YYYY-MM-DD';

  switch(selector){
    case 'd':
      var fromDate = moment().subtract(3, 'days').startOf('day').format(formatString);
      return fromDate;

   case 'm':
      var fromDate = moment().subtract(1, 'months').startOf('month').format(formatString);
      return fromDate;

   case '3m':
      var fromDate = moment().subtract(3, 'months').startOf('month').format(formatString);
      return fromDate;

   case '6m':
      var fromDate = moment().subtract(6, 'months').startOf('month').format(formatString);
      return fromDate; 

   case 'y':
      var fromDate = moment().subtract(1, 'years').startOf('month').format(formatString);
      return fromDate;
  }
}

