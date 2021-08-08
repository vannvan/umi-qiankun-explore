/*
 * @Description:
 * @Date: 2021-08-08 15:37:21
 * @Author: vannvan
 * @Email: adoerww@gmail.com
 * @LastEditTime: 2021-08-08 20:32:35
 * --------
 * Copyright (c) github.com/vannvan
 */

export function isValidKey(
  key: string | number | symbol,
  object: object,
): key is keyof typeof object {
  return key in object;
}
