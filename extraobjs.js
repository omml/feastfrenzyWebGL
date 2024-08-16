//
//  extraobjs.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 13/Aug/2024.
//
import * as THREE from 'three';
import FoodStatic from './foodStatic.js';

export function placeExtraObjects(scene)
{
	verticalObjects(scene);
	horizontalObjects1(scene);
	horizontalObjects2(scene);
}

function verticalObjects(scene)
{
	// left tables
	let x = -24.3;
	const cake01 = new FoodStatic(scene, 'birthdaycake', x, -5, -7.19);
	const milkshake01 = new FoodStatic(scene, 'milkshake', x, -3, -6.9);
	const donut01 = new FoodStatic(scene, 'donut', x, -1, -7.2);
	const burger01 = new FoodStatic(scene, 'burger', x, 1, -7.3);
	const pizza01 = new FoodStatic(scene, 'pizza', x, 3, -7.45);
	const sanwich01 = new FoodStatic(scene, 'sanwich', x, 5, -7.35);
	const donut02 = donut01.reuse(scene, x, 7, -7.2);
	const sanwich02 = sanwich01.reuse(scene, x, 9, -7.35);
	const hotdog01 = new FoodStatic(scene, 'hotdog', x, 11, -7.15);
	const pizza02 = pizza01.reuse(scene, x, 13, -7.45);
	const burger02 = burger01.reuse(scene, x, 15, -7.3);

	// right tables
	x = 26.4;
	const cake02 = cake01.reuse(scene, x, -5, -7.19);
	const milkshake02 = milkshake01.reuse(scene, x, 15, -6.9);
	const donut03 = donut01.reuse(scene, x, 13, -7.2);
	const burger03 = burger01.reuse(scene, x, 11, -7.3);
	const pizza03 = pizza01.reuse(scene, x, 9, -7.45);
	const sanwich03 = sanwich01.reuse(scene, x, 7, -7.35);
	const donut04 = donut01.reuse(scene, x, 5, -7.2);
	const sanwich04 = sanwich01.reuse(scene, x, 3, -7.35);
	const hotdog02 = hotdog01.reuse(scene, x, 1, -7.15);
	const pizza04 = pizza01.reuse(scene, x, -1, -7.45);
	const burger04 = burger01.reuse(scene, x, -3, -7.3);
}

function horizontalObjects1(scene)
{
	let y = -5.5;
	const cake01 = new FoodStatic(scene, 'birthdaycake', 24, y, -7.19);
	const milkshake01 = new FoodStatic(scene, 'milkshake', 22, y, -6.9);
	const donut01 = new FoodStatic(scene, 'donut', 20, y, -7.2);
	const burger01 = new FoodStatic(scene, 'burger', 18, y, -7.3);
	const pizza01 = new FoodStatic(scene, 'pizza', 16, y, -7.45);
	const sanwich01 = new FoodStatic(scene, 'sanwich', 14, y, -7.35, 90);
	const hotdog01 = new FoodStatic(scene, 'hotdog', 12, y, -7.15, 90);

	const donut02 = donut01.reuse(scene, 10, y, -7.2);
	const sanwich02 = sanwich01.reuse(scene, 8, y, -7.35, 90);
	const pizza02 = pizza01.reuse(scene, 6, y, -7.45);
	const burger02 = burger01.reuse(scene, 4, y, -7.3);
	const milkshake02 = milkshake01.reuse(scene, 2, y, -6.9);
	const cake02 = cake01.reuse(scene, 0, y, -7.19);
	const hotdog02 = hotdog01.reuse(scene, -2, y, -7.15, 90);

	const burger03 = burger01.reuse(scene, -4, y, -7.3);
	const hotdog03 = hotdog01.reuse(scene, -6, y, -7.15, 90);
	const donut03 = donut01.reuse(scene, -8, y, -7.2);
	const sanwich03 = sanwich01.reuse(scene, -10, y, -7.35, 90);
	const pizza03 = pizza01.reuse(scene, -12, y, -7.45);
	const milkshake03 = milkshake01.reuse(scene, -14, y, -6.9);
	const cake03 = cake01.reuse(scene, -16, y, -7.19);

	const hotdog04 = hotdog01.reuse(scene, -18, y, -7.15, 90);
	const donut04 = donut01.reuse(scene, -20, y, -7.2);
	const burger04 = burger01.reuse(scene, -22, y, -7.3);
}
function horizontalObjects2(scene)
{
	let y = 15.8;
	const cake01 = new FoodStatic(scene, 'birthdaycake', -22, y, -7.19);
	const milkshake01 = new FoodStatic(scene, 'milkshake', -20, y, -6.9);
	const donut01 = new FoodStatic(scene, 'donut', -18, y, -7.2);
	const burger01 = new FoodStatic(scene, 'burger', -16, y, -7.3);
	const pizza01 = new FoodStatic(scene, 'pizza', -14, y, -7.45);
	const sanwich01 = new FoodStatic(scene, 'sanwich', -12, y, -7.35, 90);
	const hotdog01 = new FoodStatic(scene, 'hotdog', -10, y, -7.15, 90);

	const donut02 = donut01.reuse(scene, -8, y, -7.2);
	const sanwich02 = sanwich01.reuse(scene, -6, y, -7.35, 90);
	const pizza02 = pizza01.reuse(scene, -4, y, -7.45);
	const burger02 = burger01.reuse(scene, -2, y, -7.3);
	const milkshake02 = milkshake01.reuse(scene, 0, y, -6.9);
	const cake02 = cake01.reuse(scene, 2, y, -7.19);
	const hotdog02 = hotdog01.reuse(scene, 4, y, -7.15, 90);

	const burger03 = burger01.reuse(scene, 6, y, -7.3);
	const hotdog03 = hotdog01.reuse(scene, 8, y, -7.15, 90);
	const donut03 = donut01.reuse(scene, 10, y, -7.2);
	const sanwich03 = sanwich01.reuse(scene, 12, y, -7.35, 90);
	const pizza03 = pizza01.reuse(scene, 14, y, -7.45);
	const milkshake03 = milkshake01.reuse(scene, 16, y, -6.9);
	const cake03 = cake01.reuse(scene, 18, y, -7.19);

	const hotdog04 = hotdog01.reuse(scene, 20, y, -7.15, 90);
	const donut04 = donut01.reuse(scene, 22, y, -7.2);
	const burger04 = burger01.reuse(scene, 24, y, -7.3);
}