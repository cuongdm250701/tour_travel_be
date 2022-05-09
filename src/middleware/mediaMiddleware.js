/* eslint-disable func-names */
const hat = require('hat');
const Sequelize = require('sequelize');

const { key_ali } = require('@config/CFG');
const co = require('co');
const OSS = require('ali-oss');

async function saveImageOSS(file, name) {
  const client = new OSS({
    region: key_ali.REGION,
    accessKeyId: key_ali.ALI_ACCESS_KEY_ID,
    accessKeySecret: key_ali.ALI_ACCESS_KEY_SECRET,
    bucket: key_ali.BUCKET,
  });
  const rest = await co(function* () {
    const result = yield client.put(name, file.data);
    return result;
  }).catch((err) => {});
  return rest.name;
}

async function uploadMedia(file) {
  if (file) {
    const { mimetype } = file;
    const fileType = mimetype.replace('image/', '');
    const name = `warehouse/image/${hat()}.${fileType}`;
    saveImageOSS(file, name);
    return name;
  }
  return null;
}

async function upload(req, res, next) {
  const count = await checkImage(req);
  let files = [];
  if (count > 1) {
    files = req.files.image;
  } else if (count == 1) {
    files = [req.files.image];
  }
  const listPath = [];
  if (files.length > 0) {
    const promises = files.map((item) => uploadMedia(item));
    await Promise.all(promises)
      .then((results) => {
        results.forEach((element) => {
          console.log('element', element);
          if (element) {
            listPath.push(element);
          }
        });
      })
      .catch((e) => {});
  }
  req.body.listPath = listPath;
  next();
}

async function checkImage(req) {
  try {
    const file = req.files.image;
    if (file[0]) {
      return file.length;
    }
    return 1;
  } catch (err) {
    return 0;
  }
}
module.exports = upload;
