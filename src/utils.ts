/*
 * @Author: HadesZ
 * @Date: 2024-09-16 22:03:05
 * @LastEditors: HadesZ
 * @LastEditTime: 2024-09-20 18:10:21
 * @Description:
 */
export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomMagnification = () =>
	Number((0.6 + Math.random() * 0.8).toFixed(3));

export const getRandomTime = (ms: number) =>
	Math.floor(ms * generateRandomMagnification());
