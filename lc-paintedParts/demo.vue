<template>
	<x-dialog v-model="open"></x-dialog>
</template>

<script setup>
import {ref} from 'vue';
import XDialog from './x-dialog.vue';

const open = ref(true);
</script>

<style lang="scss" scoped>

</style>