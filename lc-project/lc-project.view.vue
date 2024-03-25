<style lang="scss" scoped>

</style>

<template>
	<div class="lc-project">
		<div class="lc-project__header">
			<div class="lc-project__header__options"></div>
			<div class="lc-project__header__setting"></div>
		</div>
		<div class="lc-project__content"></div>
	</div>
</template>

<script setup>
import { Aggregate } from './lc-project.aggregate';

const aggre = new Aggregate();
aggre.repo.loadMockData();
aggre.save('1-1');
</script>
