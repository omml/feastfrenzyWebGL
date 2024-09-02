//
//  commonDefinitions.js
//  Feast Frenzy WebGL game
//
//  Created by Oscar Martinez on 12/Aug/2024.
//

export const NUM_ENEMIES = 1;//3;

export const Direction = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3
};

export const FoodState = {
	FOOD_CARRIED_ENEMY: 0,
	FOOD_CARRIED_PLAYER: 1,
	FOOD_FLYING: 2,
	FOOD_PREPARE_HIT: 3,
	FOOD_HIT: 4,
	FOOD_IDLE: 5,
	FOOD_ON_TABLE: 6
};

export const FoodFiles = {
	BIRTHDAYCAKE: 'birthdaycake',
	BURGER: 'burger',
	DONUT: 'donut',
	MELON: 'melon',
	MILKSHAKE: 'milkshake',
	PIZZA: 'pizza',
	PUMKIN: 'pumkin',
	TOMATO: 'tomato'
};

// State of the enemy
export const EnemyState = {
	ENEMY_INIT: 0,
	ENEMY_PREPARE_ATTACK: 1,
	ENEMY_ATTACK: 2,
	ENEMY_CHANGE_DIRECTION: 3,
	ENEMY_MOVE_UP: 4,
	ENEMY_MOVE_DOWN: 5,
	ENEMY_HIT: 6,
	ENEMY_END: 7,
	ENEMY_IDLE: 8
};

export function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}