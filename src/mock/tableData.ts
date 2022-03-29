export default [
  {
    url: '/data/basetabel',
    type: 'post',
    response: (_res: any) => {
      const clumn = {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      }
      const arr = []
      for (let key = 0; key < 50; key++) {
        arr.push(clumn)
      }
      return {
        code: 200,
        message: 'success',
        data: arr
      };
    }
  }];
