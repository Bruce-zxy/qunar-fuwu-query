/*
 * @Author: HadesZ
 * @Date: 2024-09-16 22:03:05
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-16 22:03:46
 * @Description: 
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
