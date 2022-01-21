export const getInitialDate = (date) => {
    if(date == '' || date == null || date == 'null' ){
      return;
    }
    else{
      return new Date(date);
    }
  }