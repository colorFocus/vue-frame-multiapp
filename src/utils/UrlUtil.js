import { apiServer } from "ApiUtil";
import Cookie from 'js-cookie';

export default {
    userIconUri(userId){
        let tenantId = Cookie.get('knowledgeLibrary_tenantId');
        return `${apiServer.fileEngine}/avatar/user/${userId}/large?tenantId=${tenantId}`;
    },
    imageUri(imageId){
        let tenantId = Cookie.get('knowledgeLibrary_tenantId');
        return `${apiServer.fileEngine}/image/obtain/${imageId}/?tenantId=${tenantId}`;
    },
}