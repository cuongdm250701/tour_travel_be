- commit theo đúng định dạng, nếu không đúng định dạng sẽ báo lỗi
- format cơ bản
  type(scope?): subject
  #scope là optional;
- ví dụ:
  git commit -m 'chore: run tests on travis ci'
  git commit -m 'fix(server): send cors headers'
  git commit -m 'feat(blog): add comment section'
- type cơ bản:
  - build : build
  - chore : việc vặt
  - docs : tài liệu
  - feat : tính năng
  - fix : fix
  - perf : hoàn thành
  - refactor : cấu trúc lại
  - revert : hoàn lại
  - style : style
  - test : test
- All Value:

```sh
[
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];
```
