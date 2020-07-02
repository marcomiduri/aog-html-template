const dwMobile = 0, dwSd = 480, dwMd = 640, dwSmd = 780, dwLd = 960, dwXld = 1100;

const dwArr = [dwMobile, dwSd, dwMd, dwSmd, dwLd, dwXld];

const C = 100/12;

const flexBox = document.querySelectorAll('.flex');

class ColsArray {
	constructor(arr){
		this.cols = arr.getAttribute('data-cols'),
		this.colsItem = arr.getAttribute('data-cols') || 12,
		this.colsSd  = arr.getAttribute('data-sd-cols') || this.cols,
		this.colsMd  = arr.getAttribute('data-md-cols') || this.colsSd,
		this.colsSmd = arr.getAttribute('data-smd-cols') || this.colsMd,
		this.colsLd  = arr.getAttribute('data-ld-cols') || this.colsSmd,
		this.colsXld = arr.getAttribute('data-xld-cols') || this.colsLd,
		this.offset  = arr.getAttribute('data-offset') || 0;
	}

	helpersGrid(item, col, arr, width){
		let dw = window.innerWidth;

		if(dw >= width){
			if(col == arr.cols) item.setAttribute('style', `width: ${100/arr.cols}%`);
			else item.setAttribute('style', `width: calc(${100/col}% - ${arr.offset/2}px)`);
		}
	}

	helpersItemGrid(item, col, colArr, width){
		let dw = window.innerWidth;
		if(dw >= width){
			if(col == colArr.colsItem) item.setAttribute('style', `width: ${C*col}%`);
			else item.setAttribute('style', `width: calc(${C*col}% - ${colArr.offset}px)`);
		}
	}

	grid(item, col, colsArr, itemArr, wArr){
		item.setAttribute('style', `width: ${100/col}%`)
		for(let i = 0; i < dwArr.length; i++) itemArr.helpersGrid(item, colsArr[i], itemArr, wArr[i]);
		if(col == null) item.removeAttribute('style');
	}

	gridItems(item, col, colsArr, itemArr, wArr){
		item.setAttribute('style', `width: ${C*col}%`);
		for(let i = 0; i < dwArr.length; i++) itemArr.helpersItemGrid(item, colsArr[i], itemArr, wArr[i]);
	}
	
}

flexBox.forEach(arr => {
	
	const flexItem = arr.querySelectorAll('.f-item');

	const flexArr = new ColsArray(arr);

	let colsArr = [flexArr.cols, flexArr.colsSd, flexArr.colsMd, flexArr.colsSmd, flexArr.colsLd, flexArr.colsXld];
	
	flexItem.forEach(arr => {
		
		const flexItemArr = new ColsArray(arr);
		
		let colArr = [flexItemArr.colsItem, flexItemArr.colsSd, flexItemArr.colsMd, flexItemArr.colsSmd, flexItemArr.colsLd, flexItemArr.colsXld];

		if (arr.hasAttribute(`data-cols`) || arr.hasAttribute(`data-sd-cols`) || arr.hasAttribute(`data-md-cols`) || arr.hasAttribute(`data-smd-cols`) || arr.hasAttribute(`data-ld-cols`) || arr.hasAttribute(`data-xld-cols`)) {

			flexItemArr.gridItems(arr, flexItemArr.colsItem, colArr, flexItemArr, dwArr);
			window.addEventListener('resize', function (){
				flexItemArr.gridItems(arr, flexItemArr.colsItem, colArr, flexItemArr, dwArr);
			})

		}else{
			flexArr.grid(arr, flexArr.cols, colsArr, flexArr, dwArr);
			window.addEventListener('resize', function (){
				flexArr.grid(arr, flexArr.cols, colsArr, flexArr, dwArr);
			})
		}
	})
})