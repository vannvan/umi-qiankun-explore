/*
 * @Description:
 * @Date: 2021-08-08 15:37:21
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-12 10:28:53
 * --------
 * Copyright (c) github.com/vannvan
 */

/**
 * @name: 是否是有效的key
 */
export function isValidKey(
  key: string | number | symbol,
  object: object,
): key is keyof typeof object {
  return key in object;
}

/**
 * @name: 生成guid
 * @return {string} guid
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
