//根据节点关键字的值查询树形路径
function getTreePathByKey(value, key, arr) {
    let temppath = [];
    try {
        function getNodePath(node) {
            // 这里可以自定义push的内容，而不是整个node,而且这里node也包含了children
            temppath.push(node);
            //找到符合条件的节点，通过throw终止掉递归
            if (node[key] === value) {
                throw ("GOT IT!");
            }
            if (node.children && node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    getNodePath(node.children[i]);
                }
                //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                temppath.pop();
            } else {
                //找到叶子节点时，删除路径当中的该叶子节点
                temppath.pop();
            }
        }
        for (let i = 0; i < arr.length; i++) {
            getNodePath(arr[i]);
        }
    } catch (e) {
        return temppath;
    }
}

/*
* setting的格式
* 
    setting = {
        idKey:'',
        pIdKey:'',
        childrenKey:''
    }
    
* */
function transformTozTreeFormat(setting, sNodes) {
    let i, l,
        key = setting.idKey,
        parentKey = setting.pIdKey,
        childKey = setting.childrenKey;
    if (!key || key == "" || !sNodes) {
        return [];
    }
    if (_.isArray(sNodes)) {
        let r = [];
        let tmpMap = [];
        for (i = 0, l = sNodes.length; i < l; i++) {
            sNodes[i]['isLeaf'] = true;
            tmpMap[sNodes[i][key]] = sNodes[i];
        }
        for (i = 0, l = sNodes.length; i < l; i++) {
            if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                if (!tmpMap[sNodes[i][parentKey]][childKey]){
                    tmpMap[sNodes[i][parentKey]][childKey] = [];
                }
                tmpMap[sNodes[i][parentKey]]['isLeaf'] = false;
                tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
            } else {
                r.push(sNodes[i]);
            }
        }
        return r;
    } else {
        return [sNodes];
    }
}


/*
* setting的格式
* 
    setting = {
        idKey:'',
        pIdKey:'',
        childrenKey:''
    }
    
* */
function transformToArrayFormat(setting, nodes) {
    if (!nodes) return [];
    let r = [];
    if (_.isArray(nodes)) {
        for (let i = 0, l = nodes.length; i < l; i++) {
            let node = nodes[i];
            _do(node);
        }
    } else {
        _do(nodes);
    }
    return r;

    function _do(_node) {
        r.push(_node);
        let children = _nodeChildren(setting, _node);
        if (children) {
            r = r.concat(transformToArrayFormat(setting, children));
        }
    }
}

function _nodeChildren(setting, node, newChildren) {
    if (!node) {
        return null;
    }
    let key = setting.childrenKey;
    if (typeof newChildren !== 'undefined') {
        node[key] = newChildren;
    }
    return node[key];
}


//根据当前路由的path查询menuid，如果当前path没有，则向前查询直到找到或者完全找不到
function getMenuIdByPath(path, menus, menuPathKey = "managerUrl", menuIdKey = "menuId") {
    if (menus && menus.length > 0) {
        if (path != undefined && path.length > 0) {
            let menuItem = menus.find((item) => {
                return item[menuPathKey].indexOf(path)!=-1 && item[menuPathKey].startsWith(path)===true;
            });
            if (menuItem) {
                return menuItem[menuIdKey];
            } else {
                let pathList = path.split("/");
                pathList.splice(pathList.length - 1, 1);
                let newpath = pathList.join("/");
                return getMenuIdByPath(newpath, menus, menuPathKey, menuIdKey);
            }
        }
    }
}

//循环设置节点
function setLoopChecked(nodeProps = {key:"id",children:"children"},node,tree){
    if(node.checked===true){
        tree.setChecked(node['data'][nodeProps.key],true,true);
    }else{
        let childrenList = node[nodeProps.children];
        if(childrenList!=undefined && childrenList.length > 0){
            for(let nt of childrenList){
                setLoopChecked(nodeProps,nt,tree);
            }
        }
    }
}

export default {
    transformTozTreeFormat: transformTozTreeFormat,
    transformToArrayFormat: transformToArrayFormat,
    getTreePathByKey:getTreePathByKey,
    getMenuIdByPath:getMenuIdByPath,
    setLoopChecked:setLoopChecked
}
