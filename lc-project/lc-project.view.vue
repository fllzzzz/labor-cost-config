<style lang="scss" scoped>
@use "@/styles/mixin";

.lc-project {
	&,
	&__header,
	&__content {
		@include mixin.adapter;
	}

	&__header {
		margin-bottom: 3vw;
	}
}
</style>

<template>
	<div class="lc-project">
		<div class="lc-project__header">
			<div class="lc-project__header-left"></div>
			<div class="lc-project__header-right"></div>
		</div>
		<div class="lc-project__content">
			<common-table :data="tableData">
				<el-table-column label="序号">
					<template #default="{ $index }">
						{{ $index + 1 }}
					</template>
				</el-table-column>
				<el-table-column
					label="项目名称"
					prop="name"
				></el-table-column>
				<el-table-column
					label="项目模式"
					prop="mode"
				></el-table-column>
				<el-table-column
					label="统计截止日期"
					prop="date"
				></el-table-column>
				<el-table-column label="配置价格修改场景">
					<template #default="{ row }"> </template>
				</el-table-column>
				<el-table-column
					label="单个价格修改场景"
					prop=""
				></el-table-column>
				<el-table-column
					label="操作"
					prop=""
				></el-table-column>
			</common-table>
		</div>
	</div>
</template>

<script setup>
import { tableData } from "./lc-project.data.mock";
</script>
