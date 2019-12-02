/** Sets up text floating filter accounting for static types, default values and selector types */
export function setUpTextFilter(colDef, lazyFilterEnabled) {
    colDef.floatingFilterComponent = TextFloatingFilter;
    // default to regex filtering for text columns
    if (!lazyFilterEnabled) {
        colDef.filterParams.textCustomComparator = function (value, filterText) {
            const re = new RegExp(`^${filterText.replace(/\*/, '.*')}`);
            return re.test(value);
        }
    } else {
        colDef.filterParams.textCustomComparator = function (value, filterText) {
            // treat * as a regular special char with lazy filter on
            const newFilterText = filterText.replace(/\*/, '\\*');
            // surround filter text with .* to match anything before and after
			const re = new RegExp(`^.*${newFilterText}.*`);
			console.log("re, value: ", re, value);
            return re.test(value);
        }
    }
}

/**
 * Floating filter component enhanced for Static Text Filters
 */
class TextFloatingFilter {
	init(params) {
		this.params = params;
        console.log("params: ", params);
		this.onFloatingFilterChanged = params.onFloatingFilterChanged;
		this.eGui = document.createElement('div');
		// this.scope.inputChanged = () => {
		// 	this.onFloatingFilterChanged({ model: this.getModel() });
		// };
	}

	/** Helper function to determine filter model */
	getModel() {
		let newFilter = this.scope.input;
		if (newFilter && typeof newFilter === 'string') {
			const escRegex = /[(!"#$&\'+,.\\:;<=>?@[\]^`{|}~)]/g;
			newFilter = newFilter.replace(escRegex, '\\$&');
		}
		return {
			type: 'contains',
			filter: newFilter,
		};
	}

	/** Return component GUI */
	getGui() {
		return this.eGui;
	}

	onParentModelChanged(parentModel) {
		if (parentModel === null) {
			this.scope.input = '';
		}
	}
}
