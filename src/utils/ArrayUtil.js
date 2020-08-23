//数组根据索引交换位置的函数
function arraySwap(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
}
//数组根据当前索引进行上移
function arrayItemUp(arr, index) {
    if (index == 0) {
        return;
    }
    arraySwap(arr, index, index - 1);
}
//数组根据当前索引进行下移
function arrayItemDown(arr, index) {
    if (index == arr.length - 1) {
        return;
    }
    arraySwap(arr, index, index + 1);
}

/**
 * 根据条件删除数组的方法
 * deleteByCondition(testData, c => c % 2 == 0);
 *  */
function deleteByCondition(arr,fun){
    let counter = arr.length - 1;
    if(arr.length>0){
        while (true) {
            let result = fun(arr[counter]);
            if (result) {
                arr.splice(counter, 1);
                counter = arr.length - 1;
            } else {
                counter--;
            }
            if (counter < 0) {
                break;
            }
        }
    }
}

export default {
    arraySwap: arraySwap,
    arrayItemUp: arrayItemUp,
    arrayItemDown: arrayItemDown,
    deleteByCondition:deleteByCondition
}