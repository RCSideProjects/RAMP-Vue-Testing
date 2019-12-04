<template>
	<div>
		<ag-grid-vue
			style="width: 500px; height: 300px;"
			class="ag-grid-test ag-theme-material"
			:gridOptions="gridOptions"
			:columnDefs="columnDefs"
			:rowData="rowData"
			:modules="modules"
			:frameworkComponents="frameworkComponents"
			@grid-ready="onGridReady"
		>
		</ag-grid-vue>
	</div>
</template>

<script>
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-material.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import CustomNumberFilter from './CustomNumberFilter';
import CustomHeader from './CustomHeader';

export default {
	name: 'GridComponent',
	data() {
		return {
			columnDefs: null,
			rowData: null,
			modules: AllCommunityModules,
		};
	},
	components: {
		AgGridVue,
	},
	beforeMount() {
		this.columnDefs = [
			{
				headerName: 'OBJECTID',
				field: 'OBJECTID',
				sortable: true,
				lockPosition: true,
				filter: 'agNumberColumnFilter',
				filterParams: {}
			},
			{
				headerName: 'COUNTRY',
				field: 'COUNTRY',
				sortable: true,
				lockPosition: true
			},
			{
				headerName: 'NAME',
				field: 'NAME',
				sortable: true,
				lockPosition: true
			},
			{
				headerName: 'DATE',
				field: 'DATE',
				sortable: true,
				lockPosition: true
			},
			{
				headerName: 'LATITUDE',
				field: 'LATITUDE',
				sortable: true,
				lockPosition: true,
				filter: 'agNumberColumnFilter',
				filterParams: {}
			},
			{
				headerName: 'LONGITUDE',
				field: 'LONGITUDE',
				sortable: true,
				lockPosition: true,
				filter: 'agNumberColumnFilter',
				filterParams: {}
			}
		];
		this.columnDefs.forEach(col => {
			if (col.filter === 'agNumberColumnFilter') {
				this.setUpNumberFilter(col, true);
			}
		});
		this.rowData = this.createRowData();

		this.frameworkComponents = {
			agColumnHeader: CustomHeader,
			numberFloatingFilter: CustomNumberFilter,
		};
	},
	methods: {
		onGridReady(params) {
			this.gridApi = params.api;
			this.columnApi = params.columnApi;
		},
		/** Sets up number floating filter accounting for static types and default values */
		setUpNumberFilter(colDef, lazyFilterEnabled) {
			colDef.floatingFilterComponent = 'numberFloatingFilter';
			colDef.filterParams.inRangeInclusive = true;
			colDef.floatingFilterComponentParams = {
				suppressFilterButton: true
			};
		},
		/** Sets up text floating filter accounting for static types, default values and selector types */
		// setUpTextFilter(colDef, lazyFilterEnabled) {
			// default to regex filtering for text columns
			// if (!lazyFilterEnabled) {
			// colDef.filterParams.textCustomComparator = function (value, filterText) {
			//     const re = new RegExp(`^${filterText.replace(/\*/, '.*')}`);
			//     return re.test(value);
			// }
			// } else {
			// colDef.filterParams.textCustomComparator = function (value, filterText) {
			//     // treat * as a regular special char with lazy filter on
			//     const newFilterText = filterText.replace(/\*/, '\\*');
			//     // surround filter text with .* to match anything before and after
			// 	const re = new RegExp(`^.*${newFilterText}.*`);
			//     return re.test(value);
			// }
			// }
		// },
		createRowData() {
			return [
				{ OBJECTID: 1, COUNTRY: 'Mexico', NAME: 'Cornwall Pipeline', DATE: '01/01/2020', LATITUDE: 129.17, LONGITUDE: -115.25 },
				{ OBJECTID: 2, COUNTRY: 'Canada', NAME: 'Mainline', DATE: '12/25/2019', LATITUDE: 132.38, LONGITUDE: -118.72 },
				{ OBJECTID: 3, COUNTRY: 'United States', NAME: 'Bluewater Pipeline Co', DATE: '11/29/2019', LATITUDE: 0, LONGITUDE: 0 },
			];
		}
	},
	created() {
		this.gridOptions = {
			enableFilter: true,
			floatingFilter: true,
		};
	},
};
</script>

<style>
.ag-grid-test {
	position: absolute;
	margin-left: 375px;
	width: calc(100% - 22vw) !important;
	height: 50vh !important;
	bottom: 500px;
	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
	top: 0px;
}
</style>
