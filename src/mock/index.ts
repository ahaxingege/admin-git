import Mock from 'mockjs';
import user from './user';
import tableData from './tableData';
import { MockParams } from './typing';
const mocks = [...user, ...tableData];
// 设置延时时间
Mock.setup({
  timeout: '100-500'
});

export function mockXHR() {
  let i: MockParams;
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response);
  }
}
