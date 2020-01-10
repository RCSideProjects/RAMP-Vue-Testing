/**
 * Saves relevant enhancedTable states so that it can be reset on reload/reopen. A PanelStateManager is linked to a BaseLayer.
 * setters are called each time enhancedTable states are updated, getters are called each time enhancedTable is reloaded/reopened.
 * States to save and reset:
 *      - displayed rows (on symbology and layer visibility updates)
 *      - column filters
 *      - whether table maximized is in maximized or split view
 */
export default class PanelStateManager {
    constructor(baseLayer) {
        this.baseLayer = baseLayer;
        this.isMaximized = baseLayer.table.maximize || false;
        this.showFilter = baseLayer.table.showFilter !== undefined ? baseLayer.table.showFilter : true;
        this.filterByExtent = baseLayer.table.filterByExtent || false;
        this.lazyFilter = baseLayer.table.lazyFilter !== undefined ? baseLayer.table.lazyFilter : true;
        this.columnFilters = {};
        this.open = true;
        // this.storedBlock = legendBlock;
        this.columnState = null;
    }

    getColumnFilter(colDefField) {
        return this.columnFilters[colDefField];
    }

    setColumnFilter(colDefField, filterValue) {
        let newFilterValue = filterValue;
        if (filterValue && typeof filterValue === 'string') {
            const escRegex = /[(!"#$%&'+,.\\/:;<=>?@[\]^`{|}~)]/g;
            newFilterValue = filterValue.replace(escRegex, '\\$&');
        }
        this.columnFilters[colDefField] = newFilterValue;
    }

    set maximized(maximized) {
        this.isMaximized = maximized;
    }

    get maximized() {
        return this.isMaximized;
    }

    get colFilter() {
        return this.showFilter;
    }

    set colFilter(show) {
        this.showFilter = show;
    }

    set isOpen(isOpen) {
        this.open = isOpen;
    }

    get isOpen() {
        return this.open;
    }
}